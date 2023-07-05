module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:react/jsx-runtime'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        eqeqeq: ['error', 'always'],
        'no-duplicate-imports': 'error',
        'react/jsx-key': ['error'],
        'react/sort-comp': ['error'],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': [
          'error',
          {functions: false, classes: false},
        ],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          2,
          {argsIgnorePattern: '^_', args: 'after-used'},
        ],
      },
    },
  ],
  ignorePatterns: ['node_modules'],
};
