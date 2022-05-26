#! /user/bin/env node
/*
 * Copyright 2020 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'
/* eslint-disable no-console */

const a = require('async')
const cp = require('child_process')

// +) Exit codes greater than zero mean the test failed.
// -) Exit codes less than zero mean this script failed.
// 0) Exit codes equal to zero mean everything worked.

const CHILD_TIMEOUT = 60 * 1000 // 1 minute
const CHILD_KILL_TIMEOUT = 10 * 1000 // 10 seconds

const packages = process.argv.slice(2)
if (!packages.length) {
  console.log('Usage: version-runner <test-file> [<package>...]')
  // eslint-disable-next-line no-process-exit
  process.exit(-1)
}
const testFile = packages.shift()

a.series(
  [
    // 1) Install all our packages.
    makeWaiter(installPackages),

    // 2) Run the test!
    makeWaiter(runTests)
  ],
  function endHandler(err) {
    const status = { status: 'done', error: null }
    if (err) {
      console.error(err.message)
      status.error = {
        message: err.message,
        code: err.code
      }
    }
    process.send(status)
    // eslint-disable-next-line no-process-exit
    process.exit((err && err.code) || 0)
  }
)

function makeWaiter(action) {
  return function waiterHandler(cb) {
    process.once('message', function msgHandler(msg) {
      if (msg.command === 'continue') {
        action((err) => {
          process.send({ status: 'completed' })
          cb(err)
        })
      } else {
        const err = new Error('Received wrong command.')
        err.code = -1
        cb(err)
      }
    })
  }
}

function installPackages(cb) {
  process.send({ status: 'installing' })
  if (packages.length === 0) {
    return cb()
  }

  tryInstall()

  function tryInstall() {
    let args = [
      'install',
      '--no-save', // do not update package file
      '--no-package-lock', // do not update package-lock file
      '--no-audit', // skip audit output
      '--no-fund' // skip funding output
    ]
    args = args.concat(packages)
    spawn('npm', args, function installHandler(err) {
      if (err) {
        err.code = -Math.abs(err.code)
      }
      cb(err)
    })
  }
}

function runTests(cb) {
  // TODO: Add tap arguments, such as color.
  process.send({ status: 'running' })
  spawn('node', [testFile], function testHandler(err) {
    if (err) {
      const error = new Error('Failed to execute test: ' + err.stack)
      error.code = Math.abs(err.code)
      return cb(error)
    }
    cb()
  })
}

function spawn(cmd, args, cb) {
  const child = cp.spawn(cmd, args, {
    stdio: ['ignore', process.stdout, process.stderr, 'ipc']
  })

  let terminated = false
  let timeout = setTimeout(function sigTerm() {
    child.kill('SIGTERM')
    terminated = true
    timeout = setTimeout(function sigKill() {
      child.kill('SIGKILL')
    }, CHILD_KILL_TIMEOUT)
  }, CHILD_TIMEOUT)

  let error = null
  child.on('error', function erroHandler(err) {
    error = err
  })

  child.on('exit', function exitHandler(code, signal) {
    clearTimeout(timeout)

    if (code) {
      if (!error) {
        error = new Error('Failed to execute ' + cmd + ' ' + args.join(' '))
      }
      error.code = code
    } else if (!error && terminated) {
      error = new Error('Command timed out: ' + cmd + ' ' + args.join(' '))
      error.code = 0xbad
    }

    // https://nodejs.org/api/child_process.html#child_process_event_exit
    // If the process exited, code is the final exit code of the process,
    // otherwise null. If the process terminated due to receipt of a signal,
    // signal is the string name of the signal, otherwise null. One of the
    // two will always be non-null.
    if (null === code && !error && signal) {
      // if there's no exit code but we exited due to a received signal,
      // raise an appropriate error.
      error = new Error('Aborted with signal ' + signal + ' ' + cmd + ' ' + args.join(' '))
      error.code = 0xbad
    }

    cb(error)
  })

  return child
}
