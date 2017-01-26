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
  if (['pretty', 'simple'].indexOf(mode) === -1) {
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

  // Create our test structures.
  var viewer = process.env.TRAVIS || cmd.print === 'simple'
    ? new printers.SimplePrinter(files, {refresh: 100})
    : new printers.PrettyPrinter(files, {refresh: 100})
  var runner = new Suite(directories, {limit: cmd.jobs, installLimit: cmd.install})
  runner.on('update', viewer.update.bind(viewer))
  runner.on('end', viewer.end.bind(viewer))

  runner.on('packageResolved', function(pkg, versions) {
    console.log(pkg + ': ' + versions.length)
  })

  // Off to the races!
  runner.start(function(err) {
    if (err) {
      console.log('ERROR'.bold.red)
      console.error(err)
      process.exit(3)
    } else if (runner.failures.length) {
      console.log('FAIL'.bold.red + ' (' + runner.failures.length + ')')
      runner.failures.forEach(function(test) {
        console.log('  ' + test.currentRun.test.red)
      })
      process.exit(4)
    } else {
      console.log('PASS'.bold.green)
    }
  })
}
