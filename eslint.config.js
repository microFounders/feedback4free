import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        // Ignore dist directory and node_modules
        ignores: ['dist/**', 'node_modules/**'],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.es2021,
                ...globals.node,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            // React Hooks rules
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // React Refresh rules
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],

            // TypeScript rules
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': ['warn', {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            }],

            // General rules
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'prefer-const': 'warn',
            'no-var': 'error',
        },
    },
    {
        // Apply these rules only to TypeScript files
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            // TypeScript-specific rules
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
        },
    },
    {
        // Apply these rules only to test files
        files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
        rules: {
            // Relax certain rules for test files
            'no-console': 'off',
        },
    },
);
