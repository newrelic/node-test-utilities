### v8.0.0 (2023-08-17)

* **BREAKING CHANGE**: Removed support for Node 14.

* gate usage of loader in versioned tests by NR_LOADER environment variable

* Updated CI to run against versions 16-20.

--- NOTES NEEDS REVIEW ---
Bumps [word-wrap](https://github.com/jonschlinkert/word-wrap) from 1.2.3 to 1.2.4.
<details>
<summary>Release notes</summary>
<p><em>Sourced from <a href="https://github.com/jonschlinkert/word-wrap/releases">word-wrap's releases</a>.</em></p>
<blockquote>
<h2>1.2.4</h2>
<h2>What's Changed</h2>
<ul>
<li>Remove default indent by <a href="https://github.com/mohd-akram"><code>@​mohd-akram</code></a> in <a href="https://redirect.github.com/jonschlinkert/word-wrap/pull/24">jonschlinkert/word-wrap#24</a></li>
<li>🔒fix: CVE 2023 26115 (2) by <a href="https://github.com/OlafConijn"><code>@​OlafConijn</code></a> in <a href="https://redirect.github.com/jonschlinkert/word-wrap/pull/41">jonschlinkert/word-wrap#41</a></li>
<li>:lock: fix: CVE-2023-26115 by <a href="https://github.com/aashutoshrathi"><code>@​aashutoshrathi</code></a> in <a href="https://redirect.github.com/jonschlinkert/word-wrap/pull/33">jonschlinkert/word-wrap#33</a></li>
<li>chore: publish workflow by <a href="https://github.com/OlafConijn"><code>@​OlafConijn</code></a> in <a href="https://redirect.github.com/jonschlinkert/word-wrap/pull/42">jonschlinkert/word-wrap#42</a></li>
</ul>
<h2>New Contributors</h2>
<ul>
<li><a href="https://github.com/mohd-akram"><code>@​mohd-akram</code></a> made their first contribution in <a href="https://redirect.github.com/jonschlinkert/word-wrap/pull/24">jonschlinkert/word-wrap#24</a></li>
<li><a href="https://github.com/OlafConijn"><code>@​OlafConijn</code></a> made their first contribution in <a href="https://redirect.github.com/jonschlinkert/word-wrap/pull/41">jonschlinkert/word-wrap#41</a></li>
<li><a href="https://github.com/aashutoshrathi"><code>@​aashutoshrathi</code></a> made their first contribution in <a href="https://redirect.github.com/jonschlinkert/word-wrap/pull/33">jonschlinkert/word-wrap#33</a></li>
</ul>
<p><strong>Full Changelog</strong>: <a href="https://github.com/jonschlinkert/word-wrap/compare/1.2.3...1.2.4">https://github.com/jonschlinkert/word-wrap/compare/1.2.3...1.2.4</a></p>
</blockquote>
</details>
<details>
<summary>Commits</summary>
<ul>
<li><a href="https://github.com/jonschlinkert/word-wrap/commit/f64b188c7261d26b99e1e2075d6b12f21798e83a"><code>f64b188</code></a> run verb to generate README</li>
<li><a href="https://github.com/jonschlinkert/word-wrap/commit/03ea08256ba0c8e8b02b1b304f0f5bd2b1863207"><code>03ea082</code></a> Merge pull request <a href="https://redirect.github.com/jonschlinkert/word-wrap/issues/42">#42</a> from jonschlinkert/chore/publish-workflow</li>
<li><a href="https://github.com/jonschlinkert/word-wrap/commit/420dce9a2412b21881202b73a3c34f0edc53cb2e"><code>420dce9</code></a> Merge pull request <a href="https://redirect.github.com/jonschlinkert/word-wrap/issues/41">#41</a> from jonschlinkert/fix/CVE-2023-26115-2</li>
<li><a href="https://github.com/jonschlinkert/word-wrap/commit/bfa694edf55bb84ff84512f13da6d68bf7593f06"><code>bfa694e</code></a> Update .github/workflows/publish.yml</li>
<li><a href="https://github.com/jonschlinkert/word-wrap/commit/ace0b3c78f81aaf43040bab3bc91d3c5546d3fd2"><code>ace0b3c</code></a> chore: bump version to 1.2.4</li>
<li><a href="https://github.com/jonschlinkert/word-wrap/commit/6fd727594676f3e1b196b08a320908bec2f4ca02"><code>6fd7275</code></a> chore: add publish workflow</li>
<li><a href="https://github.com/jonschlinkert/word-wrap/commit/30d6daf60fce429f5f559252fa86ee78200652c4"><code>30d6daf</code></a> chore: fix test</li>
<li><a href="https://github.com/jonschlinkert/word-wrap/commit/655929cabea6299dddf3b4a21fc3713fca701b48"><code>655929c</code></a> chore: remove package-lock</li>
<li><a href="https://github.com/jonschlinkert/word-wrap/commit/49e08bbc32a84da5d79e6b7e0fa74ff6217f6d81"><code>49e08bb</code></a> chore: added an additional testcase</li>
<li><a href="https://github.com/jonschlinkert/word-wrap/commit/9f626935f3fac6ec0f3c4b26baea4eb9740d9645"><code>9f62693</code></a> fix: cve 2023-26115</li>
<li>Additional commits viewable in <a href="https://github.com/jonschlinkert/word-wrap/compare/1.2.3...1.2.4">compare view</a></li>
</ul>
</details>
<br />


[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=word-wrap&package-manager=npm_and_yarn&previous-version=1.2.3&new-version=1.2.4)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)

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
You can disable automated security fix PRs for this repo from the [Security Alerts page](https://github.com/newrelic/node-test-utilities/network/alerts).

</details>
--------------------------

--- NOTES NEEDS REVIEW ---
Bumps [protobufjs](https://github.com/protobufjs/protobuf.js) from 7.2.2 to 7.2.4.
<details>
<summary>Release notes</summary>
<p><em>Sourced from <a href="https://github.com/protobufjs/protobuf.js/releases">protobufjs's releases</a>.</em></p>
<blockquote>
<h2>protobufjs: v7.2.4</h2>
<h2><a href="https://github.com/protobufjs/protobuf.js/compare/protobufjs-v7.2.3...protobufjs-v7.2.4">7.2.4</a> (2023-06-23)</h2>
<h3>Bug Fixes</h3>
<ul>
<li>do not let setProperty change the prototype (<a href="https://redirect.github.com/protobufjs/protobuf.js/issues/1899">#1899</a>) (<a href="https://github.com/protobufjs/protobuf.js/commit/e66379f451b0393c27d87b37fa7d271619e16b0d">e66379f</a>)</li>
</ul>
<h2>protobufjs: v7.2.3</h2>
<h2><a href="https://github.com/protobufjs/protobuf.js/compare/protobufjs-v7.2.2...protobufjs-v7.2.3">7.2.3</a> (2023-03-27)</h2>
<h3>Bug Fixes</h3>
<ul>
<li>type names can be split into multiple tokens (<a href="https://redirect.github.com/protobufjs/protobuf.js/issues/1877">#1877</a>) (<a href="https://github.com/protobufjs/protobuf.js/commit/8817ee613dfcf55f7f6fa8704f3fdd3e68c0e1d8">8817ee6</a>)</li>
</ul>
</blockquote>
</details>
<details>
<summary>Changelog</summary>
<p><em>Sourced from <a href="https://github.com/protobufjs/protobuf.js/blob/master/CHANGELOG.md">protobufjs's changelog</a>.</em></p>
<blockquote>
<h2><a href="https://github.com/protobufjs/protobuf.js/compare/protobufjs-v7.2.3...protobufjs-v7.2.4">7.2.4</a> (2023-06-23)</h2>
<h3>Bug Fixes</h3>
<ul>
<li>do not let setProperty change the prototype (<a href="https://redirect.github.com/protobufjs/protobuf.js/issues/1899">#1899</a>) (<a href="https://github.com/protobufjs/protobuf.js/commit/e66379f451b0393c27d87b37fa7d271619e16b0d">e66379f</a>)</li>
</ul>
<h2><a href="https://github.com/protobufjs/protobuf.js/compare/protobufjs-v7.2.2...protobufjs-v7.2.3">7.2.3</a> (2023-03-27)</h2>
<h3>Bug Fixes</h3>
<ul>
<li>type names can be split into multiple tokens (<a href="https://redirect.github.com/protobufjs/protobuf.js/issues/1877">#1877</a>) (<a href="https://github.com/protobufjs/protobuf.js/commit/8817ee613dfcf55f7f6fa8704f3fdd3e68c0e1d8">8817ee6</a>)</li>
</ul>
</blockquote>
</details>
<details>
<summary>Commits</summary>
<ul>
<li><a href="https://github.com/protobufjs/protobuf.js/commit/42e5a9ca85044800b16e193020e1d4d2e6b4010c"><code>42e5a9c</code></a> chore: release master (<a href="https://redirect.github.com/protobufjs/protobuf.js/issues/1900">#1900</a>)</li>
<li><a href="https://github.com/protobufjs/protobuf.js/commit/e66379f451b0393c27d87b37fa7d271619e16b0d"><code>e66379f</code></a> fix: do not let setProperty change the prototype (<a href="https://redirect.github.com/protobufjs/protobuf.js/issues/1899">#1899</a>)</li>
<li><a href="https://github.com/protobufjs/protobuf.js/commit/56b1e64979dae757b67a21d326e16acee39f2267"><code>56b1e64</code></a> chore: release master (<a href="https://redirect.github.com/protobufjs/protobuf.js/issues/1879">#1879</a>)</li>
<li><a href="https://github.com/protobufjs/protobuf.js/commit/8817ee613dfcf55f7f6fa8704f3fdd3e68c0e1d8"><code>8817ee6</code></a> fix: type names can be split into multiple tokens (<a href="https://redirect.github.com/protobufjs/protobuf.js/issues/1877">#1877</a>)</li>
<li>See full diff in <a href="https://github.com/protobufjs/protobuf.js/compare/protobufjs-v7.2.2...protobufjs-v7.2.4">compare view</a></li>
</ul>
</details>
<br />


[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=protobufjs&package-manager=npm_and_yarn&previous-version=7.2.2&new-version=7.2.4)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)

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
You can disable automated security fix PRs for this repo from the [Security Alerts page](https://github.com/newrelic/node-test-utilities/network/alerts).

</details>
--------------------------

--- NOTES NEEDS REVIEW ---
Bumps [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser) and [@aws-sdk/client-lambda](https://github.com/aws/aws-sdk-js-v3/tree/HEAD/clients/client-lambda). These dependencies needed to be updated together.
Updates `fast-xml-parser` from 4.2.4 to 4.2.5
<details>
<summary>Changelog</summary>
<p><em>Sourced from <a href="https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/CHANGELOG.md">fast-xml-parser's changelog</a>.</em></p>
<blockquote>
<p>Note: If you find missing information about particular minor version, that version must have been changed without any functional change in this library.</p>
<p><strong>4.2.5 / 2023-06-22</strong></p>
<ul>
<li>change code implementation</li>
</ul>
<p><strong>4.2.4 / 2023-06-06</strong></p>
<ul>
<li>fix security bug</li>
</ul>
<p><strong>4.2.3 / 2023-06-05</strong></p>
<ul>
<li>fix security bug</li>
</ul>
<p><strong>4.2.2 / 2023-04-18</strong></p>
<ul>
<li>fix <a href="https://redirect.github.com/NaturalIntelligence/fast-xml-parser/issues/562">#562</a>: fix unpaired tag when it comes in last of a nested tag. Also throw error when unpaired tag is used as closing tag</li>
</ul>
<p><strong>4.2.1 / 2023-04-18</strong></p>
<ul>
<li>fix: jpath after unpaired tags</li>
</ul>
<p><strong>4.2.0 / 2023-04-09</strong></p>
<ul>
<li>support <code>updateTag</code> parser property</li>
</ul>
<p><strong>4.1.4 / 2023-04-08</strong></p>
<ul>
<li>update typings to let user create XMLBuilder instance without options (<a href="https://redirect.github.com/NaturalIntelligence/fast-xml-parser/issues/556">#556</a>) (By <a href="https://github.com/omggga">Patrick</a>)</li>
<li>fix: IsArray option isn't parsing tags with 0 as value correctly <a href="https://redirect.github.com/NaturalIntelligence/fast-xml-parser/issues/490">#490</a> (<a href="https://redirect.github.com/NaturalIntelligence/fast-xml-parser/issues/557">#557</a>) (By <a href="https://github.com/p-kuen">Aleksandr Murashkin</a>)</li>
<li>feature: support <code>oneListGroup</code> to group repeated children tags udder single group</li>
</ul>
<p><strong>4.1.3 / 2023-02-26</strong></p>
<ul>
<li>fix <a href="https://redirect.github.com/NaturalIntelligence/fast-xml-parser/issues/546">#546</a>: Support complex entity value</li>
</ul>
<p><strong>4.1.2 / 2023-02-12</strong></p>
<ul>
<li>Security Fix</li>
</ul>
<p><strong>4.1.1 / 2023-02-03</strong></p>
<ul>
<li>Fix <a href="https://redirect.github.com/NaturalIntelligence/fast-xml-parser/issues/540">#540</a>: ignoreAttributes breaks unpairedTags</li>
<li>Refactor XML builder code</li>
</ul>
<p><strong>4.1.0 / 2023-02-02</strong></p>
<ul>
<li>Fix '<!-- raw HTML omitted -->' in DTD comment throwing an error. (<a href="https://redirect.github.com/NaturalIntelligence/fast-xml-parser/issues/533">#533</a>) (By <a href="https://github.com/Cwazywierdo">Adam Baker</a>)</li>
<li>Set &quot;eNotation&quot; to 'true' as default</li>
</ul>
<p><strong>4.0.15 / 2023-01-25</strong></p>
<ul>
<li>make &quot;eNotation&quot; optional</li>
</ul>
<p><strong>4.0.14 / 2023-01-22</strong></p>
<ul>
<li>fixed: add missed typing &quot;eNotation&quot; to parse values</li>
</ul>
<p><strong>4.0.13 / 2023-01-07</strong></p>
<ul>
<li>preserveorder formatting (By <a href="https://github.com/mdeknowis">mdeknowis</a>)</li>
<li>support <code>transformAttributeName</code> (By <a href="https://github.com/erkie">Erik Rothoff Andersson</a>)</li>
</ul>
<p><strong>4.0.12 / 2022-11-19</strong></p>
<!-- raw HTML omitted -->
</blockquote>
<p>... (truncated)</p>
</details>
<details>
<summary>Commits</summary>
<ul>
<li><a href="https://github.com/NaturalIntelligence/fast-xml-parser/commit/643816d67b4c8b85ff97ba83e9bf41d23446c963"><code>643816d</code></a> update package details</li>
<li><a href="https://github.com/NaturalIntelligence/fast-xml-parser/commit/cc73065e1469147a0104dc122b0cdf6724354446"><code>cc73065</code></a> Remove unused code (<a href="https://redirect.github.com/NaturalIntelligence/fast-xml-parser/issues/587">#587</a>)</li>
<li><a href="https://github.com/NaturalIntelligence/fast-xml-parser/commit/9a880b887916855c3a510869fd1ee268d7fe58b1"><code>9a880b8</code></a> Merge pull request from GHSA-gpv5-7x3g-ghjv</li>
<li>See full diff in <a href="https://github.com/NaturalIntelligence/fast-xml-parser/compare/v4.2.4...v4.2.5">compare view</a></li>
</ul>
</details>
<br />

Updates `@aws-sdk/client-lambda` from 3.357.0 to 3.363.0
<details>
<summary>Release notes</summary>
<p><em>Sourced from <a href="https://github.com/aws/aws-sdk-js-v3/releases"><code>@​aws-sdk/client-lambda</code>'s releases</a>.</em></p>
<blockquote>
<h2>v3.363.0</h2>
<h4>3.363.0(2023-06-29)</h4>
<h5>New Features</h5>
<ul>
<li><strong>client-chime:</strong>  The Amazon Chime SDK APIs in the Chime namespace are no longer supported.  Customers should use APIs in the dedicated Amazon Chime SDK namespaces: ChimeSDKIdentity, ChimeSDKMediaPipelines, ChimeSDKMeetings, ChimeSDKMessaging, and ChimeSDKVoice. (<a href="https://github.com/aws/aws-sdk-js-v3/commit/a6ff65faa545c01bb2e173f5b9d38dc8bd31a097">a6ff65fa</a>)</li>
<li><strong>client-appstream:</strong>  This release introduces app block builder, allowing customers to provision a resource to package applications into an app block (<a href="https://github.com/aws/aws-sdk-js-v3/commit/8c61b346a3f1f6194f1cef161b629b9f8b65c10e">8c61b346</a>)</li>
<li><strong>client-sagemaker:</strong>  Adding support for timeseries forecasting in the CreateAutoMLJobV2 API. (<a href="https://github.com/aws/aws-sdk-js-v3/commit/1c2f6f07c99c638dd0683f15b47478157e046f14">1c2f6f07</a>)</li>
<li><strong>client-cleanrooms:</strong>  This release adds support for the OR operator in RSQL join match conditions and the ability to control which operators (AND, OR) are allowed in a join match condition. (<a href="https://github.com/aws/aws-sdk-js-v3/commit/03a2f9ac9f14423c2660de675fedc8d708e3eab3">03a2f9ac</a>)</li>
<li><strong>client-glue:</strong>  This release adds support for AWS Glue Crawler with Iceberg Tables, allowing Crawlers to discover Iceberg Tables in S3 and register them in Glue Data Catalog for query engines to query against. (<a href="https://github.com/aws/aws-sdk-js-v3/commit/2a11fd8ae47cbc51fc87a5d019099528266f0f0c">2a11fd8a</a>)</li>
<li><strong>client-dynamodb:</strong>  This release adds ReturnValuesOnConditionCheckFailure parameter to PutItem, UpdateItem, DeleteItem, ExecuteStatement, BatchExecuteStatement and ExecuteTransaction APIs. When set to ALL_OLD,  API returns a copy of the item as it was when a conditional write failed (<a href="https://github.com/aws/aws-sdk-js-v3/commit/cef0845a77f2a941f7294de1a61f58159693f944">cef0845a</a>)</li>
<li><strong>client-gamelift:</strong>  Amazon GameLift now supports game builds that use the Amazon Linux 2023 (AL2023) operating system. (<a href="https://github.com/aws/aws-sdk-js-v3/commit/ce985baa035dbd66d60c799b10c3e77abe33b10b">ce985baa</a>)</li>
<li><strong>clients:</strong>  use migrated <a href="https://github.com/smithy"><code>@​smithy</code></a> packages (<a href="https://redirect.github.com/aws/aws-sdk-js-v3/pull/4873">#4873</a>) (<a href="https://github.com/aws/aws-sdk-js-v3/commit/d036e2e43cd33cfd497871f97dde907c3078b2fd">d036e2e4</a>)</li>
</ul>
<h2>v3.362.0</h2>
<h4>3.362.0(2023-06-28)</h4>
<h5>Documentation Changes</h5>
<ul>
<li><strong>api-reference:</strong>  deprecation message on TypeDoc api reference (<a href="https://redirect.github.com/aws/aws-sdk-js-v3/pull/4894">#4894</a>) (<a href="https://github.com/aws/aws-sdk-js-v3/commit/2b5a3e46e58a7835a83d47924cb5b072f7f89784">2b5a3e46</a>)</li>
</ul>
<h5>New Features</h5>
<ul>
<li><strong>client-lambda:</strong>  Surface ResourceConflictException in DeleteEventSourceMapping (<a href="https://github.com/aws/aws-sdk-js-v3/commit/9aafa26074ecfc2629b8476555ad565efd57501c">9aafa260</a>)</li>
<li><strong>client-internetmonitor:</strong>  This release adds a new feature for Amazon CloudWatch Internet Monitor that enables customers to set custom thresholds, for performance and availability drops, for triggering when to create a health event. (<a href="https://github.com/aws/aws-sdk-js-v3/commit/fb478aaea8c100d368782847b047074471909aba">fb478aae</a>)</li>
<li><strong>client-rds:</strong>  Amazon Relational Database Service (RDS) now supports joining a RDS for SQL Server instance to a self-managed Active Directory. (<a href="https://github.com/aws/aws-sdk-js-v3/commit/a3ee38fa1b07050237de742743e48048e73668fe">a3ee38fa</a>)</li>
<li><strong>client-sagemaker:</strong>  This release adds support for Model Cards Model Registry integration. (<a href="https://github.com/aws/aws-sdk-js-v3/commit/75339d289ed4aede2aa3e4d325eab3327769d89c">75339d28</a>)</li>
<li><strong>client-kinesis-analytics-v2:</strong>  Support for new runtime environment in Kinesis Data Analytics Studio: Zeppelin-0.10, Apache Flink-1.15 (<a href="https://github.com/aws/aws-sdk-js-v3/commit/bb74957c962e40e67590fddd208edfad8406b848">bb74957c</a>)</li>
<li><strong>client-s3:</strong>  The S3 LISTObjects, ListObjectsV2 and ListObjectVersions API now supports a new optional header x-amz-optional-object-attributes. If header contains RestoreStatus as the value, then S3 will include Glacier restore status i.e. isRestoreInProgress and RestoreExpiryDate in List response. (<a href="https://github.com/aws/aws-sdk-js-v3/commit/54577854eb24a30cdee4099f03c7b26f247f3dc0">54577854</a>)</li>
<li><strong>client-omics:</strong>  Add Common Workflow Language (CWL) as a supported language for Omics workflows (<a href="https://github.com/aws/aws-sdk-js-v3/commit/3cb41fa75d0918d6a4e5921a54327d967f2a00c5">3cb41fa7</a>)</li>
</ul>
<h5>Bug Fixes</h5>
<ul>
<li><strong>util-retry:</strong>  correct attempts count on StandardRetryStrategy (<a href="https://redirect.github.com/aws/aws-sdk-js-v3/pull/4891">#4891</a>) (<a href="https://github.com/aws/aws-sdk-js-v3/commit/63c3e60c019a3a129f784908d304ece99b7da9d7">63c3e60c</a>)</li>
</ul>
<h2>v3.361.0</h2>
<h4>3.361.0(2023-06-27)</h4>
<h5>Documentation Changes</h5>
<ul>
<li><strong>client-ssm:</strong>  Systems Manager doc-only update for June 2023. (<a href="https://github.com/aws/aws-sdk-js-v3/commit/e298b14d39312d497b61828dd8e4584a65313905">e298b14d</a>)</li>
<li><strong>client-verifiedpermissions:</strong>  This update fixes several broken links to the Cedar documentation. (<a href="https://github.com/aws/aws-sdk-js-v3/commit/e6fbf506c42b9a31ac8d3ddddd45196c5f9bdcbb">e6fbf506</a>)</li>
</ul>
<h5>New Features</h5>
<ul>
<li><strong>client-sagemaker:</strong>  Introducing TTL for online store records in feature groups. (<a href="https://github.com/aws/aws-sdk-js-v3/commit/9e6d60d0d26333dc6f4b01c65b1607793d4bfcbd">9e6d60d0</a>)</li>
<li><strong>client-ivs:</strong>  IVS customers can now revoke the viewer session associated with an auth token, to prevent and stop playback using that token. (<a href="https://github.com/aws/aws-sdk-js-v3/commit/5e12ed4aa524d6ecfde6821a8226e9882c4e3564">5e12ed4a</a>)</li>
<li><strong>client-macie2:</strong>  This release adds support for configuring new classification jobs to use the set of managed data identifiers that we recommend for jobs. For the managed data identifier selection type (managedDataIdentifierSelector), specify RECOMMENDED. (<a href="https://github.com/aws/aws-sdk-js-v3/commit/5410b9001ef77c41dfc96e10504f8aac8c1e8030">5410b900</a>)</li>
<li><strong>client-privatenetworks:</strong>  This release allows Private5G customers to choose different commitment plans (60-days, 1-year, 3-years) when placing new orders, enables automatic renewal option for 1-year and 3-years commitments. It also allows customers to update the commitment plan of an existing radio unit. (<a href="https://github.com/aws/aws-sdk-js-v3/commit/c0eca1870e50b241c5357cd53f80b51898ee99f0">c0eca187</a>)</li>
<li><strong>client-appfabric:</strong>  Initial release of AWS AppFabric for connecting SaaS applications for better productivity and security. (<a href="https://github.com/aws/aws-sdk-js-v3/commit/bfd0e0cd0ba59515cefbc340de59f6b071d5a003">bfd0e0cd</a>)</li>
</ul>
<!-- raw HTML omitted -->
</blockquote>
<p>... (truncated)</p>
</details>
<details>
<summary>Changelog</summary>
<p><em>Sourced from <a href="https://github.com/aws/aws-sdk-js-v3/blob/main/clients/client-lambda/CHANGELOG.md"><code>@​aws-sdk/client-lambda</code>'s changelog</a>.</em></p>
<blockquote>
<h1><a href="https://github.com/aws/aws-sdk-js-v3/compare/v3.362.0...v3.363.0">3.363.0</a> (2023-06-29)</h1>
<h3>Features</h3>
<ul>
<li><strong>clients:</strong> use migrated <a href="https://github.com/smithy"><code>@​smithy</code></a> packages (<a href="https://redirect.github.com/aws/aws-sdk-js-v3/issues/4873">#4873</a>) (<a href="https://github.com/aws/aws-sdk-js-v3/commit/d036e2e43cd33cfd497871f97dde907c3078b2fd">d036e2e</a>)</li>
</ul>
<h1><a href="https://github.com/aws/aws-sdk-js-v3/compare/v3.361.0...v3.362.0">3.362.0</a> (2023-06-28)</h1>
<h3>Features</h3>
<ul>
<li><strong>client-lambda:</strong> Surface ResourceConflictException in DeleteEventSourceMapping (<a href="https://github.com/aws/aws-sdk-js-v3/commit/9aafa26074ecfc2629b8476555ad565efd57501c">9aafa26</a>)</li>
</ul>
<h1><a href="https://github.com/aws/aws-sdk-js-v3/compare/v3.359.0...v3.360.0">3.360.0</a> (2023-06-26)</h1>
<p><strong>Note:</strong> Version bump only for package <code>@​aws-sdk/client-lambda</code></p>
<h1><a href="https://github.com/aws/aws-sdk-js-v3/compare/v3.358.0...v3.359.0">3.359.0</a> (2023-06-23)</h1>
<p><strong>Note:</strong> Version bump only for package <code>@​aws-sdk/client-lambda</code></p>
<h1><a href="https://github.com/aws/aws-sdk-js-v3/compare/v3.357.0...v3.358.0">3.358.0</a> (2023-06-22)</h1>
<p><strong>Note:</strong> Version bump only for package <code>@​aws-sdk/client-lambda</code></p>
</blockquote>
</details>
<details>
<summary>Commits</summary>
<ul>
<li><a href="https://github.com/aws/aws-sdk-js-v3/commit/0bda23814dcc0f598b0b4543ada3bcd100351696"><code>0bda238</code></a> Publish v3.363.0</li>
<li><a href="https://github.com/aws/aws-sdk-js-v3/commit/d036e2e43cd33cfd497871f97dde907c3078b2fd"><code>d036e2e</code></a> feat(clients): use migrated <a href="https://github.com/smithy"><code>@​smithy</code></a> packages (<a href="https://github.com/aws/aws-sdk-js-v3/tree/HEAD/clients/client-lambda/issues/4873">#4873</a>)</li>
<li><a href="https://github.com/aws/aws-sdk-js-v3/commit/4b3856a34f026d516653bf90e26d325e826ea765"><code>4b3856a</code></a> Publish v3.362.0</li>
<li><a href="https://github.com/aws/aws-sdk-js-v3/commit/9aafa26074ecfc2629b8476555ad565efd57501c"><code>9aafa26</code></a> feat(client-lambda): Surface ResourceConflictException in DeleteEventSourceMa...</li>
<li><a href="https://github.com/aws/aws-sdk-js-v3/commit/e5d52be09bda5317cb89cf192be65569808d114d"><code>e5d52be</code></a> Publish v3.360.0</li>
<li><a href="https://github.com/aws/aws-sdk-js-v3/commit/e5d4fa851c9061bb71449280f667c2a67726d34c"><code>e5d4fa8</code></a> Publish v3.359.0</li>
<li><a href="https://github.com/aws/aws-sdk-js-v3/commit/e5bc64e1f8d91c2e8aebd38472d8da0db6c2cc53"><code>e5bc64e</code></a> Publish v3.358.0</li>
<li>See full diff in <a href="https://github.com/aws/aws-sdk-js-v3/commits/v3.363.0/clients/client-lambda">compare view</a></li>
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
- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)
- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)
- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)
You can disable automated security fix PRs for this repo from the [Security Alerts page](https://github.com/newrelic/node-test-utilities/network/alerts).

</details>
--------------------------

### v7.3.2 (2023-06-22)

Proposed release notes

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
