module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],

  parserOptions: {
    ecmaVersion: 2020,
  },

  rules: {
    'max-len': ['error', { code: 150 }],
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
    'brace-style': ['error', 'stroustrup',  { 'allowSingleLine': true }],
    'import/prefer-default-export': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'object-curly-newline': ['error', {
      minProperties: Infinity,
      multiline: true,
      consistent: true,
    }],
    'linebreak-style': 'off',
    'no-param-reassign': 0,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'spaced-comment': ['error', 'always', {
      markers: ['#region', '#endregion'],
    }],
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
