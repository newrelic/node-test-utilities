/*
 * Copyright 2020 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const concatStream = require('concat-stream')
const cp = require('child_process')
const EventEmitter = require('events').EventEmitter
const path = require('path')
const util = require('util')

const TestMatrix = require('./matrix')

const TEST_EXECUTOR = path.resolve(__dirname, './runner.js')

function Test(directory, pkgVersions, opts = {}) {
  const { allPkgs, testPatterns, globalSamples } = opts
  const pkg = require(path.join(directory, 'package'))
  const dirname = path.basename(directory)

  this.name = dirname === 'versioned' ? pkg.name : dirname
  this.directory = directory
  if (testPatterns) {
    // filter tests for only those files that match the test pattern
    pkg.tests = pkg.tests
      .map((test) => {
        test.files = test.files.filter((file) => {
          return (
            testPatterns.filter((pattern) => {
              return file.indexOf(pattern) > -1
            }).length > 0
          )
        })
        return test
      })
      .filter((test) => !!test.files.length)
  }
  this.matrix = new TestMatrix(pkg.tests, pkgVersions, globalSamples)
  this.runs = 0
  this.failed = false
  this.currentRun = null
  this.previousRun = null
  this.duration = 0
  this.allPkgs = !!allPkgs
}

Test.prototype.next = function next() {
  const task = this.matrix.next()
  if (task) {
    task.test = path.join(this.directory, task.test)
  }

  return task
}

Test.prototype.peek = function peek() {
  const task = this.matrix.peek()
  if (task) {
    task.test = path.join(this.directory, task.test)
  }

  return task
}

Test.prototype.run = function run() {
  const task = this.next()

  if (!task) {
    return null
  }

  this.previousRun = this.currentRun
  this.currentRun = task
  ++this.runs
  this.failed = false
  const self = this

  // Calculate package differences to determine when all package
  // combinations have been tested
  const pkgs = this._getPackageDiff(this.previousRun, task)

  // format packages to provide exact version install
  // (e.g redis@1.2.1)
  task.packageVersions = Object.keys(task.packages).map((pkg) => `${pkg}@${task.packages[pkg]}`)

  // previously this only installed package differences `pkgs` but with the introduction
  // of npm 7, running `npm install <pkg>` would remove all packages not related to
  // the one packages you were installing. The runner has a new -a prop that is a boolean
  const pkgList = this.allPkgs ? task.packageVersions : pkgs

  // Spawn another runner instance with list of packages to install
  const child = cp.spawn('node', [TEST_EXECUTOR, task.test].concat(pkgList), {
    cwd: this.directory,
    stdio: ['ignore', 'pipe', 'pipe', 'ipc']
  })

  const testRun = new TestRun(child, pkgs.length > 0)
  testRun.on('end', function endHandler() {
    self.duration += testRun.duration
    self.stdout = testRun.stdout
    self.stderr = testRun.stderr
  })

  return testRun
}

Test.prototype.nextNeedsInstall = function nextNeedsInstall() {
  const task = this.next()
  if (!task) {
    return false
  }

  const pkgs = this._getPackageDiff(this.currentRun, task)
  return pkgs && pkgs.length > 0
}

Test.prototype._getPackageDiff = function _getPackageDiff(a, b) {
  // Find all packages in `b` whose values differ from `a`.
  return Object.keys(b.packages)
    .filter((pkg) => {
      return !a || a.packages[pkg] !== b.packages[pkg]
    })
    .map((pkg) => {
      return pkg + '@' + b.packages[pkg]
    })
}

function TestRun(child, needsInstall) {
  const self = this
  EventEmitter.call(this)
  this._child = child
  this.needsInstall = needsInstall
  this.duration = 0
  this._start = null

  child.on('message', function messageHandler(msg) {
    if (msg.status === 'completed') {
      const hrduration = process.hrtime(self._start)
      self.duration += hrduration[0] * 1e3 + hrduration[1] * 1e-6
    }
    self.emit(msg.status)
  })

  child.on('exit', function exitHandler(code) {
    self.failed = code !== 0
    if (code < 0) {
      self.emit('error', new Error('Child errored: ' + code))
    }
    self.emit('end')
  })

  child.stdout.pipe(
    concatStream(function stdoutStream(output) {
      self.stdout = output.toString('utf8')
    })
  )
  child.stderr.pipe(
    concatStream(function stderrStream(output) {
      self.stderr = output.toString('utf8')
    })
  )
}
util.inherits(TestRun, EventEmitter)

TestRun.prototype.continue = function cont() {
  this._start = process.hrtime()
  this._child.send({ command: 'continue' })
}

module.exports = Test
