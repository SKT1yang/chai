import type { CliConfig } from '@shuiyangsuan/cli';

const cliConfig: CliConfig = {
	defaultPatterns: ['**/node_modules', '**/dist', '**/.turbo', '**/*.vsix', '**/.DS_Store'],
	verbose: true,
};

export default cliConfig;
