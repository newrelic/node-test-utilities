'use strict'

var path = require('path')
var tap = require('tap')

var Suite = require('../../../lib/versioned/suite')

var MOCK_TEST_DIR = path.resolve(__dirname, 'mock-tests')


tap.test('Suite construction', function(t) {
  var suite = null
  t.doesNotThrow(function() {
    suite = new Suite([MOCK_TEST_DIR])
  }, 'should not throw when constructed')

  t.type(suite, Suite, 'should construct a Suite instance')
  t.end()
})

tap.test('Suite method and members', function(t) {
  t.autoend()

  var suite = null
  t.beforeEach(function(done) {
    try {
      suite = new Suite([MOCK_TEST_DIR])
      done()
    } catch (e) {
      done(e)
    }
  })

  t.test('Suite#start', function(t) {
    var updates = [
      {test: 'redis.mock.js', status: 'waiting'},
      {test: 'redis.mock.js', status: 'installing'},
      {test: 'redis.mock.js', status: 'running'},
      {test: 'redis.mock.js', status: 'success'},
      {test: 'other.mock.js', status: 'running'},
      {test: 'other.mock.js', status: 'failure'}
      // No "done" event because last test failed.
    ]
    var updateIdx = 0
    var UPDATE_TEST_COUNT = 2

    t.plan((UPDATE_TEST_COUNT * updates.length) + 3)

    suite.on('update', function(test, status) {
      var expected = updates[updateIdx++]
      var testName = path.basename(test.currentRun.test)
      var id = expected.test + ':' + expected.status
      t.equal(testName, expected.test, 'should update expected test for ' + id)
      t.equal(status, expected.status, 'should have expected status for ' + id)
    })

    suite.on('end', function() {
      t.pass('should emit end event')
    })

    suite.start(function(err) {
      t.pass('should call back')
      t.error(err, 'should not error')
    })
  })
})
