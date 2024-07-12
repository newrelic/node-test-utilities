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
  this.pkgsMeta = {}
  this.opts = _.extend(
    {},
    {
      limit: 1,
      installLimit: 1,
      versions: 'minor',
      testPatterns: [],
      globalSamples: null
    },
    opts
  )
  this.failures = []
}
util.inherits(Suite, EventEmitter)

/**
 * Builds the metadata for every package in the appropriate test folders.
 * This will iterate over every test folder, get the package.json,
 * iterate over every tests array and find semver ranges,
 * latest flag and static versions for every unique package.
 */
Suite.prototype.prepare = function prepare() {
  this.testFolders.forEach((folder) => {
    const testPackage = require(path.join(folder, 'package'))
    if (testPackage.tests) {
      testPackage.tests.forEach((test) => {
        const dependencies = Object.keys(test.dependencies)
        dependencies.forEach((dep) => {
          const versions = getPkgVersions(test.dependencies[dep])
          this._buildPkgMeta(dep, versions)
        })
      })
    }
  })
}

Suite.prototype.start = async function start() {
  this.prepare()
  const pkgVersions = await this._mapPackagesToVersions()
  await this._runTests(pkgVersions)
  this.emit('end')
}

/**
 * The versions for a package can be a string or object
 * return the appropriate one
 */
function getPkgVersions(dep) {
  return typeof dep === 'object' ? dep.versions : dep
}

/**
 * Creates a key in the pkgsMeta for every package.  Each package
 * will have an array of semver ranges, a latest flag(if a test wants only the latest of the package), and static versions.
 */
Suite.prototype._buildPkgMeta = function _buildPkgMeta(name, versions) {
  if (!this.pkgsMeta.hasOwnProperty(name)) {
    this.pkgsMeta[name] = { semverRanges: [], latest: false, staticVersions: [] }
  }

  if (versions === 'latest') {
    this.pkgsMeta[name].latest = true
    // Static version if it starts with a digit and does not end in `.x`
    // i.e - 3.0.0(static), 3.x(not static)
  } else if (versions.match(/^\d.*[^\.x]$/)) {
    this.pkgsMeta[name].staticVersions.push(versions)
  } else {
    this.pkgsMeta[name].semverRanges.push(versions)
  }
}

Suite.prototype._mapPackagesToVersions = async function _mapPackagesToVersions() {
  const packages = Object.keys(this.pkgsMeta)
  const self = this
  const versionsFinal = await a.mapLimit(packages, this.opts.limit, async function loadPkgs(pkg) {
    // Request the package information from NPM's registry.
    let versions = await packager.load(pkg)
    const pkgMeta = self.pkgsMeta[pkg]
    versions = testUtil.maxVersionPerMode(Object.keys(versions), self.opts.versions, pkgMeta)
    self.emit('packageResolved', pkg, versions)
    return { versions, latest: versions[versions.length - 1] }
  })

  const pkgInfo = {}
  for (let i = 0; i < packages.length; ++i) {
    pkgInfo[packages[i]] = versionsFinal[i]
  }

  // Now we have all of the package versions we'll need in an object looking
  // like this: {"package": { "versions": ["1.2", "1.3", "2.0"], "latest": "2.0"}}
  return pkgInfo
}

Suite.prototype._runTests = async function _runTests(pkgVersions) {
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
    .map((folder) => new Test(folder, pkgVersions, this.opts))
    .sort((firstEl, secondEl) => secondEl.matrix.length - firstEl.matrix.length)
  this.tests.forEach((test) => {
    queue.push(test)
  })

  await queue.drain()
}

module.exports = Suite
