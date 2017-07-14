'use strict'

var a = require('async')
var fs = require('fs')
var path = require('path')
var TestPrinter = require('./printer')
var util = require('util')


function HtmlPrinter(tests, opts) {
  TestPrinter.call(this, tests, opts)
  this._suiteResults = Object.create(null)

  this._htmlFile = opts.fileName || 'out.html'
  this._output = null

  this._templates = null
  this._loadTemplates()
}
util.inherits(HtmlPrinter, TestPrinter)

HtmlPrinter.prototype.maybePrint = function() {
  // Only attempt printing if we have loaded the templates.
  if (this._templates) {
    TestPrinter.prototype.maybePrint.call(this)
  }
}

HtmlPrinter.prototype.update = function(test, status) {
  if (status === 'done') {
    // TODO: Should we only print done suites? Save on cycles for maybePrint.
    // Possibly also append done suites to output to save on memory.
    return
  }

  var testDir = path.basename(test.directory)
  var testFile = path.basename(test.currentRun.test)

  if (!this._suiteResults[testDir]) {
    this._suiteResults[testDir] = Object.create(null)
  }
  if (!this._suiteResults[testDir][testFile]) {
    this._suiteResults[testDir][testFile] = Object.create(null)
  }
  var results = this._suiteResults[testDir][testFile]

  test.currentRun.packageVersions.forEach(function(pkg) {
    var parts = /^((?:@\w+\/)?\w+)@(.*)$/.exec(pkg)
    if (parts) {
      if (!results[parts[1]]) {
        results[parts[1]] = Object.create(null)
      }
      results[parts[1]][parts[2]] = {
        status: status,
        stdout: test.stdout || '',
        stderr: test.stderr || ''
      }
    }
  })

  this.updated = true
}

HtmlPrinter.prototype.print = function() {
  var output = this._templates.main
  output = output.replace('${title}', this._templates.title || 'Test Results')
  output = output.replace('${style}', this._templates.style || '')
  output = output.replace('${script}', this._templates.script || '')
  output = output.replace('${head}', this._templates.head || '')
  output = output.replace('${body}', this._printBody())
  this._output = output
}

HtmlPrinter.prototype.end = function() {
  TestPrinter.prototype.end.apply(this, arguments)

  this.maybePrint()
  if (this._output) {
    fs.writeFile(this._htmlFile, this._output, function(err) {
      if (err) {
        console.error('Could not save HTML output:', err.stack) // eslint-disable-line
      }
    })
  }
}

HtmlPrinter.prototype._printBody = function() {
  var self = this

  return [
    '<div class="suites">',
      Object.keys(this._suiteResults).map(_printSuite).join('\n'),
    '</div>',
  ].join('\n')

  function _printSuite(testDir) {
    var testId = testDir.replace(/[^\w]/g, '_')
    var results = self._suiteResults[testDir]

    var packages = Object.create(null)
    Object.keys(results).forEach(function(testFile) {
      Object.keys(results[testFile]).forEach(function(pkg) {
        if (!packages[pkg]) {
          packages[pkg] = Object.create(null)
        }
        Object.keys(results[testFile][pkg]).forEach(function(version) {
          packages[pkg][version] = true
        })
      })
    })

    return [
      '<div id="' + testId + '" class="suite">',
        '<div class="row suite-name">' + testDir + '</div>',
        Object.keys(packages).map(function(pkg) {
          return _printTestPkg(testId, testDir, pkg, Object.keys(packages[pkg]))
        }).join('\n'),
      '</div>'
    ].join('\n')
  }

  function _printTestPkg(id, testDir, pkg, versions) {
    var pkgId = id + '-' + pkg
    var results = self._suiteResults[testDir]
    versions.sort(_versionSort)

    return [
      '<div id="' + pkgId + '" class="package">',
        '<div class="row results-title">' + pkg + '</div>',
        '<div class="row results-version">',
          '<div class="cell file-name"></div>',
          versions.map(function(version) {
            return '<div class="cell">' + version + '</div>'
          }).join(''),
        '</div>',

        Object.keys(results).sort().map(function(testFile) {
          return _printTestResults({
            id: pkgId,
            test: {
              directory: testDir,
              file: testFile
            },
            package: {
              name: pkg,
              versions: versions
            },
            results: results[testFile][pkg]
          })
        }).join('\n'),
      '</div>'
    ].join('')
  }

  function _printTestResults(opts) {
    var resId = opts.id + '-' + opts.test.file.replace(/[^\w]/g, '_')
    var fileName = opts.test.directory + '/' + opts.test.file

    return [
      '<div id="' + resId + '" class="row results">',
        '<div class="cell file-name">' + fileName + '</div>',
        opts.package.versions.map(function(version) {
          var result = opts.results[version] || {}
          var status = result.status || 'unknown'
          var statusIcon =
            result.status === 'success' ? '&#x2713;' :  // check
            result.status === 'failure' ? '&#x2717;' :  // X
            result.status === 'error'   ? '&#x203D;' :  // !?
                                          '&#x25CB;'    // circle

          return [
            '<div class="cell result ' + status + '">',
              '<span class="icon">' + statusIcon + '</span>',
              '<div class="output">',
                '<div class="stdout">' + _htmlEncode(result.stdout || 'n/a') + '</div>',
                '<div class="stderr">' + _htmlEncode(result.stderr || 'n/a') + '</div>',
              '</div>',
            '</div>'
          ].join('')
        }).join(''),
      '</div>'
    ].join('')
  }
}

HtmlPrinter.prototype._loadTemplates = function(cb) {
  var self = this
  if (!cb) {
    cb = function(err) {
      if (err) {
        console.error(err.stack) // eslint-disable-line no-console
      }
    }
  }
  a.mapValues({
    'main': './template/default/main.html',
    'style': './template/default/style.css',
    'script': './template/default/script.js',
  }, function(file, key, cb) {
    fs.readFile(path.resolve(__dirname, file), {encoding: 'utf8'}, function(err, data) {
      if (err && err.code === 'ENOENT') {
        return cb(null, '')
      }
      cb(err, data)
    })
  }, function(err, templates) {
    if (err) {
      return cb(err)
    }
    self._templates = templates
    cb()
  })
}

function _versionSort(a, b) {
  var aParts = a.split(/[^\d]+/g).map(function(n) {
    return parseInt(n, 10)
  })
  var bParts = b.split(/[^\d]+/g).map(function(n) {
    return parseInt(n, 10)
  })

  // Numerically compare each part of the version.
  if (aParts[0] !== bParts[0]) {
    return aParts[0] - bParts[0]
  } else if (aParts[1] !== bParts[1]) {
    return aParts[1] - bParts[1]
  } else if (aParts[2] !== bParts[2]) {
    return aParts[2] - bParts[2]
  }

  // If those are all the same, do a string comparison (possible tag difference)
  return (a > b) ? 1 : (a < b) ? -1 : 0
}

function _htmlEncode(str) {
  return str.replace(/[&<>]/g, function(c) {
    return '&#' + c.charCodeAt(0) + ';'
  })
}

module.exports = HtmlPrinter
