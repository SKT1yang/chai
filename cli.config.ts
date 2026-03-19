import type { CliConfig } from '@shuiyangsuan/cli'

const cliConfig: CliConfig = {
	defaultPatterns: [
		'**/node_modules',
		'**/dist',
		'**/.turbo',
		'**/*.vsix',
		'**/.DS_Store',
		'**/*.tsbuildinfo',
		'**/.idea',
	],
	verbose: true,
}

export default cliConfig
