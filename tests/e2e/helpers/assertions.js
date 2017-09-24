const { assert } = require('chai')

function assertStdoutIncludes (expected) {
  return this.expect(({ stdout }) => {
    assert.include(stdout, expected)
  })
}

function assertStdoutEquals (expected) {
  return this.expect(({ stdout }) => {
    assert.equal(stdout, expected)
  })
}

module.exports = {
  assertStdoutEquals,
  assertStdoutIncludes,
}
