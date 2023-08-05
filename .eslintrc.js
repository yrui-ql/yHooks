module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'import/newline-after-import': ['error', { count: 1 }],
    semi: ['error', 'always', { omitLastInOneLineBlock: true }],
    'arrow-parens': ['error', 'as-needed'],
  },
};
