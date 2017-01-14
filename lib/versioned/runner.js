#! /user/bin/env node
'use strict'
/* eslint-disable no-console */

var a = require('async')
var cp = require('child_process')

// +) Exit codes greater than zero mean the test failed.
// -) Exit codes less than zero mean this script failed.
// 0) Exit codes equal to zero mean everything worked.

var INSTALL_ATTEMPT_LIMIT = 3
var CHILD_TIMEOUT = 60 * 1000 // 1 minute
var CHILD_KILL_TIMEOUT = 10 * 1000 // 10 seconds

var packages = process.argv.slice(2)
if (!packages.length) {
  console.log('Usage: version-runner <test-file> [<package>...]')
  process.exit(-1)
}
var testFile = packages.shift()

a.series([
  // 1) Install all our packages.
  makeWaiter(installPackages),

  // 2) Run the test!
  makeWaiter(runTests)
], function(err) {
  var status = {status: 'done', error: null}
  if (err) {
    console.error(err.message)
    status.error = {
      message: err.message,
      code: err.code
    }
  }
  process.send(status)
  process.exit((err && err.code) || 0)
})

function makeWaiter(action) {
  return function(cb) {
    process.once('message', function(msg) {
      if (msg.command === 'continue') {
        action(function(err) {
          process.send({status: 'completed'})
          cb(err)
        })
      } else {
        var err = new Error('Received wrong command.')
        err.code = -1
        cb(err)
      }
    })
  }
}

function installPackages(cb) {
  process.send({status: 'installing'})
  if (packages.length === 0) {
    return cb()
  }

  tryInstall(0)

  function tryInstall(attempts) {
    var args = ['install']
    args = args.concat(packages)
    spawn('npm', args, function(err) {
      if (err) {
        if (++attempts < INSTALL_ATTEMPT_LIMIT) {
          console.error('Clearing cache and retrying failed install...')
          setTimeout(function() {
            spawn('npm', ['cache', 'clean'], function(err) {
              if (err) {
                var error = new Error('Failed to clear cache: ' + err.stack)
                error.code = -Math.abs(err.code || 0xbeef)
                return cb(error)
              }
              tryInstall(attempts)
            })
          }, 5000 * attempts) // 5 seconds * number of attempts
          return
        }

        var error = new Error('Failed to install packages: ' + err.stack)
        error.code = -Math.abs(err.code)
        return cb(error)
      }
      cb()
    })
  }
}

function runTests(cb) {
  // TODO: Add tap arguments, such as color.
  process.send({status: 'running'})
  spawn('node', [testFile], function(err) {
    if (err) {
      var error = new Error('Failed to execute test: ' + err.stack)
      error.code = Math.abs(err.code)
      return cb(error)
    }
    cb()
  })
}

function spawn(cmd, args, cb) {
  var child = cp.spawn(cmd, args, {
    stdio: ['ignore', process.stdout, process.stderr, 'ipc']
  })

  var terminated = false
  var timeout = setTimeout(function() {
    child.kill('SIGTERM')
    terminated = true
    timeout = setTimeout(function() {
      child.kill('SIGKILL')
    }, CHILD_KILL_TIMEOUT)
  }, CHILD_TIMEOUT)

  var error = null
  child.on('error', function(err) {
    error = err
  })

  child.on('exit', function(code) {
    clearTimeout(timeout)
    if (code !== 0) {
      if (!error) {
        error = new Error('Failed to execute ' + cmd + ' ' + args.join(' '))
      }
      error.code = code
    } else if (!error && terminated) {
      error = new Error('Command timed out: ' + cmd + ' ' + args.join(' '))
      error.code = 0xbad
    }
    cb(error)
  })

  return child
}
