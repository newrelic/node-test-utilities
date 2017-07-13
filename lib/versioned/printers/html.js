'use strict'

var TestPrinter = require('./printer')

function HtmlPrinter(tests, opts) {
  TestPrinter.call(this, tests, opts)

  this._htmlFile = opts.fileName || 'out.html'
}

HtmlPrinter.prototype.maybePrint = function() {
}

HtmlPrinter.prototype.update = function(test, status) {
}

HtmlPrinter.prototype.print = function() {
}

HtmlPrinter.prototype.end = function() {
  TestPrinter.prototype.end.apply(this, arguments)
}

module.exports = HtmlPrinter
