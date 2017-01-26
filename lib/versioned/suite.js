'use strict'

var a = require('async')
var EventEmitter = require('events').EventEmitter
var https = require('https')
var path = require('path')
var util = require('util')

var Test = require('./test')


function Suite(testFolders, opts) {
  this.testFolders = testFolders
  this.opts = opts || {limit: 1, installLimit: 1}
  this.failures = []
}
util.inherits(Suite, EventEmitter)

Suite.prototype.start = function(cb) {
  // Figure out the union of all packages required by all of the tests looks like.
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
    https.get({
      host: 'registry.npmjs.org',
      path: '/' + pkg.replace('/', encodeURIComponent),
      headers: {accept: 'application/json'}
    }, function(response) {
      // Accumulate the response.
      var body = ''
      response.on('data', function(data) {
        body += data.toString('utf8')
      })
      response.on('end', function() {
        // Attempt to parse the reponse.
        var info = null
        try {
          info = JSON.parse(body)
        } catch (e) {
          return cb(e)
        }

        var versions = _cleanNPMInfo(info)
        self.emit('packageResolved', pkg, versions)
        cb(null, versions)
      })
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
  // of runs required so the longer tests start sooner
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

function _cleanNPMInfo(info) {
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

  // Pull out the keys from the `versions` field and parse those into
  // `major.minor` format. Then reduce those to a map of found versions
  // and take the keys.
  //
  // TODO: When Node v0.8 and v0.10 are no longer supported change this to
  // use `Set`.
  return Object.keys(Object.keys(info.versions).filter(function(v) {
    return /^\d+\.\d+\.\d+$/.test(v) // no tagged (e.g. beta) versions
  }).map(function(v) {
    return /^(\d+\.\d+)/.exec(v)[1]
  }).reduce(function(versionSet, v) {
    versionSet[v] = true
    return versionSet
  }, {}))
}

module.exports = Suite
