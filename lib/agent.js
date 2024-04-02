/*
 * Copyright 2020 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const testUtil = require('./util')

const newRelicLoc = testUtil.getNewRelicLocation()
const Agent = require(newRelicLoc + '/lib/agent')
const API = require(newRelicLoc + '/api')
const configurator = require(newRelicLoc + '/lib/config')
const InstrumentationTracker = require(newRelicLoc + '/lib/instrumentation-tracker')
const shimmer = require(newRelicLoc + '/lib/shimmer')

module.exports = TestAgent

/**
 * Constructs a new TestAgent with a given configuration.
 *
 * - `new TestAgent([conf [,setState]])`
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
 * @param {?object}  [conf]          - A newrelic agent configuration.
 * @param {?boolean} [setState=true] - Initialize agent with 'started' state.
 */
function TestAgent(conf, setState) {
  // Maintain the one-agent-only requirement.
  if (TestAgent.instance) {
    throw TestAgent.instance._created
  }
  TestAgent.instance = this

  // Set up a testing configuration.
  const config = configurator.createInstance(conf)
  config.debug = config.debug || {}
  config.debug.double_linked_transactions = true
  config.applications = function faked() {
    return ['New Relic for Node.js tests']
  }

  // Create our new agent.
  this.agent = new Agent(config)
  this._contextManager = this.agent._contextManager
  this._created = new Error('Only one agent at a time! This one was created at:')

  if (setState == null) {
    setState = true
  }

  // Allow automatic data collection
  if (setState) {
    this.agent.setState('started')
  }
}

/**
 * The singleton instance of the `TestAgent` class.
 *
 * Will be `null` if no `TestAgent` is currently instantiated.
 *
 * @type {?TestAgent}
 */
TestAgent.instance = null

/**
 * Factory method for constructing an agent helper and bootstrapping core agent
 * instrumentation.
 *
 * - `TestAgent.makeInstrumented([conf [, setState]])`
 *
 * @param {?object}  [conf]          - A newrelic agent configuration.
 * @param {?boolean} [setState=true] - Initialize agent with 'started' state.
 * @param {?boolean} [instrumentFull=false] - Flag to register 3rd party instrumentation
 *
 * @return {TestAgent} The newly created `TestAgent` instance.
 */
TestAgent.makeInstrumented = function makeInstrumented(conf, setState, instrumentFull) {
  const helper = new TestAgent(conf, setState)
  helper.instrument(instrumentFull)
  return helper
}

/**
 * Factory method for constructing an agent helper and bootstrapping core and
 * 3rd party agent instrumentation.
 *
 * - `TestAgent.makeFullyInstrumented([conf [, setState]])`
 *
 * @param {?object}  [conf]          - A newrelic agent configuration.
 * @param {?boolean} [setState=true] - Initialize agent with 'started' state.
 *
 * @return {TestAgent} The newly created `TestAgent` instance.
 */
TestAgent.makeFullyInstrumented = function makeInstrumented(conf, setState) {
  return TestAgent.makeInstrumented(conf, setState, true)
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
 * @param {boolean} [instrumentFull=false] - Flag to register 3rd party instrumentation
 * @return {TestAgent} This `TestAgent` is returned.
 */
TestAgent.prototype.instrument = function instrument(instrumentFull = false) {
  shimmer.debug = true
  if (instrumentFull) {
    shimmer.bootstrapInstrumentation(this.agent)
  } else {
    shimmer.registerCoreInstrumentation(this.agent)
  }
  shimmer.registerHooks(this.agent)

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
  shimmer.removeHooks()
  shimmer.unwrapAll()
  shimmer.debug = false
  if (
    Object.prototype.toString.call(shimmer.registeredInstrumentations) ===
    '[object InstrumentationTracker]'
  ) {
    shimmer.registeredInstrumentations = new InstrumentationTracker()
  } else {
    shimmer.registeredInstrumentations = Object.create(null)
  }

  testUtil.removeListenerByName(process, 'uncaughtException', '__NR_uncaughtExceptionHandler')
  testUtil.removeListenerByName(process, 'unhandledRejection', '__NR_unhandledRejectionHandler')

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

  const self = this
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

/**
 * Gets an agent API instance for test instance.
 */
TestAgent.prototype.getAgentApi = function getAgentApi() {
  if (!this._agentApi) {
    this._agentApi = new API(this.agent)
  }

  return this._agentApi
}

/**
 * Gets a shim instance for a package.
 * @param {object} pkg exported obj that is instrumented
 * @returns The existing or newly created shim.
 */
TestAgent.prototype.getShim = function getShim(pkg) {
  const [shimSymbol] = Object.getOwnPropertySymbols(pkg).filter(
    (key) => key.toString() === 'Symbol(shim)'
  )

  return pkg?.[shimSymbol]
}

/**
 * Retrieve the active context manager, if one exists.
 * Agent versions 8.6.0+ include a context management API.
 * @returns {*} The active Context Manager instance.
 */
TestAgent.prototype.getContextManager = function getContextManager() {
  return this._contextManager
}

/**
 * Registers instrumentation in the shimmer.
 *
 * @param {object} opts
 *  Instrumentation options object.
 *
 * @param {string} opts.type
 *  Module type ('generic', 'database', 'message', 'web-framework').
 *
 * @param {string} opts.moduleName
 *  Module name.
 *
 * @param {function} opts.onRequire
 *  Module instrumentation.
 */
TestAgent.prototype.registerInstrumentation = function registerInstrumentation(opts) {
  if (!opts.onError) {
    opts.onError = function throwOnError(err) {
      throw err
    }
  }
  shimmer.registerInstrumentation(opts)
}
