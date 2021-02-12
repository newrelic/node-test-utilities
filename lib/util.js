/*
 * Copyright 2020 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const semver = require('semver')
const urltils = require(getNewRelicLocation() + '/lib/util/urltils')


/**
 * New Relic test utility functions.
 *
 * @namespace util
 */
const util = module.exports

/**
 * Tests if the given item is a function.
 *
 * @param {*} obj - The object to test.
 *
 * @return {bool} True if `obj` is a function, otherwise false.
 */
util.isFunction = function isFunction(obj) {
  return obj instanceof Function
}

/**
 * Removes all listeners for the specified event with the given name from the
 * given emitter.
 *
 * Useful for removing event listeners added by instrumentation that you do not
 * have direct handles on.
 *
 * @param {EventEmitter}  emitter - The emitter to remove the listeners from.
 * @param {string}        evnt    - The name of the event to clear up.
 * @param {string}        name    - The name of the listeners to remove.
 */
util.removeListenerByName = function removeListenerByName(emitter, evnt, name) {
  var listeners = emitter.listeners(evnt)
  for (var i = 0, len = listeners.length; i < len; ++i) {
    var listener = listeners[i]
    if (listener instanceof Function && listener.name === name) {
      emitter.removeListener(evnt, listener)
    }
  }
}

/**
 * Converts the given duration into a human-readable duration string.
 *
 * @param {number} duration - The duration, in milliseconds.
 *
 * @return {string} A human readable version of the duration.
 */
util.niceDuration = function niceDuration(duration) {
  var seconds = 1000
  var minutes = 60 * seconds
  var hours = 60 * minutes
  var days = 24 * hours

  if (duration < 1) {
    return Math.round(duration * 1000) + '\u00B5s'
  } else if (duration > days) {
    return Math.round(duration / days) + 'd'
  } else if (duration > hours) {
    return Math.round(duration / hours) + 'h'
  } else if (duration > minutes) {
    return Math.round(duration / minutes) + 'm'
  } else if (duration > seconds) {
    return Math.round(duration / seconds) + 's'
  }
  return Math.round(duration) + 'ms'
}

/**
 * Returns the location of the New Relic agent package as would be used by
 * `require` to load the module.
 *
 * @return {string} The location of the agent package.
 */
util.getNewRelicLocation = getNewRelicLocation
function getNewRelicLocation() {
  return process.env.AGENT_PATH || 'newrelic'
}

/**
 * Checks if the given hostname or IP address is a common name for localhost.
 *
 * @type function
 *
 * This does not perform any lookup, it simply checks the given string against a
 * known list of common names or localhost.
 *
 * @param {string} hostname - The host name or IP address to check.
 *
 * @return {bool} True if the given hostname is localhost.
 */
util.isLocalhost = urltils.isLocalhost

/**
 * Returns the given hostname if it is not localhost, or looks up the name of
 * this host if it is localhost.
 *
 * @param {string} hostname - The hostname to delocalize.
 *
 * @return {string} The name of the host identified.
 */
util.getDelocalizedHostname = function getDelocalizedHostname(hostname) {
  // Getting the host name requires an instance of the config object, which
  // requires an agent. This results in a circular reference between this module
  // and TestAgent.
  //
  // TODO: Move `config.getHostnameSafe` to a static utility method and have the
  // config cache the result of that function.
  const TestAgent = require('./agent')
  return util.isLocalhost(hostname)
    ? TestAgent.instance.agent.config.getHostnameSafe()
    : hostname
}

/**
 * This function returns the highest version number of every version in the
 * mode specified.
 *
 * For example, this list of versions in mode "major":
 * [ "1.0.0",
 *   "1.0.1",
 *   "2.0.0",
 *   "2.0.1",
 *   "2.1.1" ]
 * will result in: [ "1.0.1", "2.1.1" ]
 *
 * in mode "minor", it would return: [ "1.0.1", "2.0.1", "2.1.1" ]
 *
 * @param {string[]} versions - A list of version numbers
 * @param {string} mode - Either "major" or "minor", ("patch" will return the
 * same array of versions)
 */
util.maxVersionPerMode = function maxVersionPerMode(versions, mode) {
  // Remove versions that don't fit the semantic versioning convention
  versions = versions.filter((version) => {
    return /^\d+\.\d+\.\d+$/.test(version)
  })

  // Creates an object where the key is the version number up to the mode
  // specified, and the value is the highest version in that set.
  let greatestVersionInMode = {}
  versions.forEach((version) => {
    // Get the version number up to the mode specified. (turns 1.0.1 into 1 if
    // mode is major)
    let versionMode = version
    if (mode === 'major') {
      versionMode = /^(\d+)/.exec(version)[1]
    } else if (mode === 'minor') {
      versionMode = /^(\d+\.\d+)/.exec(version)[1]
    }

    // Keep track of the greatest version version in this mode
    let greatest = greatestVersionInMode[versionMode]
    if (!greatest || semver.gt(version, greatest)) {
      greatestVersionInMode[versionMode] = version
    }
  })

  // Return just the greatest version numbers of each version "mode"
  let greatestVersions = Object.values(greatestVersionInMode)
  return greatestVersions
}
