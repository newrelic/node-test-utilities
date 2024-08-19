### v9.1.0 (2024-08-19)

#### Features

* Added a --matrix-count parameter to versioned tests ([#230](https://github.com/newrelic/node-test-utilities/pull/230)) ([72d8c7d](https://github.com/newrelic/node-test-utilities/commit/72d8c7dbc87a51978a9a635b608443da9518c957))

### v9.0.0 (2024-07-31)
#### ⚠ BREAKING CHANGES

* Dropped support for Node.js 16

#### Features

* Dropped support for Node.js 16 ([#228](https://github.com/newrelic/node-test-utilities/pull/228)) ([e776e55](https://github.com/newrelic/node-test-utilities/commit/e776e555b960083bec1e6ea482a27c469f164076))

#### Code refactoring

* Reduced dependency on async library ([#219](https://github.com/newrelic/node-test-utilities/pull/219)) ([582efe6](https://github.com/newrelic/node-test-utilities/commit/582efe6c58c339d8235dfa165c50230209a42d02))
* Removed install queue from versioned runner. It will install before running a given test and rely on the jobs limit ([#221](https://github.com/newrelic/node-test-utilities/pull/221)) ([d9c6d1b](https://github.com/newrelic/node-test-utilities/commit/d9c6d1b24e6e58c03a0359545003420685f85793))

#### Continuous integration

* Fixed test script to run all unit tests ([#218](https://github.com/newrelic/node-test-utilities/pull/218)) ([61336d4](https://github.com/newrelic/node-test-utilities/commit/61336d448d1aba16db0bb4bc6fabdd7d080598db))

### v8.7.0 (2024-06-28)

#### Features

* Added support for Node 22

#### Code refactoring

* Removed --all flag from versioned runner as all runs will be using this since we no longer support Node.js versions that do not ship with npm7 ([#216](https://github.com/newrelic/node-test-utilities/pull/216)) ([0db82d8](https://github.com/newrelic/node-test-utilities/commit/0db82d88dfe189a4c9ca954fb34121fc2de2d702))

#### Miscellaneous chores

* Updated minimum version of some dev dependencies. ([#209](https://github.com/newrelic/node-test-utilities/pull/209)) ([e032b3e](https://github.com/newrelic/node-test-utilities/commit/e032b3ea543cb331623fcf10d891428f7906c2ee))([#210](https://github.com/newrelic/node-test-utilities/pull/210)) ([a6b631f](https://github.com/newrelic/node-test-utilities/commit/a6b631fc9d9e4c08573304febfe9b68d262f1198))([#212](https://github.com/newrelic/node-test-utilities/pull/212)) ([40fae94](https://github.com/newrelic/node-test-utilities/commit/40fae941e0f40852f6b0f0e89e2865580fcec2df))

#### Continuous integration

* Added Node 22 to CI ([#204](https://github.com/newrelic/node-test-utilities/pull/204)) ([e24fdbc](https://github.com/newrelic/node-test-utilities/commit/e24fdbca95cfb9f7ab75cd77a34a7028d893b631))

### v8.6.0 (2024-06-03)

#### Miscellaneous chores

* Updated mock agent to exclusively rely on InstrumentationTracker ([#203](https://github.com/newrelic/node-test-utilities/pull/203)) ([0e4d810](https://github.com/newrelic/node-test-utilities/commit/0e4d810210ab2c1e228756d29165791fdd1e4374))

### v8.5.0 (2024-04-15)

#### Features

* Added a quiet mode printer to versioned-tests ([#201](https://github.com/newrelic/node-test-utilities/pull/201)) ([9477251](https://github.com/newrelic/node-test-utilities/commit/94772519120473980ad264f9da7b99651cca2faf))

#### Continuous integration

* Removed `use_new_release` input from prepare release workflow ([#200](https://github.com/newrelic/node-test-utilities/pull/200)) ([0f40f8b](https://github.com/newrelic/node-test-utilities/commit/0f40f8befbf82aea5fd31fcfa57a6464f3bff393))
* removed changelog.json file ([#198](https://github.com/newrelic/node-test-utilities/pull/198)) ([3a32b2b](https://github.com/newrelic/node-test-utilities/commit/3a32b2b0b0a5df723f631f43470d6e48deb8cbde))

### v8.4.0 (2024-04-02)

#### Miscellaneous chores

* Added instrumentation tracking to support newrelic [issue 2033](https://github.com/newrelic/node-newrelic/issues/2033) ([#195](https://github.com/newrelic/node-test-utilities/pull/195)) ([730e747](https://github.com/newrelic/node-test-utilities/commit/730e747dffb99c0fa9156566eee03b5cc0a06466))
* Fixed typo in workflow variable ([#196](https://github.com/newrelic/node-test-utilities/pull/196)) ([6535efa](https://github.com/newrelic/node-test-utilities/commit/6535efa80c1d7fb89a08517c70c5dc414601cfb1))

#### Continuous integration

* Updated repo to use conventional commits for releases ([#194](https://github.com/newrelic/node-test-utilities/pull/194)) ([4254669](https://github.com/newrelic/node-test-utilities/commit/4254669539d2cd7af617f5ea58ae5757db66c3b9))

### v8.3.0 (2024-03-06)

+ Added new Amazon Titan LLM responses to support `token_count` work.

### v8.2.0 (2024-02-01)

* Adds a new module that provides a mock server for AWS Bedrock.
* Bumps [follow-redirects](https://github.com/follow-redirects/follow-redirects) from 1.15.3 to 1.15.4.
* Bumps [axios](https://github.com/axios/axios) to 1.6.0 and updates ancestor dependency [newrelic](https://github.com/newrelic/node-newrelic). These dependencies need to be updated together.
* Updates `axios` from 0.21.4 to 1.6.0
* Updates `newrelic` from 11.0.0 to 11.5.0
* Bumps  and [@babel/traverse](https://github.com/babel/babel/tree/HEAD/packages/babel-traverse). These dependencies needed to be updated together.
* Updates `@babel/traverse` from 7.22.8 to 7.23.2
* Updates `@babel/traverse` from 7.21.3 to 7.23.2

### v8.1.0 (2023-08-29)

* Updated the TestAgent to call `shimmer.registerHooks` and `shimmer.removeHooks` to set up instrumentation and remove it.

### v8.0.0 (2023-08-28)

* **BREAKING CHANGE**: Removed support for Node 14.

* Added support for Node 20.

* Gated usage of loader in versioned tests by NR_LOADER environment variable

* Updated vulnerable dependencies:
  - word-wrap from 1.2.3 to 1.2.4.
  - protobufjs from 7.2.2 to 7.2.4.
  - fast-xml-parser from 4.2.4 to 4.2.5
  - @aws-sdk/client-lambda from 3.357.0 to 3.363.0

### v7.3.2 (2023-06-22)

* Updated `semver` to 7.5.2
* Updated `newrelic` dev dependency to 10.3.0
* Updated `@newrelic/eslint-config` to  0.3.0
* Updated `eslint` dev dependency to 8.43.0

* Updated README links to point to new forum link due to repolinter ruleset change

### v7.3.1 (2023-05-03)

* Updated `TestAgent.getShim` to require an exported module and pull the shim symbol.

### v7.3.0 (2023-03-23)

* Provided ability to register only core instrumentation or both core and 3rd party instrumentation.  `TestAgent.makeFullyInstrumented` will register both.  `TestAgent.makeInstrumented` will only register core instrumentation.

* Updated README header image to latest OSS office required images

### v7.2.1 (2023-01-10)

* Bumps [json5](https://github.com/json5/json5) from 2.2.1 to 2.2.2.
* Streamlined CLM assertions to inherit tap from context. 
* Bypassed tapper/asserter abstractions so that CLM test failures are exposed.
* Added lockfile checks to CI workflow to prevent malicious changes

### v7.2.0 (2022-12-12)

* Added `assertCLMAttrs` testing method to utils, so it can be used to test CLM behavior in external repos

### v7.1.1 (2022-09-15)

* Added detection for node version < 18, to supply correct loader flag

### v7.1.0 (2022-09-14)

* Added the capacity of running ES module tests with the ESM loader from agent or a path to an ESM loader set as process.env.NR_LOADER.

### v7.0.0 (2022-07-27)

* Added support for Node 18.

* **BREAKING** Removed support for Node 12.

  The minimum supported version is now Node v14. For further information on our support policy, see: https://docs.newrelic.com/docs/agents/nodejs-agent/getting-started/compatibility-requirements-nodejs-agent.

* Updated test runner to use max CPUs available to run test folders in parallel when the `--jobs` parameter is not specified.

* Bumped [moment](https://github.com/moment/moment) from 2.29.2 to 2.29.4 in package-lock.

* Bumped [protobufjs](https://github.com/protobufjs/protobuf.js) from 6.11.2 to 6.11.3 in package-lock.

### v6.5.5 (2022-06-01)

* Added TEST_CHILD_TIMEOUT environment variable to modify test timeout limits.

### v6.5.4 (2022-05-27)

* Updated version runner to fail if package fails to install and not attempt to clean the npm cache.

### v6.5.3 (2022-04-20)

* Bumped async to ^3.2.3.

  Updated usage of `queue.drain` which was a 3.x breaking change.

* Resolved dev-only audit warnings.

* Bumped moment from 2.29.1 to 2.29.2.

* Bumped `tap` to ^16.0.1.

### v6.5.2 (2022-03-24)

* Fixed `util.maxVersionPerMode` sorting by handling numbers as semver versions and not floats.

### v6.5.1 (2022-03-24)

* Fixed `util.maxVersionPerMode` by sorting versions to ensure the last package is the latest.

### v6.5.0 (2022-03-21)

* Fixed how version resolution occurs when semver ranges are not the latest major version.

* Fixed how `latest` gets resolved by actually using the latest version.

* Added printing list of packages and their versions at the end of a run.

### v6.4.1 (2022-02-23)

* Fixed link to discuss.newrelic.com in README.

* Resolved several dev-dependency audit warnings.

* Bumped `glob` to ^7.2.0.

### v6.4.0 (2022-01-31)

* Added a warning and/or error when tests present in testing directory are not included in test specification.

* Updated `add-to-board` to use org level `NODE_AGENT_GH_TOKEN`

### v6.3.0 (2022-01-10)

* Added workflow to automate preparing release notes by reusing the newrelic/node-newrelic/.github/workflows/prep-release.yml@main workflow from agent repository.

* Added job to automatically add issues/pr to Node.js Engineering board

* Fixed overeager pattern-filter interpretation.

* Added `getShim` method for retrieving a test Shim instance.

  This enables test setup involving instrumentation like scenarios (adding segments, etc.) without reaching into the internal tracer.

### v6.2.0 (2021-11-19)

* Added clearing of registered instrumentation to `unload`.

* Added `getContextManager` to retrieve the active context manager in agent versions 8.6.0+.

* Bumped `newrelic` dev dependency to `^8.6.0`.

### v6.1.1 (2021-10-20)

* Fix pattern matching regression when parsing names of test files.

* Refactored test pattern filtering by extracting to its own function. Also added a few missing test pattern test cases.

### v6.1.0 (2021-10-19)

* Added the `-P, --pattern` flag to allow filtering tests by keyword(s).

* Added support for running specific test files by name or globbing pattern.

* Added a `--samples` value to CLI to allow an override of sampling for a given test run.

  Global sample value will be used when it is less than the samples value set on a given package in the tests stanza.

* Added ability to run versioned tests against version tags. For example: `newrelic@latest`.

  When a version such as `package@latest` is specified in the versioned test `package.json` declarations, it won't directly satisfy semver matches against the package versions manually pulled down and cached. The runner now attempts to directly install the configured version, which also results in a test failure if the package fails to install. Previously, failure to be able to install a dependency would log a warning and then just not run any tests and let CI pass.

* Upgraded setup-node CI job to v2 and changed the linting node version to lts/* for future proofing.

* Added @newrelic/eslint-config to rely on a centralized eslint ruleset.

* Added a pre-commit hook to check if package.json changes and run oss third-party manifest and oss third-party notices.

  This will ensure the third_party_manifest.json and THIRD_PARTY_NOTICES.md are up to date.

* Changed runner output to only list package versions when a test fails.

### v6.0.0 (2021-07-20):

* **BREAKING** Removed support for Node 10.

  The minimum supported version is now Node v12. For further information on our support policy, see: https://docs.newrelic.com/docs/agents/nodejs-agent/getting-started/compatibility-requirements-nodejs-agent.

* Added support for Node 16.
* Updated package.json to use files list instead of `.npmignore`.
* Bumped `tap` to ^15.0.9.
* Upgraded `sinon` to ^11.1.1.

### v5.1.0 (2021-05-11):

- Added enumerating and printing versions of every module being tested.
- Added flag to install every package on each test run for npm v7 compatibility.
- Added husky + lint-staged to run linting on all staged files.

### v5.0.0 (2020-11-03):

- Added Node v14.x to CI.
- Removed Node v8.x from CI.
- Updates to README to match New Relic OSS template.

### v4.1.2 (2020-10-01):

- Creates config instance via Config.createInstance() to pass to agent instead of using Config.initialize().

  Previously, the agent and created segments could end up with different config instances resulting in config updates (such as attribute configuration) not propagating correctly for tests. Now, the agent uses the same initialized singleton similar to regular execution.

### v4.1.1 (2020-09-16):

- Improved handling of soft-matching segments for cases where siblings have duplicate names.

### v4.1.0 (2020-09-03):

- Added TestAgent.getAgentApi() function that returns an agent API instance for the underlying agent instance.

### v4.0.0 (2020-07-21):
- Updated to Apache 2.0 license.
- Bumped minimum dev dependency of newrelic (agent) to 6.11 for license matching.
- Updated metric retrieval from agent for `assert.metrics` to match newer agent versions.

  **Breaking:** assertions are now only compatible with newrelic (agent) versions 6+.
- Added third party notices file and metadata for dependencies.
- Updated readme with more detail.
- Added issue templates for bugs and enhancements.
- Added code of conduct file.
- Added contributing guide.
- Added pull request template.
- Migrated CI to GitHub Actions.
- Added copyright headers to all source files.
- Added .vscode to .gitignore.
- Added additional items to .npmignore.

### v3.3.0 (2020-05-20):

- Added the ability to skip tests using multiple keywords

### v3.2.0 (2019-11-12):

- Added new format for versioned test

  Dependency version may now be sampled down to a constant number of versions.
  For example:
  ```
  "dependencies": {
    "redis": {
      "versions": ">1.0.0",
      "samples": 10
    }
  }
  ```

### v3.1.0 (2019-09-03):

- Added `--skip` flag to allow for skipping certain test suites.

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
