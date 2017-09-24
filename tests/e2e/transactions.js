const {
  cleanUpHomeDirectory,
  getOrganizzeCLI,
  setHomeDirectory,
} = require('./helpers')

describe('$ organizze transactions', () => {
  beforeEach(setHomeDirectory)
  afterEach(cleanUpHomeDirectory)

  describe('if not authenticated', () => {
    it('should respond with an error message', (done) => {
      getOrganizzeCLI()
        .run('--version')
        .stdout('0.2.0')
        .end(done)
    })
  })
})
