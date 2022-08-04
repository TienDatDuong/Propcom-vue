module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',  // https://github.com/vuejs/eslint-plugin-vue/issues/811
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    'parser': '@typescript-eslint/parser',
    'ecmaVersion': 2020
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'indent': ['warn', 2, { 'SwitchCase': 1 }],
    'no-else-return': ['warn'],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    'semi': [2, 'always'],
    'quotes': [2, 'single', { 'avoidEscape': true }],
    'curly': ['error']
  },
  overrides: [
    {
      'files': [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      'env': {
        'mocha': true
      }
    }
  ]
};
