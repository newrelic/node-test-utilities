/*
 * Copyright 2020 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const path = require('path')
const tap = require('tap')

const Suite = require('../../../lib/versioned/suite')

const MOCK_TEST_DIR = path.resolve(__dirname, 'mock-tests')

tap.test('Suite construction', function (t) {
  let suite = null
  t.doesNotThrow(function () {
    suite = new Suite([MOCK_TEST_DIR])
  }, 'should not throw when constructed')

  t.type(suite, Suite, 'should construct a Suite instance')
  t.end()
})

tap.test('Suite method and members', function (t) {
  t.autoend()

  let suite = null
  t.beforeEach(function () {
    suite = new Suite([MOCK_TEST_DIR])
  })

  t.test('Suite#start', async function (t) {
    const updates = [
      { test: 'redis.mock.test.js', status: 'waiting' },
      { test: 'redis.mock.test.js', status: 'installing' },
      { test: 'redis.mock.test.js', status: 'running' },
      { test: 'redis.mock.test.js', status: 'success' },
      { test: 'other.mock.test.js', status: 'running' },
      { test: 'other.mock.test.js', status: 'failure' }
      // No "done" event because last test failed.
    ]
    let updateIdx = 0
    const UPDATE_TEST_COUNT = 2

    t.plan(UPDATE_TEST_COUNT * updates.length + 1)

    suite.on('update', function (test, status) {
      const expected = updates[updateIdx++]
      const testName = path.basename(test.currentRun.test)
      const id = expected.test + ':' + expected.status
      t.equal(testName, expected.test, 'should update expected test for ' + id)
      t.equal(status, expected.status, 'should have expected status for ' + id)
    })

    suite.on('end', function () {
      t.pass('should emit end event')
    })

    await suite.start()
  })
})
