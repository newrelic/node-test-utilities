/* eslint-disable strict, max-nested-callbacks */
setTimeout(function() {
  'use strict'

  function s(ctx, selector) {
    if (selector == null) {
      // s(selector)
      selector = ctx
      ctx = document
    }

    return ctx.querySelectorAll(selector)
  }

  function sEach(ctx, selector, func) {
    if (func == null) {
      // sEach(selector, func)
      func = selector
      selector = ctx
      ctx = document
    }

    var selection = s(ctx, selector)
    selection.forEach(func)
    return selection
  }

  sEach('.cell.result', function(cell) {
    cell.addEventListener('click', function() {
      if (cell.classList.contains('selected')) {
        cell.classList.remove('selected')
        return
      }

      sEach('.cell.result.selected', function(selected) {
        selected.classList.remove('selected')
      })
      cell.classList.add('selected')
    })
  })
}, 100)
