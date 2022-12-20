/*
 * Copyright 2020 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const tap = require('tap')

tap.test('loading the module', function (t) {
  let util

  t.doesNotThrow(function doesNotThrow() {
    util = require('../../index.js')
  }, "doesn't throw")

  t.ok(util.TestAgent, 'exports TestAgent')
  t.ok(util.util, 'exports util functions')
  t.ok(util.assert, 'exports assert functions')

  t.end()
})
