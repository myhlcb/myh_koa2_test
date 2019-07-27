module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'arrow-parens': [2, 'always'],
    'implicit-arrow-linebreak': ['error', 'beside'],
    'implicit-arrow-linebreak': 0,
    'function-paren-newline': 0,
    'no-underscore-dangle': 0,
    'new-cap': 0,
    'no-mixed-operators': 0,
    'no-param-reassign': 0,
    'no-unused-expressions': 0,
    'func-names': 0,
    'import/no-dynamic-require': 0,
  },
};
