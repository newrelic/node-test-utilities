/*
 * Copyright 2020 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

var _ = require('lodash')
var a = require('async')
var EventEmitter = require('events').EventEmitter
var path = require('path')
var semver = require('semver')
var util = require('util')

var packager = require('./packager')
var Test = require('./test')


function Suite(testFolders, opts) {
  this.testFolders = testFolders
  this.opts = _.extend({}, {
    limit: 1,
    installLimit: 1,
    versions: 'minor'
  }, opts)
  this.failures = []
}
util.inherits(Suite, EventEmitter)

Suite.prototype.start = function(cb) {
  // Figure out the union of all packages required by all of the tests.
  //
  // TODO: When Node v0.8 and v0.10 are no longer supported change this to use `Set`.
  var packages = Object.keys(this.testFolders.map(function(folder) {
    var testPkg = require(path.join(folder, 'package'))
    return testPkg.tests ? testPkg.tests.map(function(test) {
      return Object.keys(test.dependencies)
    }) : []
  }).reduce(function(pkgs, b) {
    b.forEach(function(t) {   // For each test `t` in bundle `b`
      t.forEach(function(p) { // For each package `p` in test `t`
        pkgs[p] = true        // Mark package `p` as found.
      })
    })
    return pkgs
  }, {}))

  var self = this
  a.waterfall([
    this._mapPackagesToVersions.bind(this, packages),
    this._runTests.bind(this)
  ], function(err) {
    if (err && (!cb || self.listenerCount('error'))) {
      self.emit('error', err)
    }
    self.emit('end')
    cb && cb(err)
  })
}

Suite.prototype._mapPackagesToVersions = function(packages, cb) {
  var self = this
  a.mapLimit(packages, this.opts.limit, function(pkg, cb) {
    // Request the package information from NPM's registry.
    packager.load(pkg, function(err, versions) {
      if (err) {
        return cb(err)
      }
      versions = _cleanNPMInfo(versions, self.opts.versions)
      self.emit('packageResolved', pkg, versions)
      cb(null, versions)
    })
  }, function(err, versions) {
    if (err) {
      return cb(new Error('Failed to retrieve package information: ' + err))
    }

    var pkgInfo = {}
    for (var i = 0; i < packages.length; ++i) {
      pkgInfo[packages[i]] = versions[i]
    }

    // Now we have all of the package versions we'll need in an object looking
    // like this:
    // {"package": ["1.2", "1.3", "2.0"]}
    cb(null, pkgInfo)
  })
}

Suite.prototype._runTests = function(pkgVersions, cb) {
  this.failures = []
  var self = this

  var installQueue = a.queue(function(test, cb) {
    self.emit('update', test.test, 'installing')
    test.testRun.continue()
    test.testRun.once('completed', cb)
  }, this.opts.installLimit)

  var queue = a.queue(function(test, cb) {
    var testRun = test.run()
    if (!testRun) {
      self.emit('update', test, 'done')
      return cb()
    }

    testRun.on('error', function() {
      self.failures.push(test)
      self.emit('update', test, 'error')
    })

    testRun.on('end', function() {
      if (testRun.failed) {
        self.failures.push(test)
        self.emit('update', test, 'failure')
      } else {
        // The test didn't fail and wants to continue, so update its status and
        // then requeue it in the front of the pack.
        self.emit('update', test, 'success')
        queue.unshift(test)
      }

      cb()
    })

    if (testRun.needsInstall) {
      self.emit('update', test, 'waiting')
      installQueue.push({test: test, testRun: testRun}, doRun)
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
  this.tests = this.testFolders.map(function(t) {
    return new Test(t, pkgVersions)
  }).sort(function(a, b) {
    return b.matrix.length - a.matrix.length
  })
  this.tests.forEach(function(test) {
    queue.push(test)
  })

  queue.drain = cb
}

function _cleanNPMInfo(versions, versionMode) {
  // Example response from NPM:
  //  {
  //    "_id": "redis",
  //    "name": "redis",
  //    "description": "Redis client library",
  //    "versions": {
  //      "0.0.1": { /* ... */ },
  //      "0.2.3": { /* ... */ },
  //      "2.0.1": { /* ... */ }
  //    }
  //  }

  // Pull out the keys from the `versions` field in the response and reduce
  // those to just the parts requested. Make a map of the clean version string
  // to the most recent version matching it, then take the values.
  //
  // TODO: When Node v0.8 and v0.10 are no longer supported change this to
  // use `Set`.
  var matchingVersions = Object.keys(versions).filter(function(v) {
    return /^\d+\.\d+\.\d+$/.test(v) // no tagged (e.g. beta) versions
  }).map(function(v) {
    var cleaned = v
    if (versionMode === 'major') {
      cleaned = /^(\d+)/.exec(v)[1]
    } else if (versionMode === 'minor') {
      cleaned = /^(\d+\.\d+)/.exec(v)[1]
    }
    return [v, cleaned]
  }).reduce(function(versionSet, v) {
    if (!versionSet[v[1]] || semver.gt(v[0], versionSet[v[1]])) {
      versionSet[v[1]] = v[0]
    }
    return versionSet
  }, {})

  return Object.keys(matchingVersions).map(function(v) {
    return matchingVersions[v]
  })
}

module.exports = Suite
