#! /usr/bin/env node
'use strict'
/* eslint-disable no-console */

require('colors')

var glob = require('glob')
var path = require('path')

var printers = require('../lib/versioned/printers')
var Suite = require('../lib/versioned/suite')


var testGlob = process.argv[2]
if (!testGlob) {
  console.error('Usage: version-manager <test-glob>')
  process.exit(1)
}

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
  var viewer = process.env.TRAVIS
    ? new printers.SimplePrinter(files, {refresh: 100})
    : new printers.PrettyPrinter(files, {refresh: 100})
  var runner = new Suite(directories, {limit: 5})
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
})
