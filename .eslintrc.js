module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // 0 -> off, 1 -> warn, 2 -> error
    'no-shadow': 0,
    'max-len': 0,
    'no-plusplus': 0,
    'no-bitwise': 0,
    'no-continue': 0,
    'no-restricted-syntax': 0,
    'no-use-before-define': 0,
    'no-unused-expressions': 0,
    'prefer-rest-params': 0,
    
    '@typescript-eslint/no-shadow': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-this-alias': 0
  }
}
