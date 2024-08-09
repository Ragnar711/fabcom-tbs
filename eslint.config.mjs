import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const compat = new FlatCompat({
    baseDirectory: dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    ...compat.extends(
        'eslint:recommended',
        'prettier',
        'plugin:@typescript-eslint/recommended'
    ),
    {
        plugins: {
            '@typescript-eslint': typescriptEslint,
        },

        languageOptions: {
            globals: {
                ...globals.node,
            },

            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'commonjs',
        },

        rules: {
            semi: ['warn', 'always'],

            'no-console': [
                'error',
                {
                    allow: ['warn', 'error'],
                },
            ],

            'no-unused-vars': 'warn',
            'no-var': 'off',
            'prefer-const': 'warn',
            '@typescript-eslint/no-non-null-assertion': 'off',
        },
    },
    {
        files: ['**/*.test.ts'],

        rules: {
            'no-undef': ['off'],
            '@typescript-eslint/ban-ts-comment': 'off',
        },
    },
];
