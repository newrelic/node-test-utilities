/*
 * Copyright 2020 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

require('colors')
var path = require('path')

var util = require('../../util')

var HR = '==============================================================='


function TestPrinter(tests, opts) {
  this.tests = tests.map(function(tPath) {
    var tDir = path.dirname(tPath)
    var tName = path.basename(tDir)
    if (tName === 'versioned') {
      tName = require(path.join(tDir, 'package')).name
    }
    return {name: tName, status: 'created', test: null}
  }).reduce(function(testMap, t) {
    testMap[t.name] = t
    return testMap
  }, {})

  this.opts = opts
  this.updated = false

  this.interval = setInterval(this.maybePrint.bind(this), opts.refresh)
}

TestPrinter.HR = HR

TestPrinter.prototype.maybePrint = function() {
  if (this.updated) {
    this.updated = false
    this.print()
  }
}

TestPrinter.prototype.end = function() {
  this.maybePrint()
  clearInterval(this.interval)
}

TestPrinter.prototype._doUpdate = function(test, status, shouldPrint) {
  var testName = test.name
  this.tests[testName].test = test
  this.tests[testName].status = status
  this.updated = this.updated || shouldPrint

  if (status === 'error' || status === 'failure') {
    this._printError(test)
  }

  return testName
}

TestPrinter.prototype._printError = function(test) {
  /* eslint-disable no-console */
  console.log(HR.grey)
  console.log(test.currentRun.test.red.bold, test.currentRun.packageVersions.join(' '))
  console.log('stdout'.underline)
  console.log(test.stdout)
  console.log('---------------------------------------------------------------')
  console.log('stderr'.underline)
  console.log(test.stderr)
  console.log(HR.grey)
  /* eslint-enable no-console */
}

/**
 * Formats a list of all packages run for a given test suite
 * @param {Test} test
 */
TestPrinter.prototype._listPackages = function(test) {
  return `
   Packages:
    ${test.matrix.versionsByPkg.join('\n    ')}
  `
}

/**
 * Formats the stdout for a given test suite as it is running
 * @param {string} testDir path to test
 * @return {string} formatted string for the output of a given test iteration
 */
TestPrinter.prototype._formatTest = function(testDir) {
  var test = this.tests[testDir].test
  var status = this.tests[testDir].status
  if (!test || !status || !test.currentRun) {
    return ('   ' + testDir).cyan
  }

  var current = test.currentRun
  var testName = path.join(testDir, path.basename(current.test))
  var result = '\u2022'.yellow  // bullet
  if (status === 'done') {
    var duration = util.niceDuration(test.duration)
    if (test.duration / test.matrix.length > 15000) {
      duration = duration.red
    }

    testName = testDir.grey
    result = '\u2713'.green     // checkmark

    status = `(${test.matrix.length}) ${duration} ${this._listPackages(test)}`.grey
  } else if (status === 'error' || status === 'failure') {
    result = '\u2716'.red       // x mark
    testName = testName.red

    status = `run ${current.packageVersions.join(' ')} (${test.runs} of ${test.matrix.length}): \
    ${status.red} ${this._listPackages(test).red}`
  } else {
    testName = testName.grey
    status = `run ${current.packageVersions.join(' ')} (${test.runs} of ${test.matrix.length}): \
    ${status.cyan}`
  }
  return ` ${result} ${testName} ${status}`
}

TestPrinter.prototype._isFailure = function(status) {
  return status === 'failure' || status === 'error'
}

module.exports = TestPrinter
