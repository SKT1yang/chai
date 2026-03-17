import { defineConfig, type RolldownOptions } from 'rolldown';

const input: RolldownOptions['input'] = ['src/extension/extension/vscode-node/extension.ts'];

const output: RolldownOptions['output'] = {
	sourcemap: true,
	format: 'cjs',
	banner: `"use strict";\n`,
	minify: false,
	cleanDir: true,
	file: 'dist/main.js',
};

export default defineConfig({
	input,
	output,
	external: ['vscode'],
	platform: 'node',
	transform: {
		target: 'node16',
	},
});
