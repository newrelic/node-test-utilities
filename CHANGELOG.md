### v1.1.2 (2018-02-23):

- Added `agent#registerInstrumentation` method to registering third-party instrumentations in a testing environment.

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
