'use strict'

/**
 * New Relic test utility functions.
 *
 * @namespace util
 */
var util = module.exports

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
