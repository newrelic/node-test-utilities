/*
 * Copyright 2020 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

var tap = require('tap')

var TestMatrix = require('../../../lib/versioned/matrix')


tap.test('TestMatrix construction', function(t) {
  var matrix = null

  t.doesNotThrow(function() {
    matrix = new TestMatrix([{
      engines: {node: '<0.1.0'}, // Purposefully excluding everything.
      dependencies: {redis: '*'},
      files: ['redis.tap.js', 'other.tap.js']
    }, {
      dependencies: {redis: '>=1.0.0'},
      files: ['redis.tap.js', 'other.tap.js']
    }], {
      bluebird: ['1.0.8', '1.1.1', '1.2.4', '2.0.7'],
      redis: ['1.2.3', '1.3.4', '2.0.1']
    })
  }, 'should construct without erroring')

  t.type(matrix, TestMatrix, 'should construct a TestMatrix')
  t.end()
})

tap.test('TestMatrix methods and members', function(t) {
  t.autoend()

  var matrix = null

  t.beforeEach(function(done) {
    try {
      matrix = new TestMatrix([{
        engines: {node: '<0.1.0'}, // Purposefully excluding everything.
        dependencies: {redis: '*'},
        files: ['redis.tap.js', 'other.tap.js']
      }, {
        dependencies: {redis: '>=1.0.0'},
        files: ['redis.tap.js', 'other.tap.js']
      }], {
        bluebird: ['1.0.8', '1.1.1', '1.2.4', '2.0.7'],
        redis: ['1.2.3', '1.3.4', '2.0.1']
      })
      done()
    } catch (e) {
      done(e)
    }
  })

  t.test('TestMatrix#length', function(t) {
    t.type(matrix.length, 'number', 'should be a number')
    t.equal(
      matrix.length, 6,
      'should be the cartesian product test files and dependencies'
    )

    matrix.next()
    t.equal(matrix.length, 6, 'should be the total length, not remaining')
    t.end()
  })

  t.test('TestMatrix#peek', function(t) {
    var peek = matrix.peek()
    t.deepEqual(peek, {
      packages: {redis: '1.2.3'},
      test: 'redis.tap.js'
    }, 'should return the next test to execute')

    t.deepEqual(peek, matrix.peek(), 'should not change the state of the matrix')
    t.deepEqual(peek, matrix.peek(), 'should never change the state of the matrix')
    t.end()
  })


  t.test('TestMatrix#next', function(t) {
    var next = matrix.next()
    t.deepEqual(next, {
      packages: {redis: '1.2.3'},
      test: 'redis.tap.js'
    }, 'should return the next test to execute')

    next = matrix.next()
    t.deepEqual(next, {
      packages: {redis: '1.2.3'},
      test: 'other.tap.js'
    }, 'should advance the state of the matrix')

    next = matrix.next()
    t.deepEqual(next, {
      packages: {redis: '1.3.4'},
      test: 'redis.tap.js'
    }, 'should advance the package versions when out of test files')

    // Advance the matrix to the end.
    matrix.next()
    matrix.next()
    matrix.next()

    t.doesNotThrow(function() {
      t.equal(matrix.next(), null, 'should return null when no more tests available')
      t.equal(matrix.next(), null, 'should keep returning null')
    }, 'should not error when reaching the end of the matrix')

    t.end()
  })
})
