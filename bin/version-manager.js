#! /usr/bin/env node
'use strict'
/* eslint-disable no-console */

require('colors')

var cmd = require('commander')
var glob = require('glob')
var path = require('path')

var printers = require('../lib/versioned/printers')
var Suite = require('../lib/versioned/suite')


cmd
  .arguments('<test-glob>')
  .option('-j, --jobs <n>', 'Max parallel test executions [5]', int, 5)
  .option('-i, --install <n>', 'Max parallel installations [1]', int, 1)
  .option('-p, --print <mode>', 'Specify print mode [pretty]', printMode, 'pretty')
  .option('-s, --save', 'Save the results of the tests, implies `--continue`.')
  .option('-c, --continue', 'Run through all of the tests, regardless of failure.')
  .option('--major', 'Only iterate on major versions of packages.')
  .option('--minor', 'Iterate over minor versions of packages (default).')
  .option('--patch', 'Iterate over every patch version of packages.')
  .action(function(testGlob) {
    console.log('Running tests matching:', testGlob)

    glob(testGlob, {
      ignore: '**/node_modules/**',
      absolute: true
    }, function(err, files) {
      // Check that all is right with the world.
      if (err) {
        console.error('Error globbing:', err)
        process.exit(2)
      }
      if (!files || !files.length) {
        console.error('No files matched', testGlob)
        process.exit(0)
      }

      run(files)
    })
  })

cmd.parse(process.argv)

function int(val) {
  return parseInt(val, 10)
}

function printMode(mode) {
  if (!/^(?:pretty|simple)$/.test(mode)) {
    console.error('Invalid print mode "' + mode + '"')
    process.exit(5)
  }
  return mode
}

function run(files) {
  // Clean up the files we'll be running.
  // TODO: Another case to update with `Set` once Node v0.8 and v0.10 are dropped.
  files = files.sort().map(function(p) {
    return path.resolve(p)
  })
  var directories = Object.keys(files.reduce(function(dirs, p) {
    dirs[path.dirname(p)] = true
    return dirs
  }, {}))

  var mode = cmd.major ? 'major' : cmd.patch ? 'patch' : 'minor'

  // Determine the printer setup we're using.
  var Printer = process.env.TRAVIS || cmd.print === 'simple'
    ? printers.SimplePrinter
    : printers.PrettyPrinter
  var viewer = null
  if (cmd.save) {
    cmd.continue = true
    printers.push(printers.HtmlPrinter)
    viewer = new printers.MultiPrinter(files, {
      refresh: 100,
      printers: [Printer, printers.HtmlPrinter]
    })
  } else {
    viewer = new Printer(files, {refresh: 100})
  }

  // Set up the test suite.
  var suite = new Suite(directories, {
    limit: cmd.jobs,
    installLimit: cmd.install,
    versions: mode,
    continue: cmd.continue || false
  })
  suite.on('update', viewer.update.bind(viewer))
  suite.on('end', viewer.end.bind(viewer))

  suite.on('packageResolved', function(pkg, versions) {
    console.log(pkg + ': ' + versions.length)
  })

  // Off to the races!
  suite.start(function(err) {
    if (err) {
      console.log('ERROR'.bold.red)
      console.error(err)
      process.exit(3)
    } else if (suite.failures.length) {
      console.log('FAIL'.bold.red + ' (' + suite.failures.length + ')')
      suite.failures.forEach(function(test) {
        console.log('  ' + test.currentRun.test.red)
      })
      process.exit(4)
    } else {
      console.log('PASS'.bold.green)
    }
  })
}
