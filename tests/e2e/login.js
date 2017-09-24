const { assert } = require('chai')
const Preferences = require('preferences')

const organizze = require('./helpers/organizze')
const { mockHomeDirectory } = require('./helpers/setUp')
const { CLI_PREFERENCES_FILE } = require('../../lib/config')
const { cleanUpHomeDirectory } = require('./helpers/tearDown')

const email = 'organizze-cli@mailinator.com'
const apiKey = 'e885145670bb089e162576b9ed80193dd0245556'

describe('$ organizze login', () => {
  beforeEach((done) => {
    mockHomeDirectory()
    cleanUpHomeDirectory(done)
  })

  describe('without e-mail', () => {
    it('should respond with error message', (done) => {
      organizze()
        .assertStdoutIncludes('? E-mail: >> This field is required')
        .run('login')
        .on('? E-mail: ').respond('\n')
        .end(done)
    })
  })

  describe('without API key', () => {
    it('should respond with error message', (done) => {
      organizze()
        .assertStdoutIncludes('? API Key: [input is hidden] >> This field is required, you can find it at https://app.organizze.com.br/configuracoes/api-keys')
        .run('login')
        .on('? E-mail: ').respond(`${email}\n`)
        .on('? API Key: [input is hidden] ').respond('\n')
        .end(done)
    })
  })

  describe('with invalid e-mail or API key', () => {
    it('should respond with error message', (done) => {
      organizze()
        .assertStdoutIncludes('Invalid credentials, please make sure you have an account at https://organizze.com.br with thoses credentials.')
        .run('login')
        .on('? E-mail: ').respond(`${email}\n`)
        .on('? API Key: [input is hidden] ').respond('api_key_123\n')
        .end(done)
    })
  })

  describe('with valid e-mail and API key', () => {
    it('should greet the user with his name', (done) => {
      organizze()
        .assertStdoutIncludes("You've successfully log in, welcome Organizze CLI!")
        .run('login')
        .on('? E-mail: ').respond(`${email}\n`)
        .on('? API Key: [input is hidden] ').respond(`${apiKey}\n`)
        .end(done)
    })

    it('should store the user access token under a preferences file', (done) => {
      organizze()
        .expect(({ stdout }) => {
          const credentials = `${email}:${apiKey}`
          const preferences = new Preferences(CLI_PREFERENCES_FILE)
          const accessToken = Buffer.alloc(credentials.length, credentials).toString('base64')
          return assert.nestedPropertyVal(preferences, 'credentials.accessToken', accessToken)
        })
        .run('login')
        .on('? E-mail: ').respond(`${email}\n`)
        .on('? API Key: [input is hidden] ').respond(`${apiKey}\n`)
        .end(done)
    })
  })
})
