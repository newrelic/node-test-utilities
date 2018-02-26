'use strict'

var EventEmitter = require('events').EventEmitter
var tap = require('tap')
var testUtil = require('../../lib/util')

tap.test('testUtil.isFunction', function(t) {
  t.ok(testUtil.isFunction(function() {}), 'should return true for functions')
  t.notOk(testUtil.isFunction(true), 'should return false for not-functions')
  t.notOk(testUtil.isFunction(1234), 'should return false for not-functions')
  t.notOk(testUtil.isFunction('fo'), 'should return false for not-functions')
  t.notOk(testUtil.isFunction({}), 'should return false for not-functions')
  t.notOk(testUtil.isFunction([]), 'should return false for not-functions')

  t.end()
})

tap.test('testUtil.removeListenerByName', function(t) {
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

tap.test('testUtil.getNewRelicLocation', function(t) {
  var startingPath = process.env.AGENT_PATH
  t.tearDown(function() {
    process.env.AGENT_PATH = startingPath
  })

  var getNewRelicLocation = testUtil.getNewRelicLocation

  delete process.env.AGENT_PATH
  t.equal(getNewRelicLocation(), 'newrelic', 'should default to installed module')

  process.env.AGENT_PATH = 'foo/bar'
  t.equal(getNewRelicLocation(), 'foo/bar', 'should use environtment value when set')

  t.end()
})
