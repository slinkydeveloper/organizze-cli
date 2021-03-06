module.exports = {
  extends: 'standard',
  env: {
    node: true,
    mocha: true
  },
  rules: {
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      }
    ]
  }
}
