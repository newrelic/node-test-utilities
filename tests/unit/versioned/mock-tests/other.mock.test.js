/*
 * Copyright 2020 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

console.log('stdout - other.mock.test.js')
console.error('stderr - other.mock.test.js')
/* eslint-disable no-process-exit */
process.exit(1)
