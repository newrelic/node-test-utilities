/*
 * Copyright 2020 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

var semver = require('semver')

var packager = require('./packager')

/**
 * @interface TestDescriptor
 * @private
 *
 * @description
 *  Describes all of the tests to be executed and the required dependencies.
 *
 * @property {object} engines
 *  Mapping of engines (i.e. "node") to semver ranges.
 *
 * @property {object} dependencies
 *  Mapping of package names (i.e. "redis") to semver ranges.
 *
 * @property {Array.<string>} files
 *  Array of file names identifying tests to execute.
 */

/**
 * @interface PackageVersions
 * @private
 *
 * @description
 *  Maps package names to all known versions of that package.
 */

/**
 * Constructs a test matrix from the given test descriptor and package versions.
 *
 * @constructor
 * @private
 * @classdesc
 *  Provides an iteration class for stepping over every possible test
 *  combination described.
 *
 * @param {Array.<TestDescriptor>} tests
 *  Array of test descriptors for the whole range of things to be executed.
 *
 * @param {PackageVersions} pkgVersions
 *  All the package versions needed to flesh out the test descriptors.
 */
function TestMatrix(tests, pkgVersions) {
  // The tests object is an array of objects pairing package version ranges with
  // an array of test files. These look like this:
  //  [{
  //    "engines": {"node": ">=4"}
  //    "dependencies": {"redis": "1.0.0"},
  //    "files": ["redis.tap.js"]
  //  }, {
  //    "engines": {"node": ">=4"}
  //    "dependencies": {
  //      "redis": {
  //        "versions": ">1.0.0",
  //        "samples": 10
  //      }
  //    },
  //    "files": ["redis.tap.js"]
  //  }]
  //
  // The pkgVersions object is a pairing of package names to arrays of versions
  // that look like this:
  //  {
  //    "bluebird": ["1.0", "1.1", "1.2", "1.3"],
  //    "redis": ["1.2", "1.3", "2.0"]
  //  }
  //
  // We want to convert the tests array into an array of objects with package
  // version iterators and a test file iterator. This should look something like
  // this:
  //  [{
  //    "packages": [{
  //      "name": "redis",            // <-- Package name.
  //      "next": 0,                  // <-- Iteration point.
  //      "versions": [               // <-- List of versions to iterate through.
  //        "1.2", "1.3", "2.0"
  //      ]
  //    }],
  //    "tests": {
  //      "files": ["redis.tap.js"],  // <-- List of test files to iterate through.
  //      "next": 0                   // <-- File iteration point.
  //    }
  //  }]
  this._matrix = tests
    ? tests.map((test) => {
        if (test.engines && !semver.satisfies(process.version, test.engines.node)) {
          return { tests: { files: [], next: 0 }, packages: [] }
        }

        var task = {
          tests: {
            files: test.files,
            next: 0
          },
          packages: null
        }
        task.packages = Object.keys(test.dependencies).map((pkg) => {
          var wantedVersions = test.dependencies[pkg]
          var samples = null

          if (typeof wantedVersions === 'object') {
            samples = wantedVersions.samples
            wantedVersions = wantedVersions.versions
          }

          var pkgIterator = {
            name: pkg,
            next: 0,
            versions: pkgVersions[pkg].filter((v) => {
              return semver.satisfies(v, wantedVersions)
            })
          }

          // The package versions provided are just the most recent versions of the
          // packages according to our testing mode (i.e. major, minor, patch). If
          // none of the latest packages match, then just grab any one that does.
          // Better to run the test on an older version than not at all.
          if (pkgIterator.versions.length === 0) {
            var matching = packager.get(pkg, wantedVersions)

            // If we still have no versions, report such and move on.
            if (matching.length === 0) {
              /* eslint-disable no-console */
              console.error('Warning: no versions match %s@%s', pkg, wantedVersions)
              /* eslint-enable no-console */
            } else {
              pkgIterator.versions = [matching[matching.length - 1]]
            }
          }

          // Sample the versions down to the limit if applicable
          var versions = pkgIterator.versions
          if (samples != null && versions.length > samples) {
            // Since we take the latest version, we drop an intermediate version
            samples -= 1

            var sampledVersions = []
            for (var i = 0; i < samples; i += 1) {
              sampledVersions[i] = versions[Math.floor((versions.length * i) / samples)]
            }

            // Always take the latest
            sampledVersions.push(versions[versions.length - 1])

            pkgIterator.versions = sampledVersions
          }

          return pkgIterator
        })
        return task
      })
    : []

  this._matrixPos = 0
  this._length = null
}

