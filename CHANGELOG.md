
### v3.0.0 (2019-01-07):

- Added `setState` argument to `TestAgent` constructor, which allows for
automatic data collection in tests by default.

- Removed obsoleted `flags` argument from `TestAgent` constructor. Feature
flags are now accounted for in standard config.

### v2.0.1 (2018-11-06):

- Versioned test runner now uses `--no-package-lock` when installing test deps.

### v2.0.0 (2018-10-26):

- Dropped support for Node 0.10 and Node 0.12.

- Added `isLocalhost` and `getDelocalizedHostname` to utilities methods.

  These methods are useful for determining the host name as the New Relic agent
  sees it. When making metrics and event attributes, the delocalized hostname is
  what the agent will use.

### v1.2.1 (2018-07-10):

- Fixed default messages for tap assertions.

### v1.2.0 (2018-02-26):

- Added check for `AGENT_PATH` environment variable.

  This environment variable can be used to specify the location of the `newrelic`
  package that these test utilities will load. It should be the path to the root
  directory of the agent. If the environment variable is not set, then the
  `newrelic` module that was installed (e.g. is in a `node_modules` directory)
  is used instead.

- With this change, the following syntaxes are now valid:

  * `versioned-tests`: Will look for tests with the following globs:
    * `test/versioned/**/package.json`
    * `tests/versioned/**/package.json`
    * `node_modules/**/tests/versioned/**/package.json` <-- For the agent to
      seamlessly work with the tests of deps!
  * `versioned-tests test/versioned/hapi`: Will look with these globs:
    * `test/versioned/hapi/package.json`
    * `test/versioned/hapi/**/package.json`
  * `versioned-tests test/versioned/mongodb/package.json`: Will look only at:
    * `test/versioned/mongodb/package.json`

### v1.1.2 (2018-02-23):

- Added `agent#registerInstrumentation` method to registering third-party
  instrumentations in a testing environment.

### v1.1.1 (2018-02-23):

- Fixed invalid `TestAgent.extendTap` reference in `index.js` to `assert.extendTap`.

### v1.1.0 (2018-02-20):

- Added `TestAgent#registerInstrumentation` method.

  This method allows third-party instrumentations to be registered in a test environment.

### v1.0.0 (2018-02-20):

- Added `TestAgent` helper class.

  This class provides simple to use helpers for running your tests with the agent
  and in transactions.

- Added `tap` assertions.

  If your tests use [`tap`](https://www.npmjs.com/package/tap), then you can add
  some helpful assertions to your tests using this module.

- Added version matrix test running.

  This is a script for executing your instrumentation's tests against many
  versions of the module you are instrumenting.
