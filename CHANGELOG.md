### v7.2.0 (2022-12-12)

Added `assertCLMAttrs` testing method to utils, so it can be used to test CLM behavior in external repos

--- NOTES NEEDS REVIEW ---
Bumps [qs](https://github.com/ljharb/qs) from 6.5.2 to 6.5.3.
<details>
<summary>Changelog</summary>
<p><em>Sourced from <a href="https://github.com/ljharb/qs/blob/main/CHANGELOG.md">qs's changelog</a>.</em></p>
<blockquote>
<h2><strong>6.5.3</strong></h2>
<ul>
<li>[Fix] <code>parse</code>: ignore <code>__proto__</code> keys (<a href="https://github-redirect.dependabot.com/ljharb/qs/issues/428">#428</a>)</li>
<li>[Fix] <code>utils.merge</code>: avoid a crash with a null target and a truthy non-array source</li>
<li>[Fix] correctly parse nested arrays</li>
<li>[Fix] <code>stringify</code>: fix a crash with <code>strictNullHandling</code> and a custom <code>filter</code>/<code>serializeDate</code> (<a href="https://github-redirect.dependabot.com/ljharb/qs/issues/279">#279</a>)</li>
<li>[Fix] <code>utils</code>: <code>merge</code>: fix crash when <code>source</code> is a truthy primitive &amp; no options are provided</li>
<li>[Fix] when <code>parseArrays</code> is false, properly handle keys ending in <code>[]</code></li>
<li>[Fix] fix for an impossible situation: when the formatter is called with a non-string value</li>
<li>[Fix] <code>utils.merge</code>: avoid a crash with a null target and an array source</li>
<li>[Refactor] <code>utils</code>: reduce observable [[Get]]s</li>
<li>[Refactor] use cached <code>Array.isArray</code></li>
<li>[Refactor] <code>stringify</code>: Avoid arr = arr.concat(...), push to the existing instance (<a href="https://github-redirect.dependabot.com/ljharb/qs/issues/269">#269</a>)</li>
<li>[Refactor] <code>parse</code>: only need to reassign the var once</li>
<li>[Robustness] <code>stringify</code>: avoid relying on a global <code>undefined</code> (<a href="https://github-redirect.dependabot.com/ljharb/qs/issues/427">#427</a>)</li>
<li>[readme] remove travis badge; add github actions/codecov badges; update URLs</li>
<li>[Docs] Clean up license text so it’s properly detected as BSD-3-Clause</li>
<li>[Docs] Clarify the need for &quot;arrayLimit&quot; option</li>
<li>[meta] fix README.md (<a href="https://github-redirect.dependabot.com/ljharb/qs/issues/399">#399</a>)</li>
<li>[meta] add FUNDING.yml</li>
<li>[actions] backport actions from main</li>
<li>[Tests] always use <code>String(x)</code> over <code>x.toString()</code></li>
<li>[Tests] remove nonexistent tape option</li>
<li>[Dev Deps] backport from main</li>
</ul>
</blockquote>
</details>
<details>
<summary>Commits</summary>
<ul>
<li><a href="https://github.com/ljharb/qs/commit/298bfa55d6db00ddea78dd0333509aadf9bb3077"><code>298bfa5</code></a> v6.5.3</li>
<li><a href="https://github.com/ljharb/qs/commit/ed0f5dcbef4b168a8ae299d78b1e4a2e9b1baf1f"><code>ed0f5dc</code></a> [Fix] <code>parse</code>: ignore <code>__proto__</code> keys (<a href="https://github-redirect.dependabot.com/ljharb/qs/issues/428">#428</a>)</li>
<li><a href="https://github.com/ljharb/qs/commit/691e739cfa40cd42604dc05a54e6154371a429ab"><code>691e739</code></a> [Robustness] <code>stringify</code>: avoid relying on a global <code>undefined</code> (<a href="https://github-redirect.dependabot.com/ljharb/qs/issues/427">#427</a>)</li>
<li><a href="https://github.com/ljharb/qs/commit/1072d57d38a690e1ad7616dced44390bffedcbb2"><code>1072d57</code></a> [readme] remove travis badge; add github actions/codecov badges; update URLs</li>
<li><a href="https://github.com/ljharb/qs/commit/12ac1c403aaa04d1a34844f514ed9f9abfb76e64"><code>12ac1c4</code></a> [meta] fix README.md (<a href="https://github-redirect.dependabot.com/ljharb/qs/issues/399">#399</a>)</li>
<li><a href="https://github.com/ljharb/qs/commit/0338716b09fdbd4711823eeb0a14e556a2498e7a"><code>0338716</code></a> [actions] backport actions from main</li>
<li><a href="https://github.com/ljharb/qs/commit/5639c20ce0a7c1332200a3181339331483e5a3a1"><code>5639c20</code></a> Clean up license text so it’s properly detected as BSD-3-Clause</li>
<li><a href="https://github.com/ljharb/qs/commit/51b8a0b1b213596dd1702b837f5e7dec2229793d"><code>51b8a0b</code></a> add FUNDING.yml</li>
<li><a href="https://github.com/ljharb/qs/commit/45f675936e742d92fac8d4dae5cfc385c576a977"><code>45f6759</code></a> [Fix] fix for an impossible situation: when the formatter is called with a no...</li>
<li><a href="https://github.com/ljharb/qs/commit/f814a7f8f2af059f8158f7e4b2bf8b46aeb62cd3"><code>f814a7f</code></a> [Dev Deps] backport from main</li>
<li>Additional commits viewable in <a href="https://github.com/ljharb/qs/compare/v6.5.2...v6.5.3">compare view</a></li>
</ul>
</details>
<br />


[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=qs&package-manager=npm_and_yarn&previous-version=6.5.2&new-version=6.5.3)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)

Dependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.

[//]: # (dependabot-automerge-start)
[//]: # (dependabot-automerge-end)

---

<details>
<summary>Dependabot commands and options</summary>
<br />

You can trigger Dependabot actions by commenting on this PR:
- `@dependabot rebase` will rebase this PR
- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it
- `@dependabot merge` will merge this PR after your CI passes on it
- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it
- `@dependabot cancel merge` will cancel a previously requested merge and block automerging
- `@dependabot reopen` will reopen this PR if it is closed
- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually
- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)
- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)
- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)
- `@dependabot use these labels` will set the current labels as the default for future PRs for this repo and language
- `@dependabot use these reviewers` will set the current reviewers as the default for future PRs for this repo and language
- `@dependabot use these assignees` will set the current assignees as the default for future PRs for this repo and language
- `@dependabot use this milestone` will set the current milestone as the default for future PRs for this repo and language

You can disable automated security fix PRs for this repo from the [Security Alerts page](https://github.com/newrelic/node-test-utilities/network/alerts).

</details>
--------------------------

--- NOTES NEEDS REVIEW ---
<h3>Snyk has created this PR to upgrade glob from 7.2.0 to 7.2.3.</h3>

:information_source: Keep your dependencies up-to-date. This makes it easier to fix existing vulnerabilities and to more quickly identify and fix newly disclosed vulnerabilities when they affect your project.
--------------------------

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
