import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: '',
	build: {
		outDir: path.resolve(__dirname, '../dist/webview-ui'),
		emptyOutDir: true,
		rollupOptions: {
			output: {
				entryFileNames: 'assets/[name].js',
				chunkFileNames: 'assets/[name].js',
				assetFileNames: 'assets/[name].[ext]',
			},
		},
	},
	server: {
		hmr: {
			host: 'localhost',
			protocol: 'ws',
		},
		cors: {
			origin: '*',
			methods: '*',
			allowedHeaders: '*',
		},
	},
});
