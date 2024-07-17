<a href="https://opensource.newrelic.com/oss-category/#community-project"><picture><source media="(prefers-color-scheme: dark)" srcset="https://github.com/newrelic/opensource-website/raw/main/src/images/categories/dark/Community_Project.png"><source media="(prefers-color-scheme: light)" srcset="https://github.com/newrelic/opensource-website/raw/main/src/images/categories/Community_Project.png"><img alt="New Relic Open Source community project banner." src="https://github.com/newrelic/opensource-website/raw/main/src/images/categories/Community_Project.png"></picture></a>
adfas
adfas
# New Relic Test Utilities 

[![npm status badge][3]][4] [![Test Utilities CI][1]][2] [![codecov][5]][6]

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

<!-- ## Getting Started

>[Simple steps to start working with the software similar to a "Hello World"]
 -->
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
the tests suffixed with `.tap.js` against every minor version of the specified
dependencies.

```sh
$ versioned-tests --minor tests/versioned/*.tap.js
```

The following command will run only those test files whose names include the
keyword *redis*:

```sh
$ versioned-tests tests/versioned/ -P redis
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

The versioned tests runner has a timeout for tests that defaults to one minute. That is, if running a test -- including installing its dependencies! -- takes longer than a minute, then that test is considered to have failed. You can change this timeout with the `TEST_CHILD_TIMEOUT` environment variable, which is interpreted as a number of milliseconds. For example, to set a test timeout of ten minutes, you could invoke the test runner like this:

```sh
$ TEST_CHILD_TIMEOUT=600000 versioned-tests
```

As ten minutes is 600,000 milliseconds.

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

Should you need assistance with New Relic products, you are in good hands with several support channels.

If the issue has been confirmed as a bug or is a feature request, please file a GitHub issue.

**Support Channels**

* [GitHub Documentation](https://newrelic.github.io/node-test-utilities): Test Utilities specific documentation
* [New Relic Documentation](https://docs.newrelic.com/docs/agents/nodejs-agent): Comprehensive guidance for using our platform
* [New Relic Community](https://forum.newrelic.com/): The best place to engage in troubleshooting questions
* [New Relic Developer](https://developer.newrelic.com/): Resources for building a custom observability applications
* [New Relic University](https://learn.newrelic.com/): A range of online training for New Relic users of every level


## Privacy
At New Relic we take your privacy and the security of your information seriously, and are committed to protecting your information. We must emphasize the importance of not sharing personal data in public forums, and ask all users to scrub logs and diagnostic information for sensitive information, whether personal, proprietary, or otherwise.

We define “Personal Data” as any information relating to an identified or identifiable individual, including, for example, your name, phone number, post code or zip code, Device ID, IP address and email address.

For more information, review [New Relic’s General Data Privacy Notice](https://newrelic.com/termsandconditions/privacy).

## Contribute

We encourage your contributions to improve New Relic Test Utilities! Keep in mind when you submit your pull request, you'll need to sign the CLA via the click-through using CLA-Assistant. You only have to sign the CLA one time per project.

If you have any questions, or to execute our corporate CLA, required if your contribution is on behalf of a company, please drop us an email at opensource@newrelic.com.

**A note about vulnerabilities**

As noted in our [security policy](https://github.com/newrelic/node-test-utilities/security/policy), New Relic is committed to the privacy and security of our customers and their data. We believe that providing coordinated disclosure by security researchers and engaging with the security community are important means to achieve our security goals.

If you believe you have found a security vulnerability in this project or any of New Relic's products or websites, we welcome and greatly appreciate you reporting it to New Relic through [Hacour bug bounty program](https://docs.newrelic.com/docs/security/security-privacy/information-security/report-security-vulnerabilities/).

If you would like to contribute to this project, review [these guidelines](./CONTRIBUTING.md).

To [all contributors](https://github.com/newrelic/node-test-utilities/graphs/contributors), we thank you!  Without your contribution, this project would not be what it is today.  We also host a community project page dedicated to [New Relic Node Test Utilities](https://opensource.newrelic.com/projects/newrelic/node-test-utilities).

## License
New Relic Test Utilities is licensed under the [Apache 2.0](http://apache.org/licenses/LICENSE-2.0.txt) License.

New Relic Test Utilities also uses source code from third-party libraries. You can find full details on which libraries are used and the terms under which they are licensed in the third-party notices document.

[1]: https://github.com/newrelic/node-test-utilities/workflows/Test%20Utilities%20CI/badge.svg
[2]: https://github.com/newrelic/node-test-utilities/actions?query=workflow%3A%22Test+Utilities+CI%22
[3]: https://img.shields.io/npm/v/@newrelic/test-utilities.svg
[4]: https://www.npmjs.com/package/@newrelic/test-utilities
[5]: https://codecov.io/gh/newrelic/node-test-utilities/branch/main/graph/badge.svg
[6]: https://codecov.io/gh/newrelic/node-test-utilities
