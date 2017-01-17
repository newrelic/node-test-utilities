'use strict'

var assert = require('./lib/assert')
var metrics = require('./lib/metrics')
var TestAgent = require('./lib/agent')
var testUtil = require('./lib/util')

/**
 * The `newrelic-tester` library.
 *
 * This library is meant to assist with testing instrumentation modules for New
 * Relic's Node.js agent.
 *
 * @module
 */

exports = module.exports = function extendTap(tap) {
  metrics.extendTap(tap)
  TestAgent.extendTap(tap)

  return exports
}

/** @type TestAgent */
exports.TestAgent = TestAgent

/** @type util */
exports.util = testUtil

/** @type assert */
exports.assert = assert
