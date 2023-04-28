/*
 * Copyright 2021 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'
module.exports = {
  parserOptions: {
    ecmaVersion: '2020'
  },
  extends: '@newrelic',
  rules: {
    'consistent-return': 'off'
  }
}
