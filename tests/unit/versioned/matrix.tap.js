/*
 * Copyright 2020 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const tap = require('tap')

const TestMatrix = require('../../../lib/versioned/matrix')

tap.test('TestMatrix construction', function (t) {
  let matrix = null

  t.doesNotThrow(function () {
    matrix = new TestMatrix(
      [
        {
          engines: { node: '<0.1.0' }, // Purposefully excluding everything.
          dependencies: { redis: '*' },
          files: ['redis.tap.js', 'other.tap.js']
        },
        {
          dependencies: { redis: '>=1.0.0' },
          files: ['redis.tap.js', 'other.tap.js']
        }
      ],
      {
        bluebird: { versions: ['1.0.8', '1.1.1', '1.2.4', '2.0.7'], latest: '2.0.7' },
        redis: { versions: ['1.2.3', '1.3.4', '2.0.1'], latest: '2.0.1' }
      }
    )
  }, 'should construct without erroring')

  t.type(matrix, TestMatrix, 'should construct a TestMatrix')
  t.end()
})

tap.test(
  'TestMatrix global samples should only be used when local samples is greater than global',
  function (t) {
    const matrix = new TestMatrix(
      [
        {
          dependencies: {
            'test': {
              samples: 1,
              versions: '>=1.0.0'
            },
            'dep': {
              samples: 3,
              versions: '*'
            },
            'string-dep': '*'
          }
        }
      ],
      {
        'string-dep': { versions: ['0.0.0', '0.0.1', '0.0.2', '100.0.0'], latest: '100.0.0' },
        'test': { versions: ['1.0.0', '1.0.1', '1.0.2'], latest: '1.0.2' },
        'dep': { versions: ['0.0.1', '0.0.2', '0.0.3', '1.0.0', '1.0.1', '1.0.2'], latest: '1.0.2' }
      },
      2
    )

    const { packages } = matrix._matrix[0]

    t.same(packages, [
      { name: 'test', next: 0, versions: ['1.0.2'] },
      { name: 'dep', next: 0, versions: ['0.0.1', '1.0.2'] },
      { name: 'string-dep', next: 0, versions: ['0.0.0', '100.0.0'] }
    ])
    t.end()
  }
)

tap.test('TestMatrix methods and members', function (t) {
  t.autoend()

  let matrix = null

  t.beforeEach(function () {
    matrix = new TestMatrix(
      [
        {
          engines: { node: '<0.1.0' }, // Purposefully excluding everything.
          dependencies: { redis: '*' },
          files: ['redis.tap.js', 'other.tap.js']
        },
        {
          dependencies: { redis: '>=1.0.0' },
          files: ['redis.tap.js', 'other.tap.js']
        }
      ],
      {
        bluebird: { versions: ['1.0.8', '1.1.1', '1.2.4', '2.0.7'], latest: '2.0.7' },
        redis: { versions: ['1.2.3', '1.3.4', '2.0.1'], latest: '2.0.1' }
      }
    )
  })

  t.test('TestMatrix#length', function (t) {
    t.type(matrix.length, 'number', 'should be a number')
    t.equal(matrix.length, 6, 'should be the cartesian product test files and dependencies')

    matrix.next()
    t.equal(matrix.length, 6, 'should be the total length, not remaining')
    t.end()
  })

  t.test('TestMatrix#versionsByPkg', function (t) {
    t.same(
      matrix.versionsByPkg,
      ['redis(3): 1.2.3, 1.3.4, 2.0.1'],
      'should properly format each pkg -> version matrix'
    )
    t.end()
  })

  t.test('TestMatrix#peek', function (t) {
    const peek = matrix.peek()
    t.same(
      peek,
      {
        packages: { redis: '1.2.3' },
        test: 'redis.tap.js'
      },
      'should return the next test to execute'
    )

    t.same(peek, matrix.peek(), 'should not change the state of the matrix')
    t.same(peek, matrix.peek(), 'should never change the state of the matrix')
    t.end()
  })

  t.test('TestMatrix#next', function (t) {
    let next = matrix.next()
    t.same(
      next,
      {
        packages: { redis: '1.2.3' },
        test: 'redis.tap.js'
      },
      'should return the next test to execute'
    )

    next = matrix.next()
    t.same(
      next,
      {
        packages: { redis: '1.2.3' },
        test: 'other.tap.js'
      },
      'should advance the state of the matrix'
    )

    next = matrix.next()
    t.same(
      next,
      {
        packages: { redis: '1.3.4' },
        test: 'redis.tap.js'
      },
      'should advance the package versions when out of test files'
    )

    // Advance the matrix to the end.
    matrix.next()
    matrix.next()
    matrix.next()

    t.doesNotThrow(function () {
      t.equal(matrix.next(), null, 'should return null when no more tests available')
      t.equal(matrix.next(), null, 'should keep returning null')
    }, 'should not error when reaching the end of the matrix')

    t.end()
  })
})

tap.test('Should return raw dependency version when does not directly match any retrieved', (t) => {
  const tests = [
    {
      dependencies: { redis: 'latest' },
      files: ['redis.tap.js', 'other.tap.js']
    },
    {
      dependencies: { redis: 'random' },
      files: ['redis.tap.js', 'other.tap.js']
    }
  ]

  const retrievedPackageVersions = {
    redis: { versions: ['1.2.3', '1.3.4', '2.0.1'], latest: '2.0.1' }
  }

  const matrix = new TestMatrix(tests, retrievedPackageVersions)

  const test1 = matrix.next()
  t.equal(test1.packages.redis, '2.0.1')

  const test2 = matrix.next()
  t.equal(test2.packages.redis, '2.0.1')

  const test3 = matrix.next()
  t.equal(test3.packages.redis, 'random')

  const test4 = matrix.next()
  t.equal(test4.packages.redis, 'random')

  t.end()
})
