#! /usr/bin/env node
/*
 * Copyright 2020 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'
/* eslint-disable no-console, no-process-exit */

require('colors')

const a = require('async')
const cmd = require('commander')
const glob = require('glob')
const path = require('path')

const printers = require('../lib/versioned/printers')
const Suite = require('../lib/versioned/suite')

let testGlobs = []
cmd
  .arguments('[test-globs...]')
  .option('-j, --jobs <n>', 'Max parallel test executions [5]', int, 5)
  .option('-i, --install <n>', 'Max parallel installations [1]', int, 1)
  .option('-p, --print <mode>', 'Specify print mode [pretty]', printMode, 'pretty')
  .option('-s, --skip <keyword>[,<keyword>]', 'Skip files containing the supplied keyword(s)')
  .option('--major', 'Only iterate on major versions of packages.')
  .option('--minor', 'Iterate over minor versions of packages (default).')
  .option('--patch', 'Iterate over every patch version of packages.')
  .option('-a, --all', 'Installs all packages, not just ones that differ in version')
  .option('--samples <n>', 'Global samples setting to override what is in tests package', int)
  .action((_testGlobs) => {
    testGlobs = _testGlobs
  })

cmd.parse(process.argv)
const skip = cmd.skip ? cmd.skip.split(',') : []

a.waterfall([buildGlobs, resolveGlobs, run])

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
  const globs = []
  testGlobs.forEach((file) => {
    if (/(?:package\.json|\.tap\.js)$/.test(file)) {
      globs.push(file)
    } else {
      globs.push(path.join(file, 'package.json'))
      globs.push(path.join(file, '**/package.json'))
    }
  })

  // If no globs were given, then look for globs in the default paths.
  if (!globs.length) {
    const cwd = process.cwd()
    globs.push(path.join(cwd, 'test/versioned/**/package.json'))
    globs.push(path.join(cwd, 'tests/versioned/**/package.json'))
    globs.push(path.join(cwd, 'node_modules/**/tests/versioned/package.json'))
    globs.push(path.join(cwd, 'node_modules/**/tests/versioned/**/package.json'))
  }

  console.log('Finding tests in %d globs'.yellow, globs.length)
  cb(null, globs)
}

/* eslint max-nested-callbacks: ["error", 4] */
function resolveGlobs(globs, cb) {
  a.map(
    globs,
    (g, globsCb) => {
      glob(g, { absolute: true }, globsCb)
    },
    function afterGlobbing(err, resolved) {
      if (err) {
        console.error('Error globbing:', err)
        process.exit(2)
      }
      const files = resolved.reduce(function mergeResolved(tests, b) {
        b.forEach((file) => {
          // Filter out any package.json files from our `node_modules` directory
          // which aren't from the `@newrelic` scope.
          const inNodeModules = /\/node_modules\/(?!@newrelic\/)/g.test(file)

          if (!inNodeModules) {
            const shouldSkip = skip.some((s) => file.indexOf(s) >= 0)
            const duplicate = tests.includes(file)

            if (!shouldSkip && !duplicate) {
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
    }
  )
}

function run(files) {
  // Clean up the files we'll be running.
  const filePaths = new Set()
  files.sort().forEach((file) => {
    filePaths.add(path.resolve(file))
  })

  let directories = new Set()
  filePaths.forEach((filePath) => {
    directories.add(path.dirname(filePath))
  })
  directories = Array.from(directories)

  const mode = cmd.major ? 'major' : cmd.patch ? 'patch' : 'minor'

  // Create our test structures.
  const viewer =
    process.env.TRAVIS || cmd.print === 'simple'
      ? new printers.SimplePrinter(files, { refresh: 100 })
      : new printers.PrettyPrinter(files, { refresh: 100 })
  const runner = new Suite(directories, {
    limit: cmd.jobs,
    installLimit: cmd.install,
    versions: mode,
    allPkgs: !!cmd.all,
    globalSamples: cmd.samples
  })
  runner.on('update', viewer.update.bind(viewer))
  runner.on('end', viewer.end.bind(viewer))

  console.log('Finding all versions for a package'.yellow)
  runner.on('packageResolved', (pkg, versions) => {
    console.log(`${pkg}(${versions.length})`)
  })

  // Off to the races!
  runner.start((err) => {
    if (err) {
      console.log('ERROR'.bold.red)
      console.error(err)
      process.exit(3)
    } else if (runner.failures.length) {
      console.log('FAIL'.bold.red + ' (' + runner.failures.length + ')')
      runner.failures.forEach((test) => {
        console.log(
          `   packages: ${test.currentRun.packageVersions.join(', ').grey} file: ${
            test.currentRun.test.red
          }`
        )
      })
      process.exit(4)
    } else {
      console.log('PASS'.bold.green)
    }
  })
}
