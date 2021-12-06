/*
 * Copyright 2021 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const tap = require('tap')
const path = require('path')
const globber = require('../../../lib/versioned/globber')

const TEST_DIR = path.join(__dirname, 'mock-tests')

tap.test('globber', (t) => {
  t.autoend()

  t.test('buildGlobs', (t) => {
    t.autoend()

    t.test('default behavior', (t) => {
      t.autoend()
      const globs = globber.buildGlobs([TEST_DIR])
      t.equal(globs.length, 2)
      t.match(globs, [`${TEST_DIR}/package.json`, `${TEST_DIR}/**/package.json`])
    })

    t.test('glob pattern', (t) => {
      t.autoend()
      t.autoend()
      const globs = globber.buildGlobs([`${TEST_DIR}/*.js`])
      t.equal(globs.length, 1)
      t.match(globs, [`${TEST_DIR}/*.js`])
    })

    t.test('specific file', (t) => {
      t.autoend()
      const globs = globber.buildGlobs([`${TEST_DIR}/other.mock.js`])
      t.equal(globs.length, 1)
      t.match(globs, [`${TEST_DIR}/other.mock.js`])
    })
  })

  t.test('resolveGlobs', (t) => {
    t.autoend()

    t.test('default behavior', async (t) => {
      t.autoend()
      const files = await globber.resolveGlobs([`${TEST_DIR}/*.js`])
      t.equal(files.length, 2)
      t.match(files, [`${TEST_DIR}/other.mock.js`, `${TEST_DIR}/redis.mock.js`])
    })

    t.test('filter out node modules', (t) => {
      t.autoend()
      // TODO
    })

    t.test('handle skips', async (t) => {
      t.autoend()
      const files = await globber.resolveGlobs([`${TEST_DIR}/*.js`], [`${TEST_DIR}/redis.mock.js`])
      t.equal(files.length, 1)
      t.match(files, [`${TEST_DIR}/other.mock.js`])
    })

    t.test('handle duplicates', async (t) => {
      t.autoend()
      const files = await globber.resolveGlobs([`${TEST_DIR}/*.js`, `${TEST_DIR}/*.js`])
      t.equal(files.length, 2)
      t.match(files, [`${TEST_DIR}/other.mock.js`, `${TEST_DIR}/redis.mock.js`])
    })
  })
})
