'use strict'

var assert = require('./lib/assert')
var TestAgent = require('./lib/agent')
var testUtil = require('./lib/util')

/**
 * The `@newrelic/test-utilities` library.
 *
 * This library is meant to assist with testing instrumentation modules for New
 * Relic's Node.js agent.
 *
 * @module test-utilities
 */

exports = module.exports = function extendTap(tap) {
  assert.extendTap(tap)

  return exports
}

/** @type TestAgent */
exports.TestAgent = TestAgent

/** @type util */
exports.util = testUtil

/** @type assert */
exports.assert = assert
