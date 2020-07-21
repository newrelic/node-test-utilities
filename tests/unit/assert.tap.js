/*
 * Copyright 2020 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

var assert = require('../../lib/assert')
var tap = require('tap')
var TestAgent = require('../../lib/agent')


var helper = null
tap.beforeEach(function(done) {
  helper = new TestAgent()
  done()
})
tap.afterEach(function(done) {
  helper.unload()
  helper = null
  done()
})

tap.notOk(tap.transaction, 'should not extend tap on require')
tap.notOk(tap.metrics, 'should not extend tap on require')
tap.notOk(tap.exactMetrics, 'should not extend tap on require')
tap.notOk(tap.segments, 'should not extend tap on require')
tap.notOk(tap.exactSegments, 'should not extend tap on require')

tap.test('assert.extendTap', function(t) {
  assert.extendTap(tap)

  tap.type(tap.transaction, 'function', 'should extend tap with more assertions')
  tap.type(tap.metrics, 'function', 'should extend tap with more assertions')
  tap.type(tap.exactMetrics, 'function', 'should extend tap with more assertions')
  tap.type(tap.segments, 'function', 'should extend tap with more assertions')
  tap.type(tap.exactSegments, 'function', 'should extend tap with more assertions')

  t.end()
})

tap.test('assert.transaction', function(t) {
  t.throws(function() {
    assert.transaction(null)
  }, {message: /is <null>/}, 'should throw if no transaction given')
  t.throws(function() {
    assert.transaction({})
  }, {message: /is not a.*?Transaction/}, 'should throw if not a Transaction')

  var tx1 = null
  helper.runInTransaction(function(tx) { tx1 = tx })
  helper.runInTransaction(function(tx2) {
    t.throws(function() {
      assert.transaction(tx1)
    }, {
      message: /Transaction.*?is not the current transaction/
    }, 'should throw if transaction is not the current one')

    t.doesNotThrow(function() {
      assert.transaction(tx2)
    }, 'should not throw for current transaction')

    t.transaction(tx2, 'should work on tap assertion too')
  })

  t.throws(function() {
    assert.transaction(null, 'foobar')
  }, {message: 'foobar'}, 'should use message if provided')

  t.end()
})

tap.test('assert.metrics', function(t) {
  var metrics = helper.agent.metrics
  metrics.getOrCreateMetric('foobar').incrementCallCount()
  metrics.getOrCreateMetric('fizbang').incrementCallCount()

  t.doesNotThrow(function() {
    assert.metrics(['foobar'])
  }, 'should not throw checking just a string')

  t.doesNotThrow(function() {
    assert.metrics(['foobar', 'fizbang'])
  }, 'should not throw checking multiple in array')

  t.doesNotThrow(function() {
    assert.metrics([{name: 'foobar'}])
  }, 'should not throw checking objects with just a name')

  t.doesNotThrow(function() {
    assert.metrics([{name: 'foobar', callCount: 1}])
  }, 'should not throw checking object with name and metric value')

  t.throws(function() {
    assert.metrics(['doesNotExist'])
  }, {message: /Missing metric.*?doesNotExist/}, 'should throw for missing metrics')

  t.throws(function() {
    assert.metrics([{name: 'doesNotExist'}])
  }, {message: /Missing metric.*?doesNotExist/}, 'should throw for missing metrics')

  t.throws(function() {
    assert.metrics([{name: 'foobar', callCount: 5}])
  }, {message: /does not match expected/}, 'should throw for wrong metric values')

  t.throws(function() {
    assert.metrics(['foobar', 'doesNotExist'])
  }, {message: /Missing metric.*?doesNotExist/}, 'should work with multiple values')

  t.metrics(['foobar'], 'names should work with tap')
  t.metrics([{name: 'foobar', callCount: 1}], 'objects should work with tap too')

  t.end()
})

tap.test('assert.exactMetrics', function(t) {
  var metrics = helper.agent.metrics
  metrics.getOrCreateMetric('foobar').incrementCallCount()
  metrics.getOrCreateMetric('fizbang').incrementCallCount()

  t.throws(function() {
    assert.exactMetrics(['foobar'])
  }, {message: /has 2 elements.*?expected 1/}, 'should throw if missing metrics')

  t.doesNotThrow(function() {
    assert.exactMetrics(['foobar', 'fizbang'])
  }, 'should not throw if all metrics specified')

  t.end()
})

tap.test('assert.segments', function(t) {
  var tx = helper.runInTransaction(function(tx) { return tx })
  var root = tx.trace.root
  var child = root.add('child')
  root.add('sibling')
  child.add('grandchild')

  t.doesNotThrow(function() {
    assert.segments(root, [{name: 'child'}])
  }, 'should match a single child')

  t.doesNotThrow(function() {
    assert.segments(root, [{name: 'child'}, {name: 'sibling'}])
  }, 'should match both children')

  t.doesNotThrow(function() {
    assert.segments(root, [{name: 'sibling'}, {name: 'child'}])
  }, 'should not care about ordering')

  t.doesNotThrow(function() {
    assert.segments(root, [{name: 'child', children: [{name: 'grandchild'}]}])
  }, 'should work with nested segments')

  t.throws(function() {
    assert.segments(root, [{name: 'doesNotExist'}])
  }, {
    message: /Missing child segment "doesNotExist"/
  }, 'should throw for missing segments')

  t.throws(function() {
    assert.segments(root, [{name: 'sibling', children: [{name: 'foobar'}]}])
  }, {
    message: /Missing child segment "foobar"/
  }, 'should throw for missing child segments')

  var spec = [{name: 'child'}]
  var curr = spec[0]
  var seg = child
  for (var i = 0; i < 25000; ++i) {
    curr.children = [{name: 'segment ' + i}]
    curr = curr.children[0]
    seg = seg.add('segment ' + i)
  }

  t.doesNotThrow(function() {
    assert.segments(root, spec)
  }, 'should not die on deep segment trees')

  t.end()
})

tap.test('assert.exactSegments', function(t) {
  var tx = helper.runInTransaction(function(tx) { return tx })
  var root = tx.trace.root
  var child = root.add('child')
  root.add('sibling')
  child.add('grandchild')

  t.doesNotThrow(function() {
    assert.exactSegments(root, [{
      name: 'child',
      children: [{name: 'grandchild'}]
    }, {
      name: 'sibling'
    }])
  }, 'should not throw for exact match')

  t.throws(function() {
    assert.exactSegments(root, [{
      name: 'sibling'
    }, {
      name: 'child',
      children: [{name: 'grandchild'}]
    }])
  }, {
    message: /Expected segment "sibling" as child \d of "\w+", found "child" instead/
  }, 'should care about ordering of children')

  t.throws(function() {
    assert.exactSegments(root, [{
      name: 'child',
      children: [{name: 'grandchild'}]
    }, {
      name: 'sibling'
    }, {
      name: 'foobar'
    }])
  }, {
    message: /Expected segment "foobar" as child \d of "\w+", found no child/
  }, 'should care about missing children')

  t.throws(function() {
    assert.exactSegments(root, [{
      name: 'child',
      children: [{name: 'grandchild'}]
    }])
  }, {
    message: /Expected 1 children for segment "\w+", found 2 instead/
  }, 'should care extra children')

  t.end()
})
