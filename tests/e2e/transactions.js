const organizze = require('./helpers/organizze')
const { cleanUpHomeDirectory } = require('./helpers/tearDown')
const {
  forceUserLogin,
  mockHomeDirectory,
} = require('./helpers/setUp')

describe.only('$ organizze transactions', () => {
  beforeEach((done) => {
    mockHomeDirectory()
    cleanUpHomeDirectory(done)
  })

  describe('if not authenticated', () => {
    it('should show an error message', (done) => {
      organizze()
        .assertStdoutEquals("You're not authenticated yet, please login by typing 'organizze login'.")
        .run('transactions')
        .end(done)
    })
  })

  describe('if authenticated but with wrong credentials', () => {
    it('should show an error message', (done) => {
      organizze()
        .before(() => {
          forceUserLogin('hello@example.com', 'api_key_example')
        })
        .assertStdoutEquals("Invalid credentials, please login by typing 'organizze login'.")
        .run('transactions')
        .end(done)
    })
  })

  describe('if authenticated', () => {
    it('show a table with all of the todays transactions', (done) => {
      organizze()
        .before(() => forceUserLogin)
        .assertStdoutEquals('Olar')
        .run('transactions')
        .end(done)
    })
  })
})
