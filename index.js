/*
 * Copyright 2020 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const assert = require('./lib/assert')
const TestAgent = require('./lib/agent')
const testUtil = require('./lib/util')

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

// Export utility methods directly.
Object.assign(exports, testUtil)

/** @type TestAgent */
exports.TestAgent = TestAgent

/** @type util */
exports.util = testUtil

/** @type assert */
exports.assert = assert
