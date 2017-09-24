const nixt = require('nixt')

const assertions = require('./assertions')
const { CLI_BIN } = require('../../../lib/config')

function organizze () {
  const options = {
    colors: false,
    newlines: false,
  }

  nixt.register(assertions)

  return nixt(options)
    .base(CLI_BIN + ' ')
    .env('HOME', process.env.HOME)
}

module.exports = organizze
