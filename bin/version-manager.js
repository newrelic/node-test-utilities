#! /usr/bin/env node
/*
 * Copyright 2020 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'
/* eslint-disable no-console, no-process-exit */

require('colors')

const cmd = require('commander')
const path = require('path')
const os = require('os')

const printers = require('../lib/versioned/printers')
const Suite = require('../lib/versioned/suite')
const { buildGlobs, resolveGlobs } = require('../lib/versioned/globber')

cmd
  .arguments('[test-globs...]')
  .option('-j, --jobs <n>', 'Max parallel test executions. Defaults to max available CPUs.', int)
  .option('-i, --install <n>', 'Max parallel installations [1]', int, 1)
  .option('-p, --print <mode>', 'Specify print mode [pretty]', printMode, 'pretty')
  .option('-s, --skip <keyword>[,<keyword>]', 'Skip files containing the supplied keyword(s)')
  .option(
    '-P, --pattern <keyword>[,<keyword>]',
    'Only execute tests containing the supplied keyword(s).'
  )
  .option('--major', 'Only iterate on major versions of packages.')
  .option('--minor', 'Iterate over minor versions of packages (default).')
  .option('--patch', 'Iterate over every patch version of packages.')
  .option('-a, --all', 'Installs all packages, not just ones that differ in version')
  .option('--samples <n>', 'Global samples setting to override what is in tests package', int)
  .option('--strict', 'Throw an error if there are test files that are not being run')
  .action(async (testGlobs) => {
    const skip = cmd.skip ? cmd.skip.split(',') : []
    const patterns = cmd.pattern ? cmd.pattern.split(',') : []
    const globs = buildGlobs(testGlobs, patterns)
    console.log('Finding tests in %d globs'.yellow, globs.length)
    let files
    try {
      files = await resolveGlobs(globs, skip)
    } catch (err) {
      console.error('Error globbing:', err)
      process.exit(2)
    } finally {
      if (!files || !files.length) {
        console.error('No files matched', globs)
        process.exit(0)
      } else {
        run(files, patterns)
      }
    }
  })

cmd.parse(process.argv) // runs the action handler

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

function run(files, patterns) {
  let maxParallelRuns = cmd.jobs
  if (!maxParallelRuns) {
    maxParallelRuns = os.cpus().length
    console.log(`Defaulting to max parallel runs of: ${maxParallelRuns} based on avaiable CPUs.`)
  }

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
    limit: maxParallelRuns,
    installLimit: cmd.install,
    versions: mode,
    allPkgs: !!cmd.all,
    testPatterns: patterns,
    globalSamples: cmd.samples,
    strict: !!cmd.strict
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
      const missingFiles = runner.tests.filter((test) => test.missingFiles.length)
      if (missingFiles.length && runner.opts.strict) {
        console.log('FAIL'.bold.red)
        process.exit(1)
      }
      console.log('PASS'.bold.green)
    }
  })
}
