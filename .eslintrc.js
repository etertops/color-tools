module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['prettier', 'plugin:prettier/recommended', 'standard-with-typescript'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/space-before-function-paren': 0,
    '@typescript-eslint/restrict-template-expressions': 0
  }
}
