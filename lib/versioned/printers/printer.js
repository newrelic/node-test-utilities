'use strict'

require('colors')

var path = require('path')


var HR = '==============================================================='


function TestPrinter(tests, opts) {
  this.tests = tests.map(function(t) {
    var testDirectory = path.basename(path.dirname(t))
    return {name: testDirectory, status: 'created', test: null}
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
  var testDir = path.basename(test.directory)
  this.tests[testDir].test = test
  this.tests[testDir].status = status
  this.updated = this.updated || shouldPrint

  if (status === 'error' || status === 'failure') {
    this._printError(test)
  }

  return testDir
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
    testName = testDir.grey
    result = '\u2713'.green     // checkmark
    status = ('(' + test.matrix.length + ')').grey
  } else if (status === 'error' || status === 'failure') {
    result = '\u2716'.red       // x mark
    testName = testName.red
    status = 'run ' + test.runs + ' of ' + test.matrix.length + ': ' + (status.red)
  } else {
    testName = testName.grey
    status = 'run ' + test.runs + ' of ' + test.matrix.length + ': ' + (status.cyan)
  }
  return ' ' + result + ' ' + testName + ' ' + status
}

TestPrinter.prototype._isFailure = function(status) {
  return status === 'failure' || status === 'error'
}

module.exports = TestPrinter
