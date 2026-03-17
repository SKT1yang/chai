#!/usr/bin/env bun

import { $ } from 'bun';

console.log('🚀 Starting parallel build...');

try {
	// 并行运行两个任务
	await Promise.all([$`pnpm --filter chai compile`, $`pnpm --filter @chai/webview build`]);

	console.log('✅ Both compile and build completed. Running package step...');
	await $`pnpm --filter chai package`;
	console.log('🎉 Packaging succeeded!');
} catch (error) {
	console.error('❌ Build failed:', error);
	// 如果错误对象包含命令输出，可以打印更多信息
	if (error instanceof Error && 'stderr' in error) {
		console.error('stderr:', error.stderr?.toString());
	}
	process.exit(1);
}
