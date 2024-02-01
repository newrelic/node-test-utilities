### v8.2.0 (2024-02-01)

+ Adds a new module that provides a mock server for AWS Bedrock.

--- NOTES NEEDS REVIEW ---
Bumps [follow-redirects](https://github.com/follow-redirects/follow-redirects) from 1.15.3 to 1.15.4.
<details>
<summary>Commits</summary>
<ul>
<li><a href="https://github.com/follow-redirects/follow-redirects/commit/65858205e59f1e23c9bf173348a7a7cbb8ac47f5"><code>6585820</code></a> Release version 1.15.4 of the npm package.</li>
<li><a href="https://github.com/follow-redirects/follow-redirects/commit/7a6567e16dfa9ad18a70bfe91784c28653fbf19d"><code>7a6567e</code></a> Disallow bracketed hostnames.</li>
<li><a href="https://github.com/follow-redirects/follow-redirects/commit/05629af696588b90d64e738bc2e809a97a5f92fc"><code>05629af</code></a> Prefer native URL instead of deprecated url.parse.</li>
<li><a href="https://github.com/follow-redirects/follow-redirects/commit/1cba8e85fa73f563a439fe460cf028688e4358df"><code>1cba8e8</code></a> Prefer native URL instead of legacy url.resolve.</li>
<li><a href="https://github.com/follow-redirects/follow-redirects/commit/72bc2a4229bc18dc9fbd57c60579713e6264cb92"><code>72bc2a4</code></a> Simplify _processResponse error handling.</li>
<li><a href="https://github.com/follow-redirects/follow-redirects/commit/3d42aecdca39b144a0a2f27ea134b4cf67dd796a"><code>3d42aec</code></a> Add bracket tests.</li>
<li><a href="https://github.com/follow-redirects/follow-redirects/commit/bcbb096b32686ecad6cd34235358ed6f2217d4f0"><code>bcbb096</code></a> Do not directly set Error properties.</li>
<li>See full diff in <a href="https://github.com/follow-redirects/follow-redirects/compare/v1.15.3...v1.15.4">compare view</a></li>
</ul>
</details>
<br />


[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=follow-redirects&package-manager=npm_and_yarn&previous-version=1.15.3&new-version=1.15.4)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)

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
- `@dependabot show <dependency name> ignore conditions` will show all of the ignore conditions of the specified dependency
- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)
- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)
- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)
You can disable automated security fix PRs for this repo from the [Security Alerts page](https://github.com/newrelic/node-test-utilities/network/alerts).

</details>
--------------------------

--- NOTES NEEDS REVIEW ---
Bumps [axios](https://github.com/axios/axios) to 1.6.0 and updates ancestor dependency [newrelic](https://github.com/newrelic/node-newrelic). These dependencies need to be updated together.

Updates `axios` from 0.21.4 to 1.6.0
<details>
<summary>Release notes</summary>
<p><em>Sourced from <a href="https://github.com/axios/axios/releases">axios's releases</a>.</em></p>
<blockquote>
<h2>Release v1.6.0</h2>
<h2>Release notes:</h2>
<h3>Bug Fixes</h3>
<ul>
<li><strong>CSRF:</strong> fixed CSRF vulnerability CVE-2023-45857 (<a href="https://redirect.github.com/axios/axios/issues/6028">#6028</a>) (<a href="https://github.com/axios/axios/commit/96ee232bd3ee4de2e657333d4d2191cd389e14d0">96ee232</a>)</li>
<li><strong>dns:</strong> fixed lookup function decorator to work properly in node v20; (<a href="https://redirect.github.com/axios/axios/issues/6011">#6011</a>) (<a href="https://github.com/axios/axios/commit/5aaff532a6b820bb9ab6a8cd0f77131b47e2adb8">5aaff53</a>)</li>
<li><strong>types:</strong> fix AxiosHeaders types; (<a href="https://redirect.github.com/axios/axios/issues/5931">#5931</a>) (<a href="https://github.com/axios/axios/commit/a1c8ad008b3c13d53e135bbd0862587fb9d3fc09">a1c8ad0</a>)</li>
</ul>
<h3>PRs</h3>
<ul>
<li>CVE 2023 45857 ( <a href="https://api.github.com/repos/axios/axios/pulls/6028">#6028</a> )</li>
</ul>
<pre><code>
⚠️ Critical vulnerability fix. See https://security.snyk.io/vuln/SNYK-JS-AXIOS-6032459
</code></pre>
<h3>Contributors to this release</h3>
<ul>
<li><!-- raw HTML omitted --> <a href="https://github.com/DigitalBrainJS" title="+449/-114 ([#6032](https://github.com/axios/axios/issues/6032) [#6021](https://github.com/axios/axios/issues/6021) [#6011](https://github.com/axios/axios/issues/6011) [#5932](https://github.com/axios/axios/issues/5932) [#5931](https://github.com/axios/axios/issues/5931) )">Dmitriy Mozgovoy</a></li>
<li><!-- raw HTML omitted --> <a href="https://github.com/valentin-panov" title="+4/-4 ([#6028](https://github.com/axios/axios/issues/6028) )">Valentin Panov</a></li>
<li><!-- raw HTML omitted --> <a href="https://github.com/therealrinku" title="+1/-1 ([#5889](https://github.com/axios/axios/issues/5889) )">Rinku Chaudhari</a></li>
</ul>
<h2>Release v1.5.1</h2>
<h2>Release notes:</h2>
<h3>Bug Fixes</h3>
<ul>
<li><strong>adapters:</strong> improved adapters loading logic to have clear error messages; (<a href="https://redirect.github.com/axios/axios/issues/5919">#5919</a>) (<a href="https://github.com/axios/axios/commit/e4107797a7a1376f6209fbecfbbce73d3faa7859">e410779</a>)</li>
<li><strong>formdata:</strong> fixed automatic addition of the <code>Content-Type</code> header for FormData in non-browser environments; (<a href="https://redirect.github.com/axios/axios/issues/5917">#5917</a>) (<a href="https://github.com/axios/axios/commit/bc9af51b1886d1b3529617702f2a21a6c0ed5d92">bc9af51</a>)</li>
<li><strong>headers:</strong> allow <code>content-encoding</code> header to handle case-insensitive values (<a href="https://redirect.github.com/axios/axios/issues/5890">#5890</a>) (<a href="https://redirect.github.com/axios/axios/issues/5892">#5892</a>) (<a href="https://github.com/axios/axios/commit/4c89f25196525e90a6e75eda9cb31ae0a2e18acd">4c89f25</a>)</li>
<li><strong>types:</strong> removed duplicated code (<a href="https://github.com/axios/axios/commit/9e6205630e1c9cf863adf141c0edb9e6d8d4b149">9e62056</a>)</li>
</ul>
<h3>Contributors to this release</h3>
<ul>
<li><!-- raw HTML omitted --> <a href="https://github.com/DigitalBrainJS" title="+89/-18 ([#5919](https://github.com/axios/axios/issues/5919) [#5917](https://github.com/axios/axios/issues/5917) )">Dmitriy Mozgovoy</a></li>
<li><!-- raw HTML omitted --> <a href="https://github.com/DavidJDallas" title="+11/-5 ()">David Dallas</a></li>
<li><!-- raw HTML omitted --> <a href="https://github.com/fb-sean" title="+2/-8 ()">Sean Sattler</a></li>
<li><!-- raw HTML omitted --> <a href="https://github.com/0o001" title="+4/-4 ()">Mustafa Ateş Uzun</a></li>
<li><!-- raw HTML omitted --> <a href="https://github.com/sfc-gh-pmotacki" title="+2/-1 ([#5892](https://github.com/axios/axios/issues/5892) )">Przemyslaw Motacki</a></li>
<li><!-- raw HTML omitted --> <a href="https://github.com/Cadienvan" title="+1/-1 ()">Michael Di Prisco</a></li>
</ul>
<h2>Release v1.5.0</h2>
<h2>Release notes:</h2>
<h3>Bug Fixes</h3>
<ul>
<li><strong>adapter:</strong> make adapter loading error more clear by using platform-specific adapters explicitly (<a href="https://redirect.github.com/axios/axios/issues/5837">#5837</a>) (<a href="https://github.com/axios/axios/commit/9a414bb6c81796a95c6c7fe668637825458e8b6d">9a414bb</a>)</li>
<li><strong>dns:</strong> fixed <code>cacheable-lookup</code> integration; (<a href="https://redirect.github.com/axios/axios/issues/5836">#5836</a>) (<a href="https://github.com/axios/axios/commit/b3e327dcc9277bdce34c7ef57beedf644b00d628">b3e327d</a>)</li>
<li><strong>headers:</strong> added support for setting header names that overlap with class methods; (<a href="https://redirect.github.com/axios/axios/issues/5831">#5831</a>) (<a href="https://github.com/axios/axios/commit/d8b4ca0ea5f2f05efa4edfe1e7684593f9f68273">d8b4ca0</a>)</li>
<li><strong>headers:</strong> fixed common Content-Type header merging; (<a href="https://redirect.github.com/axios/axios/issues/5832">#5832</a>) (<a href="https://github.com/axios/axios/commit/8fda2766b1e6bcb72c3fabc146223083ef13ce17">8fda276</a>)</li>
</ul>
<h3>Features</h3>
<!-- raw HTML omitted -->
</blockquote>
<p>... (truncated)</p>
</details>
<details>
<summary>Changelog</summary>
<p><em>Sourced from <a href="https://github.com/axios/axios/blob/v1.x/CHANGELOG.md">axios's changelog</a>.</em></p>
<blockquote>
<h1><a href="https://github.com/axios/axios/compare/v1.5.1...v1.6.0">1.6.0</a> (2023-10-26)</h1>
<h3>Bug Fixes</h3>
<ul>
<li><strong>CSRF:</strong> fixed CSRF vulnerability CVE-2023-45857 (<a href="https://redirect.github.com/axios/axios/issues/6028">#6028</a>) (<a href="https://github.com/axios/axios/commit/96ee232bd3ee4de2e657333d4d2191cd389e14d0">96ee232</a>)</li>
<li><strong>dns:</strong> fixed lookup function decorator to work properly in node v20; (<a href="https://redirect.github.com/axios/axios/issues/6011">#6011</a>) (<a href="https://github.com/axios/axios/commit/5aaff532a6b820bb9ab6a8cd0f77131b47e2adb8">5aaff53</a>)</li>
<li><strong>types:</strong> fix AxiosHeaders types; (<a href="https://redirect.github.com/axios/axios/issues/5931">#5931</a>) (<a href="https://github.com/axios/axios/commit/a1c8ad008b3c13d53e135bbd0862587fb9d3fc09">a1c8ad0</a>)</li>
</ul>
<h3>PRs</h3>
<ul>
<li>CVE 2023 45857 ( <a href="https://api.github.com/repos/axios/axios/pulls/6028">#6028</a> )</li>
</ul>
<pre><code>
⚠️ Critical vulnerability fix. See https://security.snyk.io/vuln/SNYK-JS-AXIOS-6032459
</code></pre>
<h3>Contributors to this release</h3>
<ul>
<li><!-- raw HTML omitted --> <a href="https://github.com/DigitalBrainJS" title="+449/-114 ([#6032](https://github.com/axios/axios/issues/6032) [#6021](https://github.com/axios/axios/issues/6021) [#6011](https://github.com/axios/axios/issues/6011) [#5932](https://github.com/axios/axios/issues/5932) [#5931](https://github.com/axios/axios/issues/5931) )">Dmitriy Mozgovoy</a></li>
<li><!-- raw HTML omitted --> <a href="https://github.com/valentin-panov" title="+4/-4 ([#6028](https://github.com/axios/axios/issues/6028) )">Valentin Panov</a></li>
<li><!-- raw HTML omitted --> <a href="https://github.com/therealrinku" title="+1/-1 ([#5889](https://github.com/axios/axios/issues/5889) )">Rinku Chaudhari</a></li>
</ul>
<h2><a href="https://github.com/axios/axios/compare/v1.5.0...v1.5.1">1.5.1</a> (2023-09-26)</h2>
<h3>Bug Fixes</h3>
<ul>
<li><strong>adapters:</strong> improved adapters loading logic to have clear error messages; (<a href="https://redirect.github.com/axios/axios/issues/5919">#5919</a>) (<a href="https://github.com/axios/axios/commit/e4107797a7a1376f6209fbecfbbce73d3faa7859">e410779</a>)</li>
<li><strong>formdata:</strong> fixed automatic addition of the <code>Content-Type</code> header for FormData in non-browser environments; (<a href="https://redirect.github.com/axios/axios/issues/5917">#5917</a>) (<a href="https://github.com/axios/axios/commit/bc9af51b1886d1b3529617702f2a21a6c0ed5d92">bc9af51</a>)</li>
<li><strong>headers:</strong> allow <code>content-encoding</code> header to handle case-insensitive values (<a href="https://redirect.github.com/axios/axios/issues/5890">#5890</a>) (<a href="https://redirect.github.com/axios/axios/issues/5892">#5892</a>) (<a href="https://github.com/axios/axios/commit/4c89f25196525e90a6e75eda9cb31ae0a2e18acd">4c89f25</a>)</li>
<li><strong>types:</strong> removed duplicated code (<a href="https://github.com/axios/axios/commit/9e6205630e1c9cf863adf141c0edb9e6d8d4b149">9e62056</a>)</li>
</ul>
<h3>Contributors to this release</h3>
<ul>
<li><!-- raw HTML omitted --> <a href="https://github.com/DigitalBrainJS" title="+89/-18 ([#5919](https://github.com/axios/axios/issues/5919) [#5917](https://github.com/axios/axios/issues/5917) )">Dmitriy Mozgovoy</a></li>
<li><!-- raw HTML omitted --> <a href="https://github.com/DavidJDallas" title="+11/-5 ()">David Dallas</a></li>
<li><!-- raw HTML omitted --> <a href="https://github.com/fb-sean" title="+2/-8 ()">Sean Sattler</a></li>
<li><!-- raw HTML omitted --> <a href="https://github.com/0o001" title="+4/-4 ()">Mustafa Ateş Uzun</a></li>
<li><!-- raw HTML omitted --> <a href="https://github.com/sfc-gh-pmotacki" title="+2/-1 ([#5892](https://github.com/axios/axios/issues/5892) )">Przemyslaw Motacki</a></li>
<li><!-- raw HTML omitted --> <a href="https://github.com/Cadienvan" title="+1/-1 ()">Michael Di Prisco</a></li>
</ul>
<h3>PRs</h3>
<ul>
<li>CVE 2023 45857 ( <a href="https://api.github.com/repos/axios/axios/pulls/6028">#6028</a> )</li>
</ul>
<pre><code>
⚠️ Critical vulnerability fix. See https://security.snyk.io/vuln/SNYK-JS-AXIOS-6032459
</code></pre>
<h1><a href="https://github.com/axios/axios/compare/v1.4.0...v1.5.0">1.5.0</a> (2023-08-26)</h1>
<!-- raw HTML omitted -->
</blockquote>
<p>... (truncated)</p>
</details>
<details>
<summary>Commits</summary>
<ul>
<li><a href="https://github.com/axios/axios/commit/f7adacdbaa569281253c8cfc623ad3f4dc909c60"><code>f7adacd</code></a> chore(release): v1.6.0 (<a href="https://redirect.github.com/axios/axios/issues/6031">#6031</a>)</li>
<li><a href="https://github.com/axios/axios/commit/9917e67cbb6c157382863bad8c741de58e3f3c2b"><code>9917e67</code></a> chore(ci): fix release-it arg; (<a href="https://redirect.github.com/axios/axios/issues/6032">#6032</a>)</li>
<li><a href="https://github.com/axios/axios/commit/96ee232bd3ee4de2e657333d4d2191cd389e14d0"><code>96ee232</code></a> fix(CSRF): fixed CSRF vulnerability CVE-2023-45857 (<a href="https://redirect.github.com/axios/axios/issues/6028">#6028</a>)</li>
<li><a href="https://github.com/axios/axios/commit/7d45ab2e2ad6e59f5475e39afd4b286b1f393fc0"><code>7d45ab2</code></a> chore(tests): fixed tests to pass in node v19 and v20 with <code>keep-alive</code> enabl...</li>
<li><a href="https://github.com/axios/axios/commit/5aaff532a6b820bb9ab6a8cd0f77131b47e2adb8"><code>5aaff53</code></a> fix(dns): fixed lookup function decorator to work properly in node v20; (<a href="https://redirect.github.com/axios/axios/issues/6011">#6011</a>)</li>
<li><a href="https://github.com/axios/axios/commit/a48a63ad823fc20e5a6a705f05f09842ca49f48c"><code>a48a63a</code></a> chore(docs): added AxiosHeaders docs; (<a href="https://redirect.github.com/axios/axios/issues/5932">#5932</a>)</li>
<li><a href="https://github.com/axios/axios/commit/a1c8ad008b3c13d53e135bbd0862587fb9d3fc09"><code>a1c8ad0</code></a> fix(types): fix AxiosHeaders types; (<a href="https://redirect.github.com/axios/axios/issues/5931">#5931</a>)</li>
<li><a href="https://github.com/axios/axios/commit/2ac731d60545ba5c4202c25fd2e732ddd8297d82"><code>2ac731d</code></a> chore(docs): update readme.md (<a href="https://redirect.github.com/axios/axios/issues/5889">#5889</a>)</li>
<li><a href="https://github.com/axios/axios/commit/88fb52b5fad7aabab0532e7ad086c5f1b0178905"><code>88fb52b</code></a> chore(release): v1.5.1 (<a href="https://redirect.github.com/axios/axios/issues/5920">#5920</a>)</li>
<li><a href="https://github.com/axios/axios/commit/e4107797a7a1376f6209fbecfbbce73d3faa7859"><code>e410779</code></a> fix(adapters): improved adapters loading logic to have clear error messages; ...</li>
<li>Additional commits viewable in <a href="https://github.com/axios/axios/compare/v0.21.4...v1.6.0">compare view</a></li>
</ul>
</details>
<br />

Updates `newrelic` from 11.0.0 to 11.5.0
<details>
<summary>Release notes</summary>
<p><em>Sourced from <a href="https://github.com/newrelic/node-newrelic/releases">newrelic's releases</a>.</em></p>
<blockquote>
<h2>v11.5.0</h2>
<h4>Miscellaneous chores</h4>
<ul>
<li><strong>dep:</strong> Updated <code>@​newrelic/security-agent</code> to v0.4.0 (<a href="https://redirect.github.com/newrelic/node-newrelic/pull/1837">#1837</a>) (<a href="https://github.com/newrelic/node-newrelic/commit/fb06ac930269b784fcea6c2b8ea5e54158677ec4">fb06ac9</a>)</li>
</ul>
<h4>Continuous integration</h4>
<ul>
<li>Disable fail-fast on nightly versioned test runs (<a href="https://redirect.github.com/newrelic/node-newrelic/pull/1836">#1836</a>) (<a href="https://github.com/newrelic/node-newrelic/commit/fe1b4fc4c00b2e4ea4c7b6fa5a8c1cd6e864145a">fe1b4fc</a>)</li>
</ul>
<h3>Support statement:</h3>
<p>We recommend updating to the latest agent version as soon as it's available. If you can't upgrade to the latest version, update your agents to a version no more than 90 days old. Read more about keeping agents up to date. (<a href="https://docs.newrelic.com/docs/new-relic-solutions/new-relic-one/install-configure/update-new-relic-agent/">https://docs.newrelic.com/docs/new-relic-solutions/new-relic-one/install-configure/update-new-relic-agent/</a>)</p>
<p>See the New Relic Node.js agent EOL policy for information about agent releases and support dates. (<a href="https://docs.newrelic.com/docs/apm/agents/nodejs-agent/getting-started/nodejs-agent-eol-policy/">https://docs.newrelic.com/docs/apm/agents/nodejs-agent/getting-started/nodejs-agent-eol-policy/</a>)</p>
<h2>v11.4.0</h2>
<h4>Features</h4>
<ul>
<li>Added support for parsing container ids from docker versions using cgroups v2. (<a href="https://redirect.github.com/newrelic/node-newrelic/pull/1830">#1830</a>) (<a href="https://github.com/newrelic/node-newrelic/commit/98929013da3e62e2223f94531b8d6f59eecfc35b">9892901</a>)</li>
</ul>
<h4>Miscellaneous chores</h4>
<ul>
<li>[Snyk] Upgraded <code>@​grpc/grpc-js</code> from 1.9.2 to 1.9.4. (<a href="https://redirect.github.com/newrelic/node-newrelic/pull/1823">#1823</a>) (<a href="https://github.com/newrelic/node-newrelic/commit/81f945033376e4d33651d1e42afc30aea19dbdeb">81f9450</a>)</li>
<li><strong>deps:</strong> Updated aws-sdk, koa, superagent (<a href="https://redirect.github.com/newrelic/node-newrelic/pull/1831">#1831</a>) (<a href="https://github.com/newrelic/node-newrelic/commit/8b4e963e84d34e4727b9fda3aa630ef119aa3905">8b4e963</a>)</li>
</ul>
<h4>Tests</h4>
<ul>
<li>Increased timeout for integration tests to avoid random failures. (<a href="https://redirect.github.com/newrelic/node-newrelic/pull/1827">#1827</a>) (<a href="https://github.com/newrelic/node-newrelic/commit/52020485191868f479092ae4860019acf105b3eb">5202048</a>)</li>
</ul>
<h3>Support statement:</h3>
<p>We recommend updating to the latest agent version as soon as it's available. If you can't upgrade to the latest version, update your agents to a version no more than 90 days old. Read more about keeping agents up to date. (<a href="https://docs.newrelic.com/docs/new-relic-solutions/new-relic-one/install-configure/update-new-relic-agent/">https://docs.newrelic.com/docs/new-relic-solutions/new-relic-one/install-configure/update-new-relic-agent/</a>)</p>
<p>See the New Relic Node.js agent EOL policy for information about agent releases and support dates. (<a href="https://docs.newrelic.com/docs/apm/agents/nodejs-agent/getting-started/nodejs-agent-eol-policy/">https://docs.newrelic.com/docs/apm/agents/nodejs-agent/getting-started/nodejs-agent-eol-policy/</a>)</p>
<p>v11.3.0 (2023-10-23)</p>
<h4>Features</h4>
<ul>
<li>Updated agent initialization to allow running in worker threads when config.worker_threads.enabled is true (<a href="https://redirect.github.com/newrelic/node-newrelic/pull/1817">#1817</a>) (<a href="https://github.com/newrelic/node-newrelic/commit/a39f0ef5ac670d03ab407b24e5aeccd8d5e8c680">a39f0ef</a>)</li>
</ul>
<h4>Bug fixes</h4>
<ul>
<li>Updated Elasticsearch instrumentation to register on v7.13.0+ only (<a href="https://redirect.github.com/newrelic/node-newrelic/pull/1816">#1816</a>) (<a href="https://github.com/newrelic/node-newrelic/commit/6437671b921cd6bd73ed31180b0d62f62cc229a2">6437671</a>)</li>
</ul>
<h4>Miscellaneous chores</h4>
<ul>
<li><strong>dev-deps:</strong> Bumped <code>@​babel/traverse</code> (<a href="https://redirect.github.com/newrelic/node-newrelic/pull/1818">#1818</a>) (<a href="https://github.com/newrelic/node-newrelic/commit/d3c8d04b74b7a84846609b744e3b4922136dbdd6">d3c8d04</a>)</li>
</ul>
<!-- raw HTML omitted -->
</blockquote>
<p>... (truncated)</p>
</details>
<details>
<summary>Changelog</summary>
<p><em>Sourced from <a href="https://github.com/newrelic/node-newrelic/blob/main/changelog.json">newrelic's changelog</a>.</em></p>
<blockquote>
<p>{
&quot;repository&quot;: &quot;newrelic/node-newrelic&quot;,
&quot;entries&quot;: [
{
&quot;version&quot;: &quot;11.5.0&quot;,
&quot;changes&quot;: {
&quot;security&quot;: [],
&quot;bugfixes&quot;: [],
&quot;features&quot;: []
}
},
{
&quot;version&quot;: &quot;11.4.0&quot;,
&quot;changes&quot;: {
&quot;security&quot;: [],
&quot;bugfixes&quot;: [],
&quot;features&quot;: [
&quot;Added support for parsing container ids from docker versions using cgroups v2.&quot;
]
}
},
{
&quot;version&quot;: &quot;11.3.0&quot;,
&quot;changes&quot;: {
&quot;security&quot;: [],
&quot;bugfixes&quot;: [
&quot;Updated Elasticsearch instrumentation to register only on v7.13.0+&quot;
],
&quot;features&quot;: [
&quot;Updated agent initialization to allow running in worker threads when config.worker_threads.enabled is true&quot;
]
}
},
{
&quot;version&quot;: &quot;11.2.1&quot;,
&quot;changes&quot;: {
&quot;security&quot;: [],
&quot;bugfixes&quot;: [
&quot;Updated initialization to return the api on start up to the security agent properly&quot;
],
&quot;features&quot;: []
}
},
{
&quot;version&quot;: &quot;11.2.0&quot;,
&quot;changes&quot;: {
&quot;security&quot;: [],
&quot;bugfixes&quot;: [
&quot;Updated agent to create a stub api when running in a worker thread to avoid Next.js early return errors.&quot;,
&quot;Updated shimmer to allow registering instrumentation for different versions of the same module.&quot;</p>
<!-- raw HTML omitted -->
</blockquote>
<p>... (truncated)</p>
</details>
<details>
<summary>Commits</summary>
<ul>
<li><a href="https://github.com/newrelic/node-newrelic/commit/20b7680c819661455d30a2fc9bfbc4e00c677d23"><code>20b7680</code></a> chore: Release v11.5.0 (<a href="https://redirect.github.com/newrelic/node-newrelic/issues/1839">#1839</a>)</li>
<li><a href="https://github.com/newrelic/node-newrelic/commit/fb06ac930269b784fcea6c2b8ea5e54158677ec4"><code>fb06ac9</code></a> chore(dep): Updated <code>@​newrelic/security-agent</code> to v0.4.0 (<a href="https://redirect.github.com/newrelic/node-newrelic/issues/1837">#1837</a>)</li>
<li><a href="https://github.com/newrelic/node-newrelic/commit/fe1b4fc4c00b2e4ea4c7b6fa5a8c1cd6e864145a"><code>fe1b4fc</code></a> ci: Disable fail-fast on nightly versioned test runs (<a href="https://redirect.github.com/newrelic/node-newrelic/issues/1836">#1836</a>)</li>
<li><a href="https://github.com/newrelic/node-newrelic/commit/06b33649c22c85c13ad8e6dfafbd4fe63da58607"><code>06b3364</code></a> chore: Release v11.4.0 (<a href="https://redirect.github.com/newrelic/node-newrelic/issues/1833">#1833</a>)</li>
<li><a href="https://github.com/newrelic/node-newrelic/commit/8b4e963e84d34e4727b9fda3aa630ef119aa3905"><code>8b4e963</code></a> chore(deps): Updated aws-sdk, koa, superagent (<a href="https://redirect.github.com/newrelic/node-newrelic/issues/1831">#1831</a>)</li>
<li><a href="https://github.com/newrelic/node-newrelic/commit/98929013da3e62e2223f94531b8d6f59eecfc35b"><code>9892901</code></a> feat: Added support for parsing container ids from docker versions using cgro...</li>
<li><a href="https://github.com/newrelic/node-newrelic/commit/81f945033376e4d33651d1e42afc30aea19dbdeb"><code>81f9450</code></a> chore: [Snyk] Upgraded <code>@​grpc/grpc-js</code> from 1.9.2 to 1.9.4. (<a href="https://redirect.github.com/newrelic/node-newrelic/issues/1823">#1823</a>)</li>
<li><a href="https://github.com/newrelic/node-newrelic/commit/52020485191868f479092ae4860019acf105b3eb"><code>5202048</code></a> test: Increased timeout for integration tests to avoid random failures. (<a href="https://redirect.github.com/newrelic/node-newrelic/issues/1827">#1827</a>)</li>
<li><a href="https://github.com/newrelic/node-newrelic/commit/1ed0c5c6188472a6ad727b45563b105d6e60153f"><code>1ed0c5c</code></a> chore: release v11.3.0 (<a href="https://redirect.github.com/newrelic/node-newrelic/issues/1826">#1826</a>)</li>
<li><a href="https://github.com/newrelic/node-newrelic/commit/a39f0ef5ac670d03ab407b24e5aeccd8d5e8c680"><code>a39f0ef</code></a> feat: Updated agent initialization to allow running in worker threads when co...</li>
<li>Additional commits viewable in <a href="https://github.com/newrelic/node-newrelic/compare/v11.0.0...v11.5.0">compare view</a></li>
</ul>
</details>
<br />


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
- `@dependabot show <dependency name> ignore conditions` will show all of the ignore conditions of the specified dependency
- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)
- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)
- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)
You can disable automated security fix PRs for this repo from the [Security Alerts page](https://github.com/newrelic/node-test-utilities/network/alerts).

</details>
--------------------------

--- NOTES NEEDS REVIEW ---
Bumps  and [@babel/traverse](https://github.com/babel/babel/tree/HEAD/packages/babel-traverse). These dependencies needed to be updated together.
Updates `@babel/traverse` from 7.22.8 to 7.23.2
<details>
<summary>Release notes</summary>
<p><em>Sourced from <a href="https://github.com/babel/babel/releases"><code>@​babel/traverse</code>'s releases</a>.</em></p>
<blockquote>
<h2>v7.23.2 (2023-10-11)</h2>
<p><strong>NOTE</strong>: This release also re-publishes <code>@babel/core</code>, even if it does not appear in the linked release commit.</p>
<p>Thanks <a href="https://github.com/jimmydief"><code>@​jimmydief</code></a> for your first PR!</p>
<h4>:bug: Bug Fix</h4>
<ul>
<li><code>babel-traverse</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/16033">#16033</a> Only evaluate own String/Number/Math methods (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
<li><code>babel-preset-typescript</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/16022">#16022</a> Rewrite <code>.tsx</code> extension when using <code>rewriteImportExtensions</code> (<a href="https://github.com/jimmydief"><code>@​jimmydief</code></a>)</li>
</ul>
</li>
<li><code>babel-helpers</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/16017">#16017</a> Fix: fallback to typeof when toString is applied to incompatible object (<a href="https://github.com/JLHwung"><code>@​JLHwung</code></a>)</li>
</ul>
</li>
<li><code>babel-helpers</code>, <code>babel-plugin-transform-modules-commonjs</code>, <code>babel-runtime-corejs2</code>, <code>babel-runtime-corejs3</code>, <code>babel-runtime</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/16025">#16025</a> Avoid override mistake in namespace imports (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
</ul>
<h4>Committers: 5</h4>
<ul>
<li>Babel Bot (<a href="https://github.com/babel-bot"><code>@​babel-bot</code></a>)</li>
<li>Huáng Jùnliàng (<a href="https://github.com/JLHwung"><code>@​JLHwung</code></a>)</li>
<li>James Diefenderfer (<a href="https://github.com/jimmydief"><code>@​jimmydief</code></a>)</li>
<li>Nicolò Ribaudo (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
<li><a href="https://github.com/liuxingbaoyu"><code>@​liuxingbaoyu</code></a></li>
</ul>
<h2>v7.23.1 (2023-09-25)</h2>
<p>Re-publishing <code>@babel/helpers</code> due to a publishing error in 7.23.0.</p>
<h2>v7.23.0 (2023-09-25)</h2>
<p>Thanks <a href="https://github.com/lorenzoferre"><code>@​lorenzoferre</code></a> and <a href="https://github.com/RajShukla1"><code>@​RajShukla1</code></a> for your first PRs!</p>
<h4>:rocket: New Feature</h4>
<ul>
<li><code>babel-plugin-proposal-import-wasm-source</code>, <code>babel-plugin-syntax-import-source</code>, <code>babel-plugin-transform-dynamic-import</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15870">#15870</a> Support transforming <code>import source</code> for wasm (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
<li><code>babel-helper-module-transforms</code>, <code>babel-helpers</code>, <code>babel-plugin-proposal-import-defer</code>, <code>babel-plugin-syntax-import-defer</code>, <code>babel-plugin-transform-modules-commonjs</code>, <code>babel-runtime-corejs2</code>, <code>babel-runtime-corejs3</code>, <code>babel-runtime</code>, <code>babel-standalone</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15878">#15878</a> Implement <code>import defer</code> proposal transform support (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
<li><code>babel-generator</code>, <code>babel-parser</code>, <code>babel-types</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15845">#15845</a> Implement <code>import defer</code> parsing support (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
<li><a href="https://redirect.github.com/babel/babel/pull/15829">#15829</a> Add parsing support for the &quot;source phase imports&quot; proposal (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
<li><code>babel-generator</code>, <code>babel-helper-module-transforms</code>, <code>babel-parser</code>, <code>babel-plugin-transform-dynamic-import</code>, <code>babel-plugin-transform-modules-amd</code>, <code>babel-plugin-transform-modules-commonjs</code>, <code>babel-plugin-transform-modules-systemjs</code>, <code>babel-traverse</code>, <code>babel-types</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15682">#15682</a> Add <code>createImportExpressions</code> parser option (<a href="https://github.com/JLHwung"><code>@​JLHwung</code></a>)</li>
</ul>
</li>
<li><code>babel-standalone</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15671">#15671</a> Pass through nonce to the transformed script element (<a href="https://github.com/JLHwung"><code>@​JLHwung</code></a>)</li>
</ul>
</li>
<li><code>babel-helper-function-name</code>, <code>babel-helper-member-expression-to-functions</code>, <code>babel-helpers</code>, <code>babel-parser</code>, <code>babel-plugin-proposal-destructuring-private</code>, <code>babel-plugin-proposal-optional-chaining-assign</code>, <code>babel-plugin-syntax-optional-chaining-assign</code>, <code>babel-plugin-transform-destructuring</code>, <code>babel-plugin-transform-optional-chaining</code>, <code>babel-runtime-corejs2</code>, <code>babel-runtime-corejs3</code>, <code>babel-runtime</code>, <code>babel-standalone</code>, <code>babel-types</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15751">#15751</a> Add support for optional chain in assignments (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
<li><code>babel-helpers</code>, <code>babel-plugin-proposal-decorators</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15895">#15895</a> Implement the &quot;decorator metadata&quot; proposal (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
<li><code>babel-traverse</code>, <code>babel-types</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15893">#15893</a> Add <code>t.buildUndefinedNode</code> (<a href="https://github.com/liuxingbaoyu"><code>@​liuxingbaoyu</code></a>)</li>
</ul>
</li>
<li><code>babel-preset-typescript</code></li>
</ul>
<!-- raw HTML omitted -->
</blockquote>
<p>... (truncated)</p>
</details>
<details>
<summary>Changelog</summary>
<p><em>Sourced from <a href="https://github.com/babel/babel/blob/main/CHANGELOG.md"><code>@​babel/traverse</code>'s changelog</a>.</em></p>
<blockquote>
<h2>v7.23.2 (2023-10-11)</h2>
<h4>:bug: Bug Fix</h4>
<ul>
<li><code>babel-traverse</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/16033">#16033</a> Only evaluate own String/Number/Math methods (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
<li><code>babel-preset-typescript</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/16022">#16022</a> Rewrite <code>.tsx</code> extension when using <code>rewriteImportExtensions</code> (<a href="https://github.com/jimmydief"><code>@​jimmydief</code></a>)</li>
</ul>
</li>
<li><code>babel-helpers</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/16017">#16017</a> Fix: fallback to typeof when toString is applied to incompatible object (<a href="https://github.com/JLHwung"><code>@​JLHwung</code></a>)</li>
</ul>
</li>
<li><code>babel-helpers</code>, <code>babel-plugin-transform-modules-commonjs</code>, <code>babel-runtime-corejs2</code>, <code>babel-runtime-corejs3</code>, <code>babel-runtime</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/16025">#16025</a> Avoid override mistake in namespace imports (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
</ul>
<h2>v7.23.0 (2023-09-25)</h2>
<h4>:rocket: New Feature</h4>
<ul>
<li><code>babel-plugin-proposal-import-wasm-source</code>, <code>babel-plugin-syntax-import-source</code>, <code>babel-plugin-transform-dynamic-import</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15870">#15870</a> Support transforming <code>import source</code> for wasm (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
<li><code>babel-helper-module-transforms</code>, <code>babel-helpers</code>, <code>babel-plugin-proposal-import-defer</code>, <code>babel-plugin-syntax-import-defer</code>, <code>babel-plugin-transform-modules-commonjs</code>, <code>babel-runtime-corejs2</code>, <code>babel-runtime-corejs3</code>, <code>babel-runtime</code>, <code>babel-standalone</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15878">#15878</a> Implement <code>import defer</code> proposal transform support (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
<li><code>babel-generator</code>, <code>babel-parser</code>, <code>babel-types</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15845">#15845</a> Implement <code>import defer</code> parsing support (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
<li><a href="https://redirect.github.com/babel/babel/pull/15829">#15829</a> Add parsing support for the &quot;source phase imports&quot; proposal (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
<li><code>babel-generator</code>, <code>babel-helper-module-transforms</code>, <code>babel-parser</code>, <code>babel-plugin-transform-dynamic-import</code>, <code>babel-plugin-transform-modules-amd</code>, <code>babel-plugin-transform-modules-commonjs</code>, <code>babel-plugin-transform-modules-systemjs</code>, <code>babel-traverse</code>, <code>babel-types</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15682">#15682</a> Add <code>createImportExpressions</code> parser option (<a href="https://github.com/JLHwung"><code>@​JLHwung</code></a>)</li>
</ul>
</li>
<li><code>babel-standalone</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15671">#15671</a> Pass through nonce to the transformed script element (<a href="https://github.com/JLHwung"><code>@​JLHwung</code></a>)</li>
</ul>
</li>
<li><code>babel-helper-function-name</code>, <code>babel-helper-member-expression-to-functions</code>, <code>babel-helpers</code>, <code>babel-parser</code>, <code>babel-plugin-proposal-destructuring-private</code>, <code>babel-plugin-proposal-optional-chaining-assign</code>, <code>babel-plugin-syntax-optional-chaining-assign</code>, <code>babel-plugin-transform-destructuring</code>, <code>babel-plugin-transform-optional-chaining</code>, <code>babel-runtime-corejs2</code>, <code>babel-runtime-corejs3</code>, <code>babel-runtime</code>, <code>babel-standalone</code>, <code>babel-types</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15751">#15751</a> Add support for optional chain in assignments (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
<li><code>babel-helpers</code>, <code>babel-plugin-proposal-decorators</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15895">#15895</a> Implement the &quot;decorator metadata&quot; proposal (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
<li><code>babel-traverse</code>, <code>babel-types</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15893">#15893</a> Add <code>t.buildUndefinedNode</code> (<a href="https://github.com/liuxingbaoyu"><code>@​liuxingbaoyu</code></a>)</li>
</ul>
</li>
<li><code>babel-preset-typescript</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15913">#15913</a> Add <code>rewriteImportExtensions</code> option to TS preset (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
<li><code>babel-parser</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15896">#15896</a> Allow TS tuples to have both labeled and unlabeled elements (<a href="https://github.com/yukukotani"><code>@​yukukotani</code></a>)</li>
</ul>
</li>
</ul>
<h4>:bug: Bug Fix</h4>
<ul>
<li><code>babel-plugin-transform-block-scoping</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15962">#15962</a> fix: <code>transform-block-scoping</code> captures the variables of the method in the loop (<a href="https://github.com/liuxingbaoyu"><code>@​liuxingbaoyu</code></a>)</li>
</ul>
</li>
</ul>
<h4>:nail_care: Polish</h4>
<ul>
<li><code>babel-traverse</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15797">#15797</a> Expand evaluation of global built-ins in <code>@babel/traverse</code> (<a href="https://github.com/lorenzoferre"><code>@​lorenzoferre</code></a>)</li>
</ul>
</li>
<li><code>babel-plugin-proposal-explicit-resource-management</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15985">#15985</a> Improve source maps for blocks with <code>using</code> declarations (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
</ul>
<h4>:microscope: Output optimization</h4>
<ul>
<li><code>babel-core</code>, <code>babel-helper-module-transforms</code>, <code>babel-plugin-transform-async-to-generator</code>, <code>babel-plugin-transform-classes</code>, <code>babel-plugin-transform-dynamic-import</code>, <code>babel-plugin-transform-function-name</code>, <code>babel-plugin-transform-modules-amd</code>, <code>babel-plugin-transform-modules-commonjs</code>, <code>babel-plugin-transform-modules-umd</code>, <code>babel-plugin-transform-parameters</code>, <code>babel-plugin-transform-react-constant-elements</code>, <code>babel-plugin-transform-react-inline-elements</code>, <code>babel-plugin-transform-runtime</code>, <code>babel-plugin-transform-typescript</code>, <code>babel-preset-env</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15984">#15984</a> Inline <code>exports.XXX =</code> update in simple variable declarations (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
</ul>
<h2>v7.22.20 (2023-09-16)</h2>
<!-- raw HTML omitted -->
</blockquote>
<p>... (truncated)</p>
</details>
<details>
<summary>Commits</summary>
<ul>
<li><a href="https://github.com/babel/babel/commit/b4b9942a6cde0685c222eb3412347880aae40ad5"><code>b4b9942</code></a> v7.23.2</li>
<li><a href="https://github.com/babel/babel/commit/b13376b346946e3f62fc0848c1d2a23223314c82"><code>b13376b</code></a> Only evaluate own String/Number/Math methods (<a href="https://github.com/babel/babel/tree/HEAD/packages/babel-traverse/issues/16033">#16033</a>)</li>
<li><a href="https://github.com/babel/babel/commit/ca58ec15cb6dde6812c36997477e44880bec0bba"><code>ca58ec1</code></a> v7.23.0</li>
<li><a href="https://github.com/babel/babel/commit/0f333dafcf470f1970083e4e695ced6aec8bead0"><code>0f333da</code></a> Add <code>createImportExpressions</code> parser option (<a href="https://github.com/babel/babel/tree/HEAD/packages/babel-traverse/issues/15682">#15682</a>)</li>
<li><a href="https://github.com/babel/babel/commit/3744545649fdc21688a2f3c97e1e39dbebff0d21"><code>3744545</code></a> Fix linting</li>
<li><a href="https://github.com/babel/babel/commit/c7e6806e2194deb36c330f543409c792592b22d4"><code>c7e6806</code></a> Add <code>t.buildUndefinedNode</code> (<a href="https://github.com/babel/babel/tree/HEAD/packages/babel-traverse/issues/15893">#15893</a>)</li>
<li><a href="https://github.com/babel/babel/commit/38ee8b4dd693f1e2bd00107bbc1167ce84736ea0"><code>38ee8b4</code></a> Expand evaluation of global built-ins in <code>@babel/traverse</code> (<a href="https://github.com/babel/babel/tree/HEAD/packages/babel-traverse/issues/15797">#15797</a>)</li>
<li><a href="https://github.com/babel/babel/commit/9f3dfd90211472cf0083a3234dd1a1b857ce3624"><code>9f3dfd9</code></a> v7.22.20</li>
<li><a href="https://github.com/babel/babel/commit/3ed28b29c1fb15588369bdd55187b69f1248e87d"><code>3ed28b2</code></a> Fully support <code>||</code> and <code>&amp;&amp;</code> in <code>pluginToggleBooleanFlag</code> (<a href="https://github.com/babel/babel/tree/HEAD/packages/babel-traverse/issues/15961">#15961</a>)</li>
<li><a href="https://github.com/babel/babel/commit/77b0d7359909c94f3797c24006f244847fbc8d6d"><code>77b0d73</code></a> v7.22.19</li>
<li>Additional commits viewable in <a href="https://github.com/babel/babel/commits/v7.23.2/packages/babel-traverse">compare view</a></li>
</ul>
</details>
<br />

Updates `@babel/traverse` from 7.21.3 to 7.23.2
<details>
<summary>Release notes</summary>
<p><em>Sourced from <a href="https://github.com/babel/babel/releases"><code>@​babel/traverse</code>'s releases</a>.</em></p>
<blockquote>
<h2>v7.23.2 (2023-10-11)</h2>
<p><strong>NOTE</strong>: This release also re-publishes <code>@babel/core</code>, even if it does not appear in the linked release commit.</p>
<p>Thanks <a href="https://github.com/jimmydief"><code>@​jimmydief</code></a> for your first PR!</p>
<h4>:bug: Bug Fix</h4>
<ul>
<li><code>babel-traverse</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/16033">#16033</a> Only evaluate own String/Number/Math methods (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
<li><code>babel-preset-typescript</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/16022">#16022</a> Rewrite <code>.tsx</code> extension when using <code>rewriteImportExtensions</code> (<a href="https://github.com/jimmydief"><code>@​jimmydief</code></a>)</li>
</ul>
</li>
<li><code>babel-helpers</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/16017">#16017</a> Fix: fallback to typeof when toString is applied to incompatible object (<a href="https://github.com/JLHwung"><code>@​JLHwung</code></a>)</li>
</ul>
</li>
<li><code>babel-helpers</code>, <code>babel-plugin-transform-modules-commonjs</code>, <code>babel-runtime-corejs2</code>, <code>babel-runtime-corejs3</code>, <code>babel-runtime</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/16025">#16025</a> Avoid override mistake in namespace imports (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
</ul>
<h4>Committers: 5</h4>
<ul>
<li>Babel Bot (<a href="https://github.com/babel-bot"><code>@​babel-bot</code></a>)</li>
<li>Huáng Jùnliàng (<a href="https://github.com/JLHwung"><code>@​JLHwung</code></a>)</li>
<li>James Diefenderfer (<a href="https://github.com/jimmydief"><code>@​jimmydief</code></a>)</li>
<li>Nicolò Ribaudo (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
<li><a href="https://github.com/liuxingbaoyu"><code>@​liuxingbaoyu</code></a></li>
</ul>
<h2>v7.23.1 (2023-09-25)</h2>
<p>Re-publishing <code>@babel/helpers</code> due to a publishing error in 7.23.0.</p>
<h2>v7.23.0 (2023-09-25)</h2>
<p>Thanks <a href="https://github.com/lorenzoferre"><code>@​lorenzoferre</code></a> and <a href="https://github.com/RajShukla1"><code>@​RajShukla1</code></a> for your first PRs!</p>
<h4>:rocket: New Feature</h4>
<ul>
<li><code>babel-plugin-proposal-import-wasm-source</code>, <code>babel-plugin-syntax-import-source</code>, <code>babel-plugin-transform-dynamic-import</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15870">#15870</a> Support transforming <code>import source</code> for wasm (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
<li><code>babel-helper-module-transforms</code>, <code>babel-helpers</code>, <code>babel-plugin-proposal-import-defer</code>, <code>babel-plugin-syntax-import-defer</code>, <code>babel-plugin-transform-modules-commonjs</code>, <code>babel-runtime-corejs2</code>, <code>babel-runtime-corejs3</code>, <code>babel-runtime</code>, <code>babel-standalone</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15878">#15878</a> Implement <code>import defer</code> proposal transform support (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
<li><code>babel-generator</code>, <code>babel-parser</code>, <code>babel-types</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15845">#15845</a> Implement <code>import defer</code> parsing support (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
<li><a href="https://redirect.github.com/babel/babel/pull/15829">#15829</a> Add parsing support for the &quot;source phase imports&quot; proposal (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
<li><code>babel-generator</code>, <code>babel-helper-module-transforms</code>, <code>babel-parser</code>, <code>babel-plugin-transform-dynamic-import</code>, <code>babel-plugin-transform-modules-amd</code>, <code>babel-plugin-transform-modules-commonjs</code>, <code>babel-plugin-transform-modules-systemjs</code>, <code>babel-traverse</code>, <code>babel-types</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15682">#15682</a> Add <code>createImportExpressions</code> parser option (<a href="https://github.com/JLHwung"><code>@​JLHwung</code></a>)</li>
</ul>
</li>
<li><code>babel-standalone</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15671">#15671</a> Pass through nonce to the transformed script element (<a href="https://github.com/JLHwung"><code>@​JLHwung</code></a>)</li>
</ul>
</li>
<li><code>babel-helper-function-name</code>, <code>babel-helper-member-expression-to-functions</code>, <code>babel-helpers</code>, <code>babel-parser</code>, <code>babel-plugin-proposal-destructuring-private</code>, <code>babel-plugin-proposal-optional-chaining-assign</code>, <code>babel-plugin-syntax-optional-chaining-assign</code>, <code>babel-plugin-transform-destructuring</code>, <code>babel-plugin-transform-optional-chaining</code>, <code>babel-runtime-corejs2</code>, <code>babel-runtime-corejs3</code>, <code>babel-runtime</code>, <code>babel-standalone</code>, <code>babel-types</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15751">#15751</a> Add support for optional chain in assignments (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
<li><code>babel-helpers</code>, <code>babel-plugin-proposal-decorators</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15895">#15895</a> Implement the &quot;decorator metadata&quot; proposal (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
<li><code>babel-traverse</code>, <code>babel-types</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15893">#15893</a> Add <code>t.buildUndefinedNode</code> (<a href="https://github.com/liuxingbaoyu"><code>@​liuxingbaoyu</code></a>)</li>
</ul>
</li>
<li><code>babel-preset-typescript</code></li>
</ul>
<!-- raw HTML omitted -->
</blockquote>
<p>... (truncated)</p>
</details>
<details>
<summary>Changelog</summary>
<p><em>Sourced from <a href="https://github.com/babel/babel/blob/main/CHANGELOG.md"><code>@​babel/traverse</code>'s changelog</a>.</em></p>
<blockquote>
<h2>v7.23.2 (2023-10-11)</h2>
<h4>:bug: Bug Fix</h4>
<ul>
<li><code>babel-traverse</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/16033">#16033</a> Only evaluate own String/Number/Math methods (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
<li><code>babel-preset-typescript</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/16022">#16022</a> Rewrite <code>.tsx</code> extension when using <code>rewriteImportExtensions</code> (<a href="https://github.com/jimmydief"><code>@​jimmydief</code></a>)</li>
</ul>
</li>
<li><code>babel-helpers</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/16017">#16017</a> Fix: fallback to typeof when toString is applied to incompatible object (<a href="https://github.com/JLHwung"><code>@​JLHwung</code></a>)</li>
</ul>
</li>
<li><code>babel-helpers</code>, <code>babel-plugin-transform-modules-commonjs</code>, <code>babel-runtime-corejs2</code>, <code>babel-runtime-corejs3</code>, <code>babel-runtime</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/16025">#16025</a> Avoid override mistake in namespace imports (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
</ul>
<h2>v7.23.0 (2023-09-25)</h2>
<h4>:rocket: New Feature</h4>
<ul>
<li><code>babel-plugin-proposal-import-wasm-source</code>, <code>babel-plugin-syntax-import-source</code>, <code>babel-plugin-transform-dynamic-import</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15870">#15870</a> Support transforming <code>import source</code> for wasm (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
<li><code>babel-helper-module-transforms</code>, <code>babel-helpers</code>, <code>babel-plugin-proposal-import-defer</code>, <code>babel-plugin-syntax-import-defer</code>, <code>babel-plugin-transform-modules-commonjs</code>, <code>babel-runtime-corejs2</code>, <code>babel-runtime-corejs3</code>, <code>babel-runtime</code>, <code>babel-standalone</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15878">#15878</a> Implement <code>import defer</code> proposal transform support (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
<li><code>babel-generator</code>, <code>babel-parser</code>, <code>babel-types</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15845">#15845</a> Implement <code>import defer</code> parsing support (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
<li><a href="https://redirect.github.com/babel/babel/pull/15829">#15829</a> Add parsing support for the &quot;source phase imports&quot; proposal (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
<li><code>babel-generator</code>, <code>babel-helper-module-transforms</code>, <code>babel-parser</code>, <code>babel-plugin-transform-dynamic-import</code>, <code>babel-plugin-transform-modules-amd</code>, <code>babel-plugin-transform-modules-commonjs</code>, <code>babel-plugin-transform-modules-systemjs</code>, <code>babel-traverse</code>, <code>babel-types</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15682">#15682</a> Add <code>createImportExpressions</code> parser option (<a href="https://github.com/JLHwung"><code>@​JLHwung</code></a>)</li>
</ul>
</li>
<li><code>babel-standalone</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15671">#15671</a> Pass through nonce to the transformed script element (<a href="https://github.com/JLHwung"><code>@​JLHwung</code></a>)</li>
</ul>
</li>
<li><code>babel-helper-function-name</code>, <code>babel-helper-member-expression-to-functions</code>, <code>babel-helpers</code>, <code>babel-parser</code>, <code>babel-plugin-proposal-destructuring-private</code>, <code>babel-plugin-proposal-optional-chaining-assign</code>, <code>babel-plugin-syntax-optional-chaining-assign</code>, <code>babel-plugin-transform-destructuring</code>, <code>babel-plugin-transform-optional-chaining</code>, <code>babel-runtime-corejs2</code>, <code>babel-runtime-corejs3</code>, <code>babel-runtime</code>, <code>babel-standalone</code>, <code>babel-types</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15751">#15751</a> Add support for optional chain in assignments (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
<li><code>babel-helpers</code>, <code>babel-plugin-proposal-decorators</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15895">#15895</a> Implement the &quot;decorator metadata&quot; proposal (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
<li><code>babel-traverse</code>, <code>babel-types</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15893">#15893</a> Add <code>t.buildUndefinedNode</code> (<a href="https://github.com/liuxingbaoyu"><code>@​liuxingbaoyu</code></a>)</li>
</ul>
</li>
<li><code>babel-preset-typescript</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15913">#15913</a> Add <code>rewriteImportExtensions</code> option to TS preset (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
<li><code>babel-parser</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15896">#15896</a> Allow TS tuples to have both labeled and unlabeled elements (<a href="https://github.com/yukukotani"><code>@​yukukotani</code></a>)</li>
</ul>
</li>
</ul>
<h4>:bug: Bug Fix</h4>
<ul>
<li><code>babel-plugin-transform-block-scoping</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15962">#15962</a> fix: <code>transform-block-scoping</code> captures the variables of the method in the loop (<a href="https://github.com/liuxingbaoyu"><code>@​liuxingbaoyu</code></a>)</li>
</ul>
</li>
</ul>
<h4>:nail_care: Polish</h4>
<ul>
<li><code>babel-traverse</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15797">#15797</a> Expand evaluation of global built-ins in <code>@babel/traverse</code> (<a href="https://github.com/lorenzoferre"><code>@​lorenzoferre</code></a>)</li>
</ul>
</li>
<li><code>babel-plugin-proposal-explicit-resource-management</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15985">#15985</a> Improve source maps for blocks with <code>using</code> declarations (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
</ul>
<h4>:microscope: Output optimization</h4>
<ul>
<li><code>babel-core</code>, <code>babel-helper-module-transforms</code>, <code>babel-plugin-transform-async-to-generator</code>, <code>babel-plugin-transform-classes</code>, <code>babel-plugin-transform-dynamic-import</code>, <code>babel-plugin-transform-function-name</code>, <code>babel-plugin-transform-modules-amd</code>, <code>babel-plugin-transform-modules-commonjs</code>, <code>babel-plugin-transform-modules-umd</code>, <code>babel-plugin-transform-parameters</code>, <code>babel-plugin-transform-react-constant-elements</code>, <code>babel-plugin-transform-react-inline-elements</code>, <code>babel-plugin-transform-runtime</code>, <code>babel-plugin-transform-typescript</code>, <code>babel-preset-env</code>
<ul>
<li><a href="https://redirect.github.com/babel/babel/pull/15984">#15984</a> Inline <code>exports.XXX =</code> update in simple variable declarations (<a href="https://github.com/nicolo-ribaudo"><code>@​nicolo-ribaudo</code></a>)</li>
</ul>
</li>
</ul>
<h2>v7.22.20 (2023-09-16)</h2>
<!-- raw HTML omitted -->
</blockquote>
<p>... (truncated)</p>
</details>
<details>
<summary>Commits</summary>
<ul>
<li><a href="https://github.com/babel/babel/commit/b4b9942a6cde0685c222eb3412347880aae40ad5"><code>b4b9942</code></a> v7.23.2</li>
<li><a href="https://github.com/babel/babel/commit/b13376b346946e3f62fc0848c1d2a23223314c82"><code>b13376b</code></a> Only evaluate own String/Number/Math methods (<a href="https://github.com/babel/babel/tree/HEAD/packages/babel-traverse/issues/16033">#16033</a>)</li>
<li><a href="https://github.com/babel/babel/commit/ca58ec15cb6dde6812c36997477e44880bec0bba"><code>ca58ec1</code></a> v7.23.0</li>
<li><a href="https://github.com/babel/babel/commit/0f333dafcf470f1970083e4e695ced6aec8bead0"><code>0f333da</code></a> Add <code>createImportExpressions</code> parser option (<a href="https://github.com/babel/babel/tree/HEAD/packages/babel-traverse/issues/15682">#15682</a>)</li>
<li><a href="https://github.com/babel/babel/commit/3744545649fdc21688a2f3c97e1e39dbebff0d21"><code>3744545</code></a> Fix linting</li>
<li><a href="https://github.com/babel/babel/commit/c7e6806e2194deb36c330f543409c792592b22d4"><code>c7e6806</code></a> Add <code>t.buildUndefinedNode</code> (<a href="https://github.com/babel/babel/tree/HEAD/packages/babel-traverse/issues/15893">#15893</a>)</li>
<li><a href="https://github.com/babel/babel/commit/38ee8b4dd693f1e2bd00107bbc1167ce84736ea0"><code>38ee8b4</code></a> Expand evaluation of global built-ins in <code>@babel/traverse</code> (<a href="https://github.com/babel/babel/tree/HEAD/packages/babel-traverse/issues/15797">#15797</a>)</li>
<li><a href="https://github.com/babel/babel/commit/9f3dfd90211472cf0083a3234dd1a1b857ce3624"><code>9f3dfd9</code></a> v7.22.20</li>
<li><a href="https://github.com/babel/babel/commit/3ed28b29c1fb15588369bdd55187b69f1248e87d"><code>3ed28b2</code></a> Fully support <code>||</code> and <code>&amp;&amp;</code> in <code>pluginToggleBooleanFlag</code> (<a href="https://github.com/babel/babel/tree/HEAD/packages/babel-traverse/issues/15961">#15961</a>)</li>
<li><a href="https://github.com/babel/babel/commit/77b0d7359909c94f3797c24006f244847fbc8d6d"><code>77b0d73</code></a> v7.22.19</li>
<li>Additional commits viewable in <a href="https://github.com/babel/babel/commits/v7.23.2/packages/babel-traverse">compare view</a></li>
</ul>
</details>
<br />


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
- `@dependabot show <dependency name> ignore conditions` will show all of the ignore conditions of the specified dependency
- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)
- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)
- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)
You can disable automated security fix PRs for this repo from the [Security Alerts page](https://github.com/newrelic/node-test-utilities/network/alerts).

</details>
--------------------------

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
