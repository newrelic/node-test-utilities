/*
 * Copyright 2020 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const _ = require('lodash')
const a = require('async')
const EventEmitter = require('events').EventEmitter
const path = require('path')
const util = require('util')
const testUtil = require('../util')

const packager = require('./packager')
const Test = require('./test')

function Suite(testFolders, opts) {
  this.testFolders = testFolders
  this.opts = _.extend(
    {},
    {
      limit: 1,
      installLimit: 1,
      versions: 'minor',
      allPkgs: false
    },
    opts
  )
  this.failures = []
}
util.inherits(Suite, EventEmitter)

Suite.prototype.start = function start(cb) {
  // Figure out the union of all packages required by all of the tests.
  let packages = new Set()
  this.testFolders.forEach((folder) => {
    const testPackage = require(path.join(folder, 'package'))
    if (testPackage.tests) {
      testPackage.tests.forEach((test) => {
        const dependencies = Object.keys(test.dependencies)
        dependencies.forEach((dep) => packages.add(dep))
      })
    }
  })
  packages = Array.from(packages)

  const self = this
  a.waterfall(
    [this._mapPackagesToVersions.bind(this, packages), this._runTests.bind(this)],
    function finishHandler(err) {
      if (err && (!cb || self.listenerCount('error'))) {
        self.emit('error', err)
      }
      self.emit('end')
      cb && cb(err)
    }
  )
}

Suite.prototype._mapPackagesToVersions = function _mapPackagesToVersions(packages, cb) {
  const self = this
  a.mapLimit(
    packages,
    this.opts.limit,
    function loadPkgs(pkg, loadCb) {
      // Request the package information from NPM's registry.
      packager.load(pkg, function pkgLoad(err, versions) {
        if (err) {
          return loadCb(err)
        }
        versions = testUtil.maxVersionPerMode(Object.keys(versions), self.opts.versions)
        self.emit('packageResolved', pkg, versions)
        loadCb(null, versions)
      })
    },
    function loadHandler(err, versions) {
      if (err) {
        return cb(new Error('Failed to retrieve package information: ' + err))
      }

      const pkgInfo = {}
      for (let i = 0; i < packages.length; ++i) {
        pkgInfo[packages[i]] = versions[i]
      }

      // Now we have all of the package versions we'll need in an object looking
      // like this:
      // {"package": ["1.2", "1.3", "2.0"]}
      cb(null, pkgInfo)
    }
  )
}

Suite.prototype._runTests = function _runTests(pkgVersions, cb) {
  this.failures = []
  const self = this

  const installQueue = a.queue(function install(test, installCb) {
    self.emit('update', test.test, 'installing')
    test.testRun.continue()
    test.testRun.once('completed', installCb)
  }, this.opts.installLimit)

  const queue = a.queue(function done(test, queueCb) {
    const testRun = test.run()
    if (!testRun) {
      self.emit('update', test, 'done')
      return queueCb()
    }

    testRun.on('error', function errorHandler() {
      self.failures.push(test)
      self.emit('update', test, 'error')
    })

    testRun.on('end', function endHandler() {
      if (testRun.failed) {
        self.failures.push(test)
        self.emit('update', test, 'failure')
      } else {
        // The test didn't fail and wants to continue, so update its status and
        // then requeue it in the front of the pack.
        self.emit('update', test, 'success')
        queue.unshift(test)
      }

      queueCb()
    })

    if (testRun.needsInstall) {
      self.emit('update', test, 'waiting')
      installQueue.push({ test: test, testRun: testRun }, doRun)
    } else {
      // Even if nothing is being installed the runner must go through the
      // install phase.
      testRun.continue()
      testRun.once('completed', doRun)
    }

    function doRun() {
      self.emit('update', test, 'running')
      testRun.continue()
    }
  }, this.opts.limit)

  // Build and queue all of our test directories. The tests are sorted by number
  // of runs required so the longer tests start sooner.
  this.tests = this.testFolders
    .map((folder) => new Test(folder, pkgVersions, this.opts.allPkgs))
    .sort((firstEl, secondEl) => secondEl.matrix.length - firstEl.matrix.length)
  this.tests.forEach((test) => {
    queue.push(test)
  })

  queue.drain = cb
}

module.exports = Suite
