/*
 * Copyright 2020 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const path = require('path')
const tap = require('tap')

const Test = require('../../../lib/versioned/test')

const MOCK_TEST_DIR = path.resolve(__dirname, 'mock-tests')

tap.test('Test construction', function (t) {
  let test = null
  t.doesNotThrow(function () {
    test = new Test(MOCK_TEST_DIR, {
      bluebird: ['1.0.8', '1.1.1', '1.2.4', '2.0.7'],
      redis: ['1.0.0', '2.0.1', '2.1.0']
    })
  }, 'should not throw when constructed')

  t.type(test, Test, 'should construct a Test instance')
  t.end()
})

tap.test('Test methods and members', function (t) {
  t.autoend()

  let test = null
  t.beforeEach(function () {
    test = new Test(MOCK_TEST_DIR, {
      bluebird: ['1.0.8', '1.1.1', '1.2.4', '2.0.7'],
      redis: ['1.0.0', '2.0.1', '2.1.0']
    })
  })

  t.test('Test#peek', function (t) {
    const peek = test.peek()
    t.same(
      peek,
      {
        packages: { redis: '1.0.0' },
        test: MOCK_TEST_DIR + '/redis.mock.js'
      },
      'should return the next test to execute'
    )

    t.same(peek, test.peek(), 'should not change the state of the test')
    t.same(peek, test.peek(), 'should never change the state of the test')
    t.end()
  })

  t.test('Test#next', function (t) {
    let next = test.next()

    t.same(
      next,
      {
        packages: { redis: '1.0.0' },
        test: MOCK_TEST_DIR + '/redis.mock.js'
      },
      'should return the next test to execute'
    )

    next = test.next()
    t.same(
      next,
      {
        packages: { redis: '1.0.0' },
        test: MOCK_TEST_DIR + '/other.mock.js'
      },
      'should advance the state of the test'
    )

    next = test.next()
    t.same(
      next,
      {
        packages: { redis: '2.0.1' },
        test: MOCK_TEST_DIR + '/redis.mock.js'
      },
      'should advance the package versions when out of test files'
    )

    // Advance the test to the end.
    test.next()
    test.next()
    test.next()

    t.doesNotThrow(function () {
      t.equal(test.next(), null, 'should return null when no more tests available')
      t.equal(test.next(), null, 'should keep returning null')
    }, 'should not error when reaching the end of the test')

    t.end()
  })

  t.test('Test#run', function (t) {
    t.plan(23)

    const peek = test.peek()
    const testRun = test.run()
    t.type(testRun, 'TestRun', 'should return a TestRun instance')

    const nextPeek = test.peek()
    t.notSame(peek, nextPeek, 'should advance the state of the test')

    const eventCounts = {}

    testRun.on('installing', incrementEvent('installing'))
    testRun.on('completed', incrementEvent('completed'))
    testRun.on('running', incrementEvent('running'))
    testRun.on('done', incrementEvent('done'))
    testRun.on('end', incrementEvent('end'))
    testRun.on('error', incrementEvent('error'))

    testRun.continue()
    testRun.once('completed', function () {
      t.equal(eventCounts.completed, 1, 'should have completed only one step')
      t.equal(eventCounts.installing, 1, 'should have completed installation')
      t.equal(eventCounts.running, 0, 'should not have completed running')

      testRun.continue()
      testRun.once('completed', function () {
        t.equal(eventCounts.completed, 2, 'should have completed only one step')
        t.equal(eventCounts.installing, 1, 'should have completed installation')
        t.equal(eventCounts.running, 1, 'should have completed running')
      })
    })

    testRun.on('end', function () {
      t.same(
        eventCounts,
        {
          installing: 1,
          completed: 2,
          running: 1,
          done: 1,
          error: 0,
          end: 1
        },
        'should have emitted expected events'
      )

      t.notOk(testRun.failed, 'should not be marked as failed')

      t.match(
        testRun.stdout,
        new RegExp(
          [
            // pre-npm 7 shows the package + redis@1.0.0
            '(?:\\+\\s+redis@1\\.0\\.0.*)?\n?',
            // pre npm 7 if running tests on fresh checkout
            '(?:\nadded \\d+ packages? from \\d contributor in \\d(?:\\.\\d+)?s)?\n?',
            // pre npm 7 if running tests that already has tests/unit/versioned/mock-tests/node_modules
            '(?:\nupdated \\d+ packages? in \\d(?:\\.\\d+)?s)?\n?',
            // npm 7 + if running tests on fresh checkout
            '(?:\nadded \\d+ packages? in \\d(?:\\.\\d+)?s)?\n?',
            // npm 7 + when running tests that already have tests/unit/versioned/mock-tests/node_modules
            '(?:\nup to date in \\d(?:\\.\\d+)?s)?\n?',
            // stdout from loading the fake module
            '\nstdout - redis\\.mock\\.js\n'
          ].join('')
        ),
        'should have expected stdout'
      )

      t.equal(testRun.stderr, 'stderr - redis.mock.js\n', 'should have expected stderr')

      nextTest()
    })

    function incrementEvent(evnt) {
      eventCounts[evnt] = 0
      return function () {
        ++eventCounts[evnt]
      }
    }

    function nextTest() {
      const nextRun = test.run()
      t.not(nextRun, testRun, 'should return a new test run')

      nextRun.on('installing', incrementEvent('installing'))
      nextRun.on('completed', incrementEvent('completed'))
      nextRun.on('running', incrementEvent('running'))
      nextRun.on('done', incrementEvent('done'))
      nextRun.on('end', incrementEvent('end'))
      nextRun.on('error', incrementEvent('error'))

      nextRun.continue()
      nextRun.once('completed', function () {
        t.equal(eventCounts.completed, 1, 'should have completed only one step')
        t.equal(eventCounts.installing, 1, 'should have completed installation')
        t.equal(eventCounts.running, 0, 'should not have completed running')

        nextRun.continue()
        nextRun.once('completed', function () {
          t.equal(eventCounts.completed, 2, 'should have completed only one step')
          t.equal(eventCounts.installing, 1, 'should have completed installation')
          t.equal(eventCounts.running, 1, 'should have completed running')
        })
      })

      nextRun.on('end', function () {
        t.same(
          eventCounts,
          {
            installing: 1,
            completed: 2,
            running: 1,
            done: 1,
            error: 0,
            end: 1
          },
          'should have emitted expected events'
        )

        t.ok(nextRun.failed, 'should be marked as a failed run')
        t.equal(nextRun.stdout, 'stdout - other.mock.js\n', 'should have expected stdout')

        /* eslint-disable max-len */
        t.match(
          nextRun.stderr,
          new RegExp(
            [
              'stderr - other\\.mock\\.js',
              'Failed to execute test: Error: Failed to execute node'
            ].join('\n')
          ),
          'should have expected stderr'
        )
        /* eslint-enable max-len */
      })
    }
  })
})

