const js = require('@eslint/js')
const typescriptPlugin = require('@typescript-eslint/eslint-plugin')
const typescriptParser = require('@typescript-eslint/parser')
const astroPlugin = require('eslint-plugin-astro')
const astroParser = require('astro-eslint-parser')
const globals = require('globals')

module.exports = [
  {
    ignores: ['.astro/**', 'dist/**', 'node_modules/**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      'no-undef': 'off', // TypeScript handles this
    },
  },
  {
    files: ['**/*.cjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['**/*.astro'],
    plugins: {
      astro: astroPlugin,
    },
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: typescriptParser,
        extraFileExtensions: ['.astro'],
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...astroPlugin.configs.recommended.rules,
      'no-undef': 'off',
      'no-useless-escape': 'off',
    },
  },
]