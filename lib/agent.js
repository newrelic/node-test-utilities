'use strict'

var util = require('util')
var EventEmitter = require('events').EventEmitter
var _ = require('lodash')
var Agent = require('newrelic/lib/agent')
var API = require('newrelic/api')
var configurator = require('newrelic/lib/config')
var shimmer = require('newrelic/lib/shimmer')
var testUtil = require('./util')

module.exports = TestAgent

/**
 * Constructs a new TestAgent with a given configuration and enables feature
 * flags if specified.
 *
 * - `new TestAgent([conf [,flags]])`
 *
 * @constructor
 * @classdesc
 *  A helper for managing the newrelic agent in tests.
 *
 * This class is a singleton that should be instantiated at the start of each
 * test and cleaned up at the end using `TestAgent#unload`. The current instance
 * can be found as the static member `TestAgent.instance`.
 *
 * It is best to construct this helper in your test setup functions and call
 * `TestAgent#unload` in your cleanup/tear-down functions.
 *
 * @example
 *  var helper = null
 *  t.beforeEach(function() {
 *    helper = new TestAgent() // _OR_ `helper = TestAgent.makeInstrumented()`
 *  })
 *
 *  t.afterEach(function(done) {
 *    if (helper && TestAgent.instance === helper) {
 *      helper.unload()
 *    }
 *    helper = null
 *    done()
 *  })
 *
 * @param {?object} [conf]  - A newrelic agent configuration.
 * @param {?object} [flags] - Feature flags to enable after configuring.
 */
function TestAgent(conf, flags) {
  // Maintain the one-agent-only requirement.
  if (TestAgent.instance) {
    throw TestAgent.instance._created
  }
  TestAgent.instance = this

  // Set up a testing configuration.
  var config = configurator.initialize(conf)
  config.debug = config.debug || {}
  config.debug.double_linked_transactions = true
  config.applications = function faked() {
    return ['New Relic for Node.js tests']
  }

  // Create our new agent.
  this.agent = new Agent(config)
  this._created = new Error("Only one agent at a time! This one was created at:")

  // Enable any feature flags listed.
  if (flags) {
    this.agent.config.feature_flag = _.assign({}, this.agent.config.feature_flag, flags)
  }

  this.agent.on('transactionFinished', function(transaction) {
    TestAgent.instance.emit('transactionEnd', transaction)
  })

  this.api = new API(this.agent)
}
util.inherits(TestAgent, EventEmitter)

/**
 * The singleton instance of the `TestAgent` class.
 *
 * Will be `null` if no `TestAgent` is currently instantiated.
 *
 * @type {?TestAgent}
 */
TestAgent.instance = null

/**
 * Factory method for constructing an agent helper and bootstrapping agent
 * instrumentation.
 *
 * - `TestAgent.makeInstrumented([conf [, flags]])`
 *
 * @param {?object} [conf]  - A newrelic agent configuration.
 * @param {?object} [flags] - Feature flags to enable after configuring.
 *
 * @return {TestAgent} The newly created `TestAgent` instance.
 */
TestAgent.makeInstrumented = function makeInstrumented(conf, flags) {
  var helper = new TestAgent(conf, flags)
  helper.instrument()
  return helper
}

/**
 * Enables instrumentation from the shimmer.
 *
 * Calling this method or `TestAgent.makeInstrumented` is required for
 * instrumentations to actually be loaded and run when packages are loaded.
 *
 * When this method is called it is imperative that `TestAgent#unload` be called
 * after the test(s) run.
 *
 * @return {TestAgent} This `TestAgent` is returned.
 */
TestAgent.prototype.instrument = function instrument() {
  shimmer.debug = true
  shimmer.patchModule(this.agent)
  shimmer.bootstrapInstrumentation(this.agent)

  return this
}

/**
 * Removes all instrumentation added by this agent and clears the `TestAgent`
 * singleton instance.
 *
 * It is usually a good idea to put this into your `afterEach` cleanup function
 * and create a new TestAgent in your `beforeEach` setup function. This ensures
 * that tests aren't stepping on eachothers' toes.
 */
TestAgent.prototype.unload = function unload() {
  shimmer.unpatchModule()
  shimmer.unwrapAll()
  shimmer.debug = false

  testUtil.removeListenerByName(
    process,
    'uncaughtException',
    '__NR_uncaughtExceptionHandler'
  )
  testUtil.removeListenerByName(
    process,
    'unhandledRejection',
    '__NR_unhandledRejectionHandler'
  )

  if (this === TestAgent.instance) {
    TestAgent.instance = null
  }
}

/**
 * Executes the given function in the context of a transaction.
 *
 * - `helper.runInTransaction([type, ] func)`
 *
 * The newly created transaction is passed to the given function.
 *
 * @param {string}    [type]  - The type of transaction to construct.
 * @param {function}  func    - The function to execute within a transaction.
 *
 * @return {*} The return value of `func`.
 */
TestAgent.prototype.runInTransaction = function runInTransaction(type, func) {
  if (testUtil.isFunction(type)) {
    func = type
    type = null
  }

  var self = this
  return this.agent.tracer.transactionProxy(function txProxy() {
    return func(self.getTransaction())
  })() // <-- Auto-invoke our proxy.
}

/**
 * Gets the transaction that is currently active in the tracer.
 *
 * @return {Transaction} The current tracer transaction.
 */
TestAgent.prototype.getTransaction = function getTransaction() {
  return this.agent.getTransaction()
}

TestAgent.prototype.getApi = function() {
  return this.api
}
