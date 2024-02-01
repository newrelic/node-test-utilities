## bedrock-server

This module provides a mock server for the [AWS Bedrock][bedrock] service.
It provides a set of responses for each supported LLM to facilitate testing
good and bad responses, both non-streamed and streamed.

See https://github.com/newrelic/node-newrelic-aws-sdk/blob/33bf934/tests/versioned/v3/bedrock-chat-completions.tap.js for examples of how to use
this module.

[bedrock]: https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html
