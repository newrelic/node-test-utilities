/*
 * Copyright 2020 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

var logUpdate = require('log-update')
var util = require('util')

var TestPrinter = require('./printer')


function PrettyPrinter(tests, opts) {
  TestPrinter.call(this, tests, opts)
}
util.inherits(PrettyPrinter, TestPrinter)

PrettyPrinter.prototype.update = function(test, status) {
  if (this._isFailure(status)) {
    logUpdate.done() // Commit current output.
  }
  this._doUpdate(test, status, true)
}

PrettyPrinter.prototype.print = function() {
  var out = TestPrinter.HR + '\n'
  out += Object.keys(this.tests).sort().map(this._formatTest.bind(this)).join('\n')
  out += '\n' + TestPrinter.HR
  logUpdate(out)
}

PrettyPrinter.prototype.end = function() {
  TestPrinter.prototype.end.apply(this, arguments)
  logUpdate.done()
}

module.exports = PrettyPrinter
