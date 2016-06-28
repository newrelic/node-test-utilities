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
