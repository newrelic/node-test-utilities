'use strict'

var tap = require('tap')

tap.test('loading the module', function(t) {
  var util

  t.doesNotThrow(function doesNotThrow() {
    util = require('../../index.js')
  }, "doesn't throw")

  t.ok(util.TestAgent, 'exports TestAgent')
  t.ok(util.util, 'exports util functions')
  t.ok(util.assert, 'exports assert functions')

  t.end()
})
