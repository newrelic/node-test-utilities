'use strict'
var s = Date.now()

var TestAgent = require('../../lib/agent')
var shimmer = require('newrelic/lib/shimmer')
var tap = require('tap')
var sinon = require('sinon')

require('../../lib/assert').extendTap(tap)

tap.afterEach(function(done) {
  if (TestAgent.instance) {
    TestAgent.instance.unload()
  }
  done()
})

tap.test('new TestAgent', function(t) {
  var helper = new TestAgent()

  // Check singleton-ness
  t.equal(helper, TestAgent.instance, 'should make instance available on class')
  t.throws(function() {
    var second = new TestAgent()
  }, Error, 'should enforce singleton nature of Agent')

  t.end()
})

tap.test('TestAgent.makeInstrumented', function(t) {
  var Module = require('module')
  var origLoad = Module._load

  var helper = TestAgent.makeInstrumented()
  t.type(helper, TestAgent, 'should construct a TestAgent')
  t.notEqual(Module._load, origLoad, 'should patch module')
  t.ok(shimmer.debug, 'should enable debug mode')

  t.end()
})

tap.test('TestAgent instance', function(t) {
  var helper = null

  t.beforeEach(function(done) {
    helper = new TestAgent()
    done()
  })

  t.afterEach(function(done) {
    if (TestAgent.instance === helper) {
      helper.unload()
    }
    helper = null
    done()
  })

  t.test('TestAgent#instrument', function(t) {
    var Module = require('module')
    var origLoad = Module._load

    helper.instrument()
    t.notEqual(Module._load, origLoad, 'should patch module')
    t.ok(shimmer.debug, 'should enable debug mode')

    t.end()
  })

  t.test('TestAgent#unload', function(t) {
    var Module = require('module')
    var origLoad = Module._load

    helper.instrument()
    helper.unload()

    t.equal(Module._load, origLoad, 'should unpatch module')
    t.notOk(shimmer.debug, 'should disable debug mode')
    t.equal(TestAgent.instance, null, 'should clear the TestAgent instance')

    t.end()
  })

  t.test('TestAgent#runInTransaction', function(t) {
    var invoked = false

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
    var opts = {
      type: 'web-framework',
      moduleName: 'test',
      onRequire: function() {}
    }

    var spy = sinon.spy(shimmer, 'registerInstrumentation')
    helper.registerInstrumentation(opts)
    t.equal(spy.args[0][0], opts, 'should call shimmer.registerInstrumentation')

    spy.restore()
    t.end()
  })

  t.autoend()
})
