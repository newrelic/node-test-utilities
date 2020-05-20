#! /usr/bin/env node
'use strict'
/* eslint-disable no-console */

require('colors')

var a = require('async')
var cmd = require('commander')
var glob = require('glob')
var path = require('path')

var printers = require('../lib/versioned/printers')
var Suite = require('../lib/versioned/suite')

var testGlobs = []
cmd
  .arguments('[test-globs...]')
  .option('-j, --jobs <n>', 'Max parallel test executions [5]', int, 5)
  .option('-i, --install <n>', 'Max parallel installations [1]', int, 1)
  .option('-p, --print <mode>', 'Specify print mode [pretty]', printMode, 'pretty')
  .option('-s, --skip <keyword>', 'Skip files containing the supplied keyword')
  .option('--major', 'Only iterate on major versions of packages.')
  .option('--minor', 'Iterate over minor versions of packages (default).')
  .option('--patch', 'Iterate over every patch version of packages.')
  .action(function(_testGlobs) {
    testGlobs = _testGlobs
  })

cmd.parse(process.argv)
let skip = cmd.skip ? cmd.skip.split(',') : []

a.waterfall([
  buildGlobs,
  resolveGlobs,
  run
])

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

function buildGlobs(cb) {
  // Turn the given globs into searches for package.json files.
  var globs = []
  testGlobs.forEach(function(file) {
    if (/(?:package\.json|\.tap\.js)$/.test(file)) {
      globs.push(file)
    } else {
      globs.push(path.join(file, 'package.json'))
      globs.push(path.join(file, '**/package.json'))
    }
  })

  // If no globs were given, then look for globs in the default paths.
  if (!globs.length) {
    var cwd = process.cwd()
    globs.push(path.join(cwd, 'test/versioned/**/package.json'))
    globs.push(path.join(cwd, 'tests/versioned/**/package.json'))
    globs.push(path.join(cwd, 'node_modules/**/tests/versioned/package.json'))
    globs.push(path.join(cwd, 'node_modules/**/tests/versioned/**/package.json'))
  }

  console.log('Finding tests in %d globs', globs.length)
  cb(null, globs)
}

function resolveGlobs(globs, cb) {
  a.map(globs, function(g, cb) {
    glob(g, {absolute: true}, cb)
  }, function afterGlobbing(err, resolved) {
    if (err) {
      console.error('Error globbing:', err)
      process.exit(2)
    }
    var files = resolved.reduce(function mergeResolved(tests, b) {
      b.forEach(function(file) {
        // Filter out any package.json files from our `node_modules` directory
        // which aren't from the `@newrelic` scope.
        const inNodeModules = (/\/node_modules\/(?!@newrelic\/)/g).test(file)

        if (!inNodeModules) {
          const shouldSkip = skip.includes(file)
          const alreadySkipped = tests.include(file)

          if (!shouldSkip && !alreadySkipped) {
            tests.push(file)
          }
        }
      })
      return tests
    }, [])
    if (!files || !files.length) {
      console.error('No files matched', globs)
      process.exit(0)
    }

    cb(null, files)
  })
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

  // Create our test structures.
  var viewer = process.env.TRAVIS || cmd.print === 'simple'
    ? new printers.SimplePrinter(files, {refresh: 100})
    : new printers.PrettyPrinter(files, {refresh: 100})
  var runner = new Suite(directories, {
    limit: cmd.jobs,
    installLimit: cmd.install,
    versions: mode
  })
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