tap.test('Test run with allPkgs true', function (t) {
  const test = new Test(
    MOCK_TEST_DIR,
    {
      bluebird: ['1.0.8', '1.1.1', '1.2.4', '2.0.7'],
      redis: ['1.0.0', '2.0.1', '2.1.0']
    },
    { allPkgs: true }
  )

  const testRun = test.run()
  testRun.on('end', function () {
    t.match(
      testRun.stdout,
      new RegExp(
        [
          // pre-npm 7 shows the package + redis@1.0.0
          '(?:\\+\\s+redis@1\\.0\\.0.*)?\n?',
          // pre npm 7 if running tests on fresh checkout
          '(?:\nadded \\d+ packages? from \\d contributor in \\d(?:\\.\\d+)?s)?\n?',
          // pre npm 7 if running tests that already has tests/unit/versioned/mock-tests/node_modules
          '(?:\nupdated \\d+ packages? in \\d(?:\\.\\d+)?s)?\n?',
          // npm 7 + if running tests on fresh checkout
          '(?:\nadded \\d+ packages? in \\d(?:\\.\\d+)?s)?\n?',
          // npm 7 + when running tests that already have tests/unit/versioned/mock-tests/node_modules
          '(?:\nup to date in \\d(?:\\.\\d+)?s)?\n?',
          // stdout from loading the fake module
          '\nstdout - redis\\.mock\\.js\n'
        ].join('')
      ),
      'should have expected stdout from redis.mock.js'
    )
    t.equal(
      testRun.stderr,
      'stderr - redis.mock.js\n',
      'should have expected stderr from redis.mock.js'
    )

    const nextRun = test.run()

    nextRun.on('end', function () {
      t.match(
        nextRun.stdout,
        new RegExp(
          [
            // pre-npm 7 shows the package + redis@1.0.0
            '(?:\\+\\s+redis@1\\.0\\.0.*)?\n?',
            // pre npm 7 if running tests on fresh checkout
            '(?:\nadded \\d+ packages? from \\d contributor in \\d(?:\\.\\d+)?s)?\n?',
            // pre npm 7 if running tests that already has tests/unit/versioned/mock-tests/node_modules
            '(?:\nupdated \\d+ packages? in \\d(?:\\.\\d+)?s)?\n?',
            // npm 7 + if running tests on fresh checkout
            '(?:\nadded \\d+ packages? in \\d(?:\\.\\d+)?s)?\n?',
            // npm 7 + when running tests that already have tests/unit/versioned/mock-tests/node_modules
            '(?:\nup to date in \\d(?:\\.\\d+)?s)?\n?',
            // stdout from loading the fake module
            '\nstdout - other\\.mock\\.js\n'
          ].join('')
        ),
        'should have expected stdout from other.mock.js'
      )
      t.match(
        nextRun.stderr,
        new RegExp(
          [
            'stderr - other\\.mock\\.js',
            'Failed to execute test: Error: Failed to execute node'
          ].join('\n')
        ),
        'should have expected stderr from other.mock.js'
      )

      t.end()
    })

    nextRun.on('completed', function () {
      nextRun.continue()
    })
    nextRun.continue()
  })
  testRun.on('completed', function () {
    testRun.continue()
  })
  testRun.continue()
  test.peek()
  testRun.continue()
})

