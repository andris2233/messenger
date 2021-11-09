module.exports = {
  rules: {
    'max-len': ['error', { code: 150 }],
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
    'import/prefer-default-export': 'off',
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
};
