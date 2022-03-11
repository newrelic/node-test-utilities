/*
 * Copyright 2022 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const path = require('path')
const tap = require('tap')
const sinon = require('sinon')

const TestPrinter = require('../../../../lib/versioned/printers/printer')

const MOCK_TEST_DIR = path.resolve(__dirname, 'mock-tests')

tap.test('Printer construction', function (t) {
  let printer = null
  t.doesNotThrow(function () {
    printer = new TestPrinter(
      [`${MOCK_TEST_DIR}/bluebird/package.json`, `${MOCK_TEST_DIR}/redis/package.json`],
      { refresh: 100 }
    )
  }, 'should not throw when constructed')

  t.type(printer, TestPrinter, 'should construct a TestPrinter instance')
  t.end()
  clearInterval(printer.interval)
})

// eslint-disable no-console
tap.test('maybePrintMissing', function (t) {
  t.autoend()
  let printer = null
  t.before(() => {
    sinon.stub(console, 'log')
  })
  t.beforeEach(() => {
    printer = new TestPrinter(
      [`${MOCK_TEST_DIR}/bluebird/package.json`, `${MOCK_TEST_DIR}/redis/package.json`],
      { refresh: 100 }
    )
  })

  t.afterEach(() => {
    clearInterval(printer.interval)
    console.log.resetHistory()
  })

  t.teardown(() => {
    console.log.restore()
  })
  t.test('should print properly formatted missing tests', (t) => {
    printer.tests.bluebird.test = { missingFiles: ['file1', 'file2', 'file3'] }
    printer.tests.redis.test = { missingFiles: ['file3', 'file4', 'file5'] }
    printer.maybePrintMissing()
    t.same(console.log.args, [
      [
        `\u001b[31mThe following test suites had test files that were not included in their package.json:\n\u001b[39m`
      ],
      [`\u001b[31mbluebird:\n\t- file1\n\t- file2\n\t- file3\u001b[39m`],
      [`\u001b[31mredis:\n\t- file3\n\t- file4\n\t- file5\u001b[39m`]
    ])
    t.end()
  })

  t.test('should not print missing tests when none exst', (t) => {
    printer.tests.bluebird.test = {}
    printer.tests.redis.test = {}
    printer.maybePrintMissing()
    t.same(console.log.args, [], 'should not have logged missing files when they do not exist')
    t.end()
  })
})

tap.test('printVersionedMatrix', function (t) {
  const TestMatrix = require('../../../../lib/versioned/matrix')
  t.autoend()
  let printer = null
  t.before(() => {
    sinon.stub(console, 'log')
  })
  t.beforeEach(() => {
    printer = new TestPrinter(
      [`${MOCK_TEST_DIR}/bluebird/package.json`, `${MOCK_TEST_DIR}/redis/package.json`],
      { refresh: 100 }
    )
  })

  t.afterEach(() => {
    clearInterval(printer.interval)
    console.log.resetHistory()
  })

  t.teardown(() => {
    console.log.restore()
  })

  t.test('should print versions by package', (t) => {
    const bluebirdMatrix = new TestMatrix(
      [
        {
          engines: { node: '<0.1.0' },
          dependencies: { redis: '*' },
          files: ['redis.tap.js', 'other.tap.js']
        },
        {
          dependencies: { redis: '>=1.0.0' },
          files: ['redis.tap.js', 'other.tap.js']
        }
      ],
      {
        redis: ['1.2.3', '1.3.4', '2.0.1']
      }
    )
    const redisMatrix = new TestMatrix(
      [
        {
          engines: { node: '<0.1.0' },
          dependencies: { bluebird: '*' },
          files: ['other.tap.js']
        },
        {
          dependencies: { bluebird: '>=1.0.0' },
          files: ['other.tap.js']
        }
      ],
      {
        bluebird: ['1.0.3', '1.3.4', '2.0.1', '3.8.1', '4.0.0']
      }
    )
    printer.tests.bluebird.test = { matrix: bluebirdMatrix }
    printer.tests.redis.test = { matrix: redisMatrix }
    printer.printVersionedMatrix()
    t.same(console.log.args, [
      ['Versions executed\n'],
      ['redis(3): 1.2.3, 1.3.4, 2.0.1'],
      ['bluebird(5): 1.0.3, 1.3.4, 2.0.1, 3.8.1, 4.0.0'],
      ['===============================================================']
    ])
    t.end()
  })
})

// eslint-enable no-console
