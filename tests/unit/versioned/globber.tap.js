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

    t.test('expand directory', (t) => {
      const globs = globber.buildGlobs([TEST_DIR])
      t.equal(globs.length, 2)
      t.match(globs, [`${TEST_DIR}/package.json`, `${TEST_DIR}/**/package.json`])
      t.end()
    })

    t.test('glob pattern', (t) => {
      const globs = globber.buildGlobs([`${TEST_DIR}/*.js`])
      t.equal(globs.length, 1)
      t.match(globs, [`${TEST_DIR}/*.js`])
      t.end()
    })

    t.test('handle single quotes', (t) => {
      const globs = globber.buildGlobs([`'${TEST_DIR}/*.js'`])
      t.equal(globs.length, 1)
      t.match(globs, [`${TEST_DIR}/*.js`])
      t.end()
    })

    t.test('handle double quotes', (t) => {
      const globs = globber.buildGlobs([`"${TEST_DIR}/*.js"`])
      t.equal(globs.length, 1)
      t.match(globs, [`${TEST_DIR}/*.js`])
      t.end()
    })

    t.test('specific file', (t) => {
      const globs = globber.buildGlobs([`${TEST_DIR}/other.mock.tap.js`])
      t.equal(globs.length, 1)
      t.match(globs, [`${TEST_DIR}/other.mock.tap.js`])
      t.end()
    })
  })

  t.test('resolveGlobs', (t) => {
    t.autoend()

    t.test('resolve asterisk', async (t) => {
      const files = await globber.resolveGlobs([`${TEST_DIR}/*.js`])
      t.equal(files.length, 2)
      t.match(files, [`${TEST_DIR}/other.mock.tap.js`, `${TEST_DIR}/redis.mock.tap.js`])
      t.end()
    })

    t.test('filter out node modules', async (t) => {
      const files = await globber.resolveGlobs(
        [`${TEST_DIR}/scoped-pkgs/**/package.json`],
        [`${TEST_DIR}/package.json`]
      )
      t.equal(files.length, 1)
      t.match(files, [`${TEST_DIR}/scoped-pkgs/node_modules/@newrelic/package.json`])
      t.end()
    })

    t.test('handle skips', async (t) => {
      const files = await globber.resolveGlobs(
        [`${TEST_DIR}/*.js`],
        [`${TEST_DIR}/redis.mock.tap.js`]
      )
      t.equal(files.length, 1)
      t.match(files, [`${TEST_DIR}/other.mock.tap.js`])
      t.end()
    })

    t.test('handle duplicates', async (t) => {
      const files = await globber.resolveGlobs([`${TEST_DIR}/*.js`, `${TEST_DIR}/*.js`])
      t.equal(files.length, 2)
      t.match(files, [`${TEST_DIR}/other.mock.tap.js`, `${TEST_DIR}/redis.mock.tap.js`])
      t.end()
    })
  })
})
