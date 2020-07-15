#! /bin/bash
#
# Copyright 2020 New Relic Corporation. All rights reserved.
# SPDX-License-Identifier: Apache-2.0
#

VERSION=$(node -e 'console.log(require("./package").version)')

git checkout gh-pages
git pull origin gh-pages
git merge -
git rm -r docs
npm run docs
git add docs
git commit -m "Updated documentation for ${VERSION}"
git push origin gh-pages
