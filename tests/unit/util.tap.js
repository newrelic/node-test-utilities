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
  t.ok(testUtil.isFunction(function() {}), 'should return true for functions')
  t.notOk(testUtil.isFunction(true), 'should return false for not-functions')
  t.notOk(testUtil.isFunction(1234), 'should return false for not-functions')
  t.notOk(testUtil.isFunction('fo'), 'should return false for not-functions')
  t.notOk(testUtil.isFunction({}), 'should return false for not-functions')
  t.notOk(testUtil.isFunction([]), 'should return false for not-functions')

  t.end()
})

tap.test('testUtil.removeListenerByName', (t) => {
  t.plan(2)
  var emitter = new EventEmitter()

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
  var startingPath = process.env.AGENT_PATH
  t.tearDown(function() {
    process.env.AGENT_PATH = (startingPath || '')
  })

  var getNewRelicLocation = testUtil.getNewRelicLocation

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
  t.tearDown(() => agent.unload())

  t.equal(
    testUtil.getDelocalizedHostname('foobar'),
    'foobar',
    'should not change non-local names'
  )
  t.notEqual(
    testUtil.getDelocalizedHostname('localhost'),
    'localhost',
    'should change localhost'
  )
  t.end()
})

tap.test('testUtil.maxVersionPerMode', (t) => {
  const versions = [
    '1.0.0',
    '1.0.1',
    '2.0.0',
    '2.0.1',
    '2.1.1'
  ]

  let result

  result = testUtil.maxVersionPerMode(versions, 'major')
  t.deepEqual(result, ['1.0.1', '2.1.1'])

  result = testUtil.maxVersionPerMode(versions, 'minor')
  t.deepEqual(result, ['1.0.1', '2.0.1', '2.1.1'])

  result = testUtil.maxVersionPerMode(versions, 'patch')
  t.deepEqual(result, versions)

  t.end()
})
