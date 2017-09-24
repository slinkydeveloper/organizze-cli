const rimraf = require('rimraf')

function cleanUpHomeDirectory (done) {
  rimraf(process.env.HOME, { disableGlob: false }, (error) => {
    if (error) {
      throw error
    }

    done()
  })
}

module.exports = {
  cleanUpHomeDirectory,
}
