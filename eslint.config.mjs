import storybook from 'eslint-plugin-storybook';

import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...storybook.configs['flat/recommended'],
  {
    rules: {
      semi: ['error', 'always'],
      'semi-spacing': ['error', { before: false, after: true }],
      'prefer-const': 'error',
      'no-undef': 'error',
    },
  },
];

export default eslintConfig;
