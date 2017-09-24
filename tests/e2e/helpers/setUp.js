const path = require('path')
const Preferences = require('preferences')
const { CLI_PREFERENCES_FILE } = require('../../../lib/config')

function mockHomeDirectory () {
  process.env.HOME = path.dirname(__dirname) + '/.temp'
}

function forceUserLogin (username, password) {
  const email = username || 'organizze-cli@mailinator.com'
  const apiKey = password || 'e885145670bb089e162576b9ed80193dd0245556'
  const credentials = `${email}:${apiKey}`
  const accessToken = Buffer.alloc(credentials.length, credentials).toString('base64')
  const preferences = new Preferences(CLI_PREFERENCES_FILE, {
    credentials: { accessToken },
  })

  return preferences.credentials.accessToken
}

module.exports = {
  mockHomeDirectory,
  forceUserLogin,
}