tap.test('Will not filter tests when keywords are an empty list', function (t) {
  const test = new Test(
    MOCK_TEST_DIR,
    {
      bluebird: ['1.0.8', '1.1.1', '1.2.4', '2.0.7'],
      redis: ['1.0.0', '2.0.1', '2.1.0']
    },
    {
      testPatterns: []
    }
  )

  t.equal(test.matrix._matrix[1].tests.files.length, 2, 'should include both test files')
  t.end()
})

tap.test('should filter based on multiple keywords', function (t) {
  const test = new Test(
    MOCK_TEST_DIR,
    {
      bluebird: ['1.0.8', '1.1.1', '1.2.4', '2.0.7'],
      redis: ['1.0.0', '2.0.1', '2.1.0']
    },
    {
      testPatterns: ['other.mock.js', 'redis']
    }
  )

  t.equal(test.matrix._matrix[1].tests.files.length, 2, 'should include both test files')
  t.end()
})

tap.test('Can filter tests by keyword', function (t) {
  const test = new Test(
    MOCK_TEST_DIR,
    {
      bluebird: ['1.0.8', '1.1.1', '1.2.4', '2.0.7'],
      redis: ['1.0.0', '2.0.1', '2.1.0']
    },
    {
      testPatterns: ['redis']
    }
  )

  t.equal(test.matrix._matrix[1].tests.files.length, 1, 'should include only one test file')
  t.equal(
    test.matrix._matrix[1].tests.files[0],
    'redis.mock.js',
    'should only include the redis test file'
  )
  t.end()
})

tap.test('should filter tests completely out when 0 matches based on patterns', function (t) {
  const test = new Test(
    MOCK_TEST_DIR,
    {
      bluebird: ['1.0.8'],
      redis: ['1.0.0']
    },
    {
      testPatterns: ['no-match']
    }
  )

  t.equal(test.matrix._matrix.length, 0, 'should completely filter out matrix')
  t.end()
})
