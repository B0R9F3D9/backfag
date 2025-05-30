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
	{
		ignores: ['node_modules', 'out', '.next', 'public'],
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
			],
			'@typescript-eslint/consistent-type-imports': 'error',
			'@typescript-eslint/no-explicit-any': 'off',
			'react-hooks/exhaustive-deps': 'off',
		},
	},
];

export default eslintConfig;
