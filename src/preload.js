import Promise from 'promise-polyfill'

window.Promise = window.Promise || Promise

window.Config = require("../config/" + process.env.NODE_ENV)

Object.defineProperty(Array.prototype, 'chunk', {
  value: function(chunkSize) {
    var temporal = []
    for (var i = 0; i < this.length; i += chunkSize) {
      temporal.push(this.slice(i, i + chunkSize))
    }
    return temporal
  }
})
