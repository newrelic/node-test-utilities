/*
 * Copyright 2020 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const sinon = require('sinon')
const tap = require('tap')
const TestAgent = require('../../lib/agent')
const testUtil = require('../../lib/util')

const shimmer = require(testUtil.getNewRelicLocation() + '/lib/shimmer')

require('../../lib/assert').extendTap(tap)


tap.afterEach(function() {
  if (TestAgent.instance) {
    TestAgent.instance.unload()
  }
})

tap.test('new TestAgent', function(t) {
  const helper = new TestAgent()

  // Check singleton-ness
  t.equal(helper, TestAgent.instance, 'should make instance available on class')
  t.throws(function() {
    return new TestAgent()
  }, Error, 'should enforce singleton nature of Agent')

  t.equal(helper.agent._state, 'started', 'should default to `started` state')

  t.end()
})

tap.test('new TestAgent with false setState arg', function(t) {
  const helper = new TestAgent(null, false)
  t.equal(helper.agent._state, 'stopped', 'should be in initial `stopped` state')

  t.end()
})

tap.test('TestAgent.makeInstrumented', function(t) {
  const Module = require('module')
  const origLoad = Module._load

  const helper = TestAgent.makeInstrumented()
  t.type(helper, TestAgent, 'should construct a TestAgent')
  t.not(Module._load, origLoad, 'should patch module')
  t.ok(shimmer.debug, 'should enable debug mode')

  t.equal(helper.agent._state, 'started', 'should default to `started` state')

  t.end()
})

tap.test('TestAgent.makeInstrumented with false setState arg', function(t) {
  const helper = TestAgent.makeInstrumented(null, false)
  t.equal(helper.agent._state, 'stopped', 'should be in initial `stopped` state')

  t.end()
})

tap.test('TestAgent instance', function(t) {
  let helper = null

  t.beforeEach(function() {
    helper = new TestAgent()
  })

  t.afterEach(function() {
    if (TestAgent.instance === helper) {
      helper.unload()
    }
    helper = null
  })

  t.test('TestAgent#instrument', function(t) {
    const Module = require('module')
    const origLoad = Module._load

    helper.instrument()
    t.not(Module._load, origLoad, 'should patch module')
    t.ok(shimmer.debug, 'should enable debug mode')

    t.end()
  })

  t.test('TestAgent#unload', function(t) {
    const Module = require('module')
    const origLoad = Module._load

    helper.instrument()
    helper.unload()

    t.equal(Module._load, origLoad, 'should unpatch module')
    t.notOk(shimmer.debug, 'should disable debug mode')
    t.equal(TestAgent.instance, null, 'should clear the TestAgent instance')

    t.end()
  })

  t.test('TestAgent#runInTransaction', function(t) {
    let invoked = false

    helper.runInTransaction(function(tx) {
      invoked = true
      t.ok(tx, 'should provide a transaction')
      t.transaction(tx, 'should give transaction to function')
    })
    t.ok(invoked, 'should immediately invoke function')

    t.end()
  })

  t.test('TestAgent#getTransaction', function(t) {
    t.equal(helper.getTransaction(), null, 'should return null when outside tx')
    helper.runInTransaction(function(tx) {
      t.equal(helper.getTransaction(), tx, 'should return current tx when in one')
    })

    t.end()
  })

  t.test('TestAgent#registerInstrumentation', function(t) {
    const opts = {
      type: 'web-framework',
      moduleName: 'test',
      onRequire: function() {}
    }

    const spy = sinon.spy(shimmer, 'registerInstrumentation')
    helper.registerInstrumentation(opts)
    t.equal(spy.args[0][0], opts, 'should call shimmer.registerInstrumentation')

    spy.restore()
    t.end()
  })

  t.test('TestAgent#getAgentApi', (t) => {
    const api = helper.getAgentApi()

    t.ok(api)
    t.equal(api.agent, helper.agent)

    t.end()
  })

  t.autoend()
})
