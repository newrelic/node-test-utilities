/*
 * Copyright 2020 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const EventEmitter = require('events').EventEmitter
const tap = require('tap')
const TestAgent = require('../../lib/agent')
const testUtil = require('../../lib/util')

tap.test('testUtil.isFunction', (t) => {
  t.ok(
    testUtil.isFunction(function () {}),
    'should return true for functions'
  )
  t.notOk(testUtil.isFunction(true), 'should return false for not-functions')
  t.notOk(testUtil.isFunction(1234), 'should return false for not-functions')
  t.notOk(testUtil.isFunction('fo'), 'should return false for not-functions')
  t.notOk(testUtil.isFunction({}), 'should return false for not-functions')
  t.notOk(testUtil.isFunction([]), 'should return false for not-functions')

  t.end()
})

tap.test('testUtil.removeListenerByName', (t) => {
  t.plan(2)
  const emitter = new EventEmitter()

  emitter.on('test', function keeper() {
    t.pass('should not remove other listeners')
  })
  emitter.on('test', function removeMe() {
    t.fail('should remove the named listener')
  })
  emitter.on('test', function removeMe() {
    t.fail('should remove all listeners with given name')
  })
  emitter.on('other', function removeMe() {
    t.pass('should not remove listeners from other events')
  })

  testUtil.removeListenerByName(emitter, 'test', 'removeMe')
  emitter.emit('test')
  emitter.emit('other')

  t.end()
})

tap.test('testUtil.getNewRelicLocation', (t) => {
  const startingPath = process.env.AGENT_PATH
  t.teardown(function () {
    process.env.AGENT_PATH = startingPath || ''
  })

  const getNewRelicLocation = testUtil.getNewRelicLocation

  delete process.env.AGENT_PATH
  t.equal(getNewRelicLocation(), 'newrelic', 'should default to installed module')

  process.env.AGENT_PATH = 'foo/bar'
  t.equal(getNewRelicLocation(), 'foo/bar', 'should use environtment value when set')

  t.end()
})

tap.test('testUtil.isLocalhost', (t) => {
  t.ok(testUtil.isLocalhost('localhost'), 'should be true for localhost')
  t.ok(testUtil.isLocalhost('127.0.0.1'), 'should be true for home IP')
  t.notOk(testUtil.isLocalhost('example.com'), 'should be false for domain name')
  t.end()
})

tap.test('testUtil.getDelocalizedHostname', (t) => {
  // Need an agent instance for `getDelocalizedHostname`.
  const agent = new TestAgent()
  t.teardown(() => agent.unload())

  t.equal(testUtil.getDelocalizedHostname('foobar'), 'foobar', 'should not change non-local names')
  t.not(testUtil.getDelocalizedHostname('localhost'), 'localhost', 'should change localhost')
  t.end()
})

tap.test('testUtil.maxVersionPerMode', (t) => {
  const versions = ['1.0.0', '1.0.1', '2.0.0', '2.0.1', '2.1.1']

  const meta = { semverRanges: ['>=1.0.0'], staticVersions: [], latest: false }

  t.test('should match major versions', (t) => {
    const result = testUtil.maxVersionPerMode(versions, 'major', meta)
    t.same(result, ['1.0.1', '2.1.1'])
    t.end()
  })

  t.test('should match minor versions', (t) => {
    const result = testUtil.maxVersionPerMode(versions, 'minor', meta)
    t.same(result, ['1.0.1', '2.0.1', '2.1.1'])
    t.end()
  })

  t.test('should match all versions(patch)', (t) => {
    const result = testUtil.maxVersionPerMode(versions, 'patch', meta)
    t.same(result, versions)
    t.end()
  })

  t.test('should match all major versions and a static version', (t) => {
    const staticMeta = { semverRanges: ['>=1.0.0'], staticVersions: ['1.0.0'], latest: false }
    const result = testUtil.maxVersionPerMode(versions, 'major', staticMeta)
    t.same(result, ['1.0.0', '1.0.1', '2.1.1'])
    t.end()
  })

  t.test('should properly handle multiple semver ranges', (t) => {
    const meta = { semverRanges: ['>=1.0.0', '<2.0.1'], staticVersions: [], latest: false }
    const result = testUtil.maxVersionPerMode(versions, 'major', meta)
    t.same(result, ['1.0.1', '2.1.1'])
    t.end()
  })

  t.test('should match latest version', (t) => {
    const latestMeta = { semverRanges: ['>3'], staticVersions: [], latest: true }
    const result = testUtil.maxVersionPerMode(versions, 'major', latestMeta)
    t.same(result, ['2.1.1'])
    t.end()
  })

  t.test('should only match latest version once', (t) => {
    const latestMeta = { semverRanges: ['>=2'], staticVersions: [], latest: true }
    const result = testUtil.maxVersionPerMode(versions, 'major', latestMeta)
    t.same(result, ['2.1.1'])
    t.end()
  })

  t.test('should filter out non semver convention versions', (t) => {
    const versions = ['1.0.0', '0.0.1-beta', 'wat']
    const result = testUtil.maxVersionPerMode(versions, 'patch', meta)
    t.same(result, ['1.0.0'])
    t.end()
  })

  t.end()
})
