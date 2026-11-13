import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import stylistic from '@stylistic/eslint-plugin';
import prettierConfig from 'eslint-config-prettier/flat';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';

/** ESLint rules shared by application code, configuration, and tests. */
const eslintConfig = defineConfig([
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'simple-import-sort': simpleImportSortPlugin,
    },
    settings: { react: { version: '19' } },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  ...nextVitals,
  ...nextTs,
  stylistic.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  reactHooksPlugin.configs.flat.recommended,
  prettierConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always', { omitLastInOneLineBlock: true }],
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': ['error', { before: false, after: true }],
      'constructor-super': 'error',
      'eol-last': ['error', 'always'],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'keyword-spacing': ['error', { before: true, after: true }],
      'space-infix-ops': ['error', { int32Hint: false }],
      curly: ['error', 'all'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'spaced-comment': ['error', 'always', { markers: ['/'] }],
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
      'no-unused-vars': 'off',
      'no-underscore-dangle': 'off',
      'one-var': ['error', 'never'],
      eqeqeq: 'warn',
      'newline-after-var': ['error', 'always'],

      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: '*',
        },
        {
          blankLine: 'any',
          prev: ['import', 'export'],
          next: ['import', 'export'],
        },
        {
          blankLine: 'any',
          prev: ['var', 'let', 'const', 'using'],
          next: ['var', 'let', 'const', 'using'],
        },
        {
          blankLine: 'any',
          prev: 'expression',
          next: 'expression',
        },
        {
          blankLine: 'any',
          prev: 'expression',
          next: 'return',
        },
      ],

      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/no-unresolved': 'off',
      'import/consistent-type-specifier-style': ['warn', 'prefer-inline'],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
          disallowTypeAnnotations: false,
        },
      ],

      'no-restricted-exports': [
        'error',
        {
          restrictDefaultExports: {
            direct: true,
            named: true,
            defaultFrom: true,
            namedFrom: true,
            namespaceFrom: true,
          },
        },
      ],

      '@typescript-eslint/method-signature-style': 'warn',
      '@typescript-eslint/non-nullable-type-assertion-style': 'off',
      '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-unknown-property': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  {
    files: ['app/**/*.{js,jsx,ts,tsx}', '*.config.{js,ts,mjs,mts,cjs,cts,jsx,tsx}'],
    rules: {
      'no-restricted-exports': 'off',
      '@stylistic/padding-line-between-statements': 'off',
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unnecessary-type-arguments': 'off',
    },
  },
  globalIgnores(['.next/**', '.output/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
