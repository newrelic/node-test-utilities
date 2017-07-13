'use strict'

var TestPrinter = require('./printer')

function MultiPrinter(tests, opts) {
  TestPrinter.call(this, tests, opts)
  this._printers = []
  for (var i = 0; i < opts.printers.length; ++i) {
    var Printer = opts.printers[i]
    var printer = new Printer(tests, opts)
    clearInterval(printer.interval)
    printer.interval = null

    this._printers.push(printer)
  }
}

MultiPrinter.prototype.maybePrint = function() {
  _callEachPrinter(this._printers, 'maybePrint')
}

MultiPrinter.prototype.end = function() {
  TestPrinter.prototype.end.apply(this, arguments)
  _callEachPrinter(this._printers, 'end')
}

MultiPrinter.prototype.update = function(test, status) {
  _callEachPrinter(this._printers, 'update', [test, status])
}

MultiPrinter.prototype.print = function() {
  _callEachPrinter(this._printers, 'print')
}

function _callEachPrinter(printers, method, args) {
  for (var i = 0; i < printers.length; ++i) {
    printers[i][method].apply(printers[i], args || [])
  }
}

module.exports = MultiPrinter
