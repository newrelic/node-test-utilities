'use strict'

var concatStream = require('concat-stream')
var cp = require('child_process')
var EventEmitter = require('events').EventEmitter
var path = require('path')
var util = require('util')

var TestMatrix = require('./matrix')

var TEST_EXECUTOR = path.resolve(__dirname, './runner.js')

function Test(directory, pkgVersions) {
  this.directory = directory
  this.matrix = new TestMatrix(
    require(path.join(directory, 'package')).tests,
    pkgVersions
  )
  this.runs = 0
  this.failed = false
  this.currentRun = null
  this.previousRun = null
  this.duration = 0
}

Test.prototype.next = function() {
  var task = this.matrix.next()
  if (task) {
    task.test = path.join(this.directory, task.test)
  }

  return task
}

Test.prototype.peek = function() {
  var task = this.matrix.peek()
  if (task) {
    task.test = path.join(this.directory, task.test)
  }

  return task
}

Test.prototype.run = function() {
  var task =  this.next()

  if (!task) {
    return null
  }

  this.previousRun = this.currentRun
  this.currentRun = task
  ++this.runs
  this.failed = false
  var self = this

  // Convert our packages into an array of package@version strings to install
  // with npm.
  var pkgs = this._getPackageDiff(this.previousRun, task)
  task.packageVersions = Object.keys(task.packages).map(function(pkg) {
    return pkg + '@' + task.packages[pkg]
  })

  var child = cp.spawn('node', [TEST_EXECUTOR, task.test].concat(pkgs), {
    cwd: this.directory,
    stdio: ['ignore', 'pipe', 'pipe', 'ipc']
  })

  var testRun = new TestRun(child, pkgs.length > 0)
  testRun.on('end', function() {
    self.duration += testRun.duration
    self.stdout = testRun.stdout
    self.stderr = testRun.stderr
  })

  return testRun
}

Test.prototype.nextNeedsInstall = function() {
  var task = this.next()
  if (!task) {
    return false
  }

  var pkgs = this._getPackageDiff(this.currentRun, task)
  return (pkgs && pkgs.length > 0)
}

Test.prototype._getPackageDiff = function(a, b) {
  // Find all packages in `b` whose values differ from `a`.
  return Object.keys(b.packages).filter(function(pkg) {
    return !a || a.packages[pkg] !== b.packages[pkg]
  }).map(function(pkg) {
    return pkg + '@' + b.packages[pkg]
  })
}

function TestRun(child, needsInstall) {
  var self = this
  EventEmitter.call(this)
  this._child = child
  this.needsInstall = needsInstall
  this.duration = 0
  this._start = null

  child.on('message', function(msg) {
    if (msg.status === 'completed') {
      var hrduration = process.hrtime(self._start)
      self.duration += (hrduration[0] * 1e3) + (hrduration[1] * 1e-6)
    }
    self.emit(msg.status)
  })

  child.on('exit', function(code) {
    self.failed = code !== 0
    if (code < 0) {
      self.emit('error', new Error('Child errored: ' + code))
    }
    self.emit('end')
  })

  child.stdout.pipe(concatStream(function(output) {
    self.stdout = output.toString('utf8')
  }))
  child.stderr.pipe(concatStream(function(output) {
    self.stderr = output.toString('utf8')
  }))
}
util.inherits(TestRun, EventEmitter)

TestRun.prototype.continue = function() {
  this._start = process.hrtime()
  this._child.send({command: 'continue'})
}

module.exports = Test
