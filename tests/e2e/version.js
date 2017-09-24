const organizze = require('./helpers/organizze')
const { CLI_VERSION } = require('../../lib/config')

describe('$ organizze --version', () => {
  it('show the current CLI version', (done) => {
    organizze()
      .run('--version')
      .stdout(CLI_VERSION)
      .end(done)
  })
})
