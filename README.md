[![Community Project header](https://github.com/newrelic/opensource-website/raw/master/src/images/categories/Community_Project.png)](https://opensource.newrelic.com/oss-category/#community-project)

# New Relic Test Utilities
Library full of test utilities and helpers for New Relic instrumentation modules.
The full documentation for this module can be
[found on GitHub](https://newrelic.github.io/node-test-utilities).

## Installation
It can be installed and used as such:

```
npm install @newrelic/test-utilities
```
```js
// index.js
require('@newrelic/test-utilities')
```

## Usage

### TestAgent Helper
The TestAgent class helps set up a New Relic agent suitable for tests. With
this you can run your tests within transactions without having to actually set
up a full New Relic application. The helper should be created and torn down for
each test to ensure you are running in a clean environment each time. In `tap`
this may look like this:

```js
tap.test('some test suite', (t) => {
  let helper = null
  t.beforeEach((done) => {
    helper = utils.TestAgent.makeInstrumented()
    done()
  })

  t.afterEach((done) => {
    helper && helper.unload()
    done()
  })

  t.test('test 1', (t) => {
    helper.runInTransaction((tx) => {
      // Your test is now in transaction context and normal instrumentation
      // logic should occur.
    })
  })
})
```

### Assertions
There are a number of assertions provided to help write your tests. Each of
these assertions can either be used directly (`utils.assert.segments(...)`) or
as tap tests (`t.segments(...)`). In the direct use case they will throw
exceptions, and thus can be used like any other assertion library. Here are a
few examples of using them:

```js
let tap = require('tap')
let utils = require('@newrelic/test-utilities')

// This adds all the assertions to tap's `Test` class.
utils.assert.extendTap(tap)

tap.test((t) => {
  let helper = utils.TestAgent.makeInstrumented()
  t.tearDown(() => helper.unload())

  helper.runInTransaction((tx) => {
    // Do some testing logic...

    // This will check that transaction state hasn't been lost and that the given
    // transaction is the currently active one. A good check to make in the
    // callbacks to asynchronous methods.
    t.transaction(tx, 'should be in correct context')

    // This will check that the transaction trace has the segment structure you
    // describe. Extra segments in the trace are allowed.
    t.segments(tx.trace.root, [{name: 'mysegment'}], 'should have expected segments')

    // Like above, this checks the structure of the trace against the one you
    // describe but they must exactly match. Any extra segments in the trace are
    // considered a failure.
    t.exactSegments(tx.trace.root, [{name: 'mysegment'}], 'should have expected segments')

    // Many metrics are not created until the transaction ends, if you're
    // missing metrics in your instrumentation tests, this may help.
    tx.end()

    // This will check that the metrics given have been created. Extra metrics
    // are allowed.
    t.metrics(['/My/Metric'], 'should have created metrics')

    // Like above, this checks that the given metrics were created. Any extra
    // metrics that were created are considered a failure.
    t.exactMetrics(['/My/Metric', '/Another/Metric'], 'should have exactly these metrics')
  })
})
```

### Versioned Tests

The `versioned-tests` script can be used to execute a series of tests against
several versions of dependencies. For example, the command below would run all
the tests against every minor version of the specified dependencies.

```sh
$ versioned-tests --minor tests/versioned/*.tap.js
```

You can then specify the versions you want to run this against by adding a
`package.json` file in your tests directory. This package file should have a
`tests` array describing each suite. For example, the one shown below will test
different files for each version of `mongodb` from `v1.0.0` through to the latest.

```json
{
  "name": "mongodb-tests",
  "version": "0.0.0",
  "private": true,
  "tests": [
    {
      "engines": {
        "node": ">=0.10 <7"
      },
      "dependencies": {
        "mongodb": "^1"
      },
      "files": [
        "v1-tests.tap.js"
      ]
    },
    {
      "engines": {
        "node": ">=0.10"
      },
      "dependencies": {
        "mongodb": ">=2.1 <3"
      },
      "files": [
        "v2-tests.tap.js",
        "shared-tests.tap.js"
      ]
    },
    {
      "engines": {
        "node": ">=4"
      },
      "dependencies": {
        "mongodb": ">=3"
      },
      "files": [
        "v3-tests.tap.js",
        "shared-tests.tap.js"
      ]
    }
  ]
}
```

## Testing
The module includes a suite of unit and functional tests which should be used to
verify that your changes don't break existing functionality.

All tests are stored in `tests/` and are written using
[Node-Tap](https://www.npmjs.com/package/tap) with the extension `.tap.js`.

To run the full suite, run: `npm test`.

Individual test scripts include:

```
npm run lint
npm run unit
```

## Support
New Relic hosts and moderates an online forum where you can interact with New Relic employees as well as other customers to get help and share best practices. Like all official New Relic open source projects, there's a related Community topic in the New Relic Explorers Hub. You can find this project's topic/threads here: https://discuss.newrelic.com/c/support-products-agents/node-js-agent/.

## Contributing
We encourage your contributions to improve New Relic Test Utilities! Keep in mind when you submit your pull request, you'll need to sign the CLA via the click-through using CLA-Assistant. You only have to sign the CLA one time per project.

If you have any questions, or to execute our corporate CLA, required if your contribution is on behalf of a company, please drop us an email at opensource@newrelic.com.

## License
New Relic Test Utilities is licensed under the [Apache 2.0](http://apache.org/licenses/LICENSE-2.0.txt) License.

New Relic Test Utilities also uses source code from third-party libraries. You can find full details on which libraries are used and the terms under which they are licensed in the third-party notices document.