Object.defineProperty(TestMatrix.prototype, 'length', {
  get: function length() {
    if (this._length === null) {
      this._length = this._calculateLength()
    }
    return this._length
  }
})

/**
 * Peeks at the next test in the matrix without updating the matrix state.
 */
TestMatrix.prototype.peek = function peek() {
  // For each suite in the test matrix, for each combination of packages, for
  // each test file.
  for (var i = this._matrixPos; i < this._matrix.length; ++i) {
    var packages = null
    var task = this._matrix[i]

    if (!packages) {
      packages = this._peekPackages(task.packages)

      // If there are no more package combinations then this test suite is done
      // and we should move to the next one in the matrix.
      if (!packages) {
        continue
      }
    }

    do {
      var tests = task.tests
      if (tests.next < tests.files.length) {
        return {
          packages: packages,
          test: tests.files[tests.next]
        }
      }

      tests.next = 0
      packages = this._peekPackages(task.packages)
    } while (packages)
  }

  // No tests left!
  return null
}

/**
 * Moves the matrix state to the next combination and returns it.
 */
TestMatrix.prototype.next = function next() {
  // For each suite in the test matrix, for each combination of packages, for
  // each test file.
  for (this._matrixPos; this._matrixPos < this._matrix.length; ++this._matrixPos) {
    var task = this._matrix[this._matrixPos]

    if (!this._packages) {
      this._packages = this._getNextPackages(task.packages)

      // If there are no more package combinations then this test suite is done
      // and we should move to the next one in the matrix.
      if (!this._packages) {
        continue
      }
    }

    do {
      var tests = task.tests
      if (tests.next < tests.files.length) {
        return {
          packages: this._packages,
          test: tests.files[tests.next++] // Yes, post-increment!
        }
      }

      tests.next = 0
      this._packages = this._getNextPackages(task.packages)
    } while (this._packages)
  }

  // No tests left!
  return null
}

TestMatrix.prototype._peekPackages = function _peekPackages(pkgs) {
  // If there are no packages associated with this test suite, return nothing.
  if (!pkgs || !pkgs.length) {
    return null
  }

  // With an array of task packages, we want to determine what the next run of
  // test should use for each of its packages.
  var nextPackages = {}
  var bumpNext = false
  for (var i = 0; i < pkgs.length; ++i) {
    var pkg = pkgs[i]
    var next = pkg.next
    if (bumpNext) {
      ++next
      bumpNext = false
    }
    if (next >= pkg.versions.length) {
      // If this package has looped through all its versions, increment the next
      // package's pointer and reset this one.
      if (i === pkgs.length - 1) {
        // If this is the last package and it has gone through all versions then
        // there is no "next" package set.
        return null
      }
      bumpNext = true
      next = 0
    }

    nextPackages[pkg.name] = pkg.versions[next]
  }

  return nextPackages
}

TestMatrix.prototype._getNextPackages = function _getNextPackages(pkgs) {
  // If there are no packages associated with this test suite, return nothing.
  if (!pkgs || !pkgs.length) {
    return null
  }

  // With an array of task packages, we want to determine what the next run of
  // test should use for each of its packages.
  var nextPackages = {}
  for (var i = 0; i < pkgs.length; ++i) {
    var pkg = pkgs[i]
    if (pkg.next >= pkg.versions.length) {
      // If this package has looped through all its versions, increment the next
      // package's pointer and reset this one.
      if (i === pkgs.length - 1) {
        // If this is the last package and it has gone through all versions then
        // there is no "next" package set.
        return null
      }
      ++pkgs[i + 1].next
      pkg.next = 0
    }
    nextPackages[pkg.name] = pkg.versions[pkg.next]
  }

  // The next run should use the next version of the first package.
  ++pkgs[0].next

  return nextPackages
}

TestMatrix.prototype._calculateLength = function _calculateLength() {
  //  [{
  //    "packages": [{
  //      "name": "redis",            // <-- Package name.
  //      "next": 0,                  // <-- Iteration point.
  //      "versions": [               // <-- List of versions to iterate through.
  //        "1.2", "1.3", "2.0"
  //      ]
  //    }],
  //    "tests": {
  //      "files": ["redis.tap.js"],  // <-- List of test files to iterate through.
  //      "next": 0                   // <-- File iteration point.
  //    }
  //  }]
  var totalLength = 0
  for (var i = 0; i < this._matrix.length; ++i) {
    var suite = this._matrix[i]
    var pkgCombinations = 1
    for (var j = 0; j < suite.packages.length; ++j) {
      pkgCombinations *= suite.packages[j].versions.length
    }
    totalLength += pkgCombinations * suite.tests.files.length
  }
  return totalLength
}

module.exports = TestMatrix
