import axios from 'axios'
import type { ExtensionContext } from 'vscode'
import * as vscode from 'vscode'

import { getNonce } from './getNonce'

export class SideBarWebviewViewProvider implements vscode.WebviewViewProvider {
	private readonly extensionContext: ExtensionContext

	constructor(extensionContext: ExtensionContext) {
		this.extensionContext = extensionContext
	}

	public async resolveWebviewView(
		webviewView: vscode.WebviewView,
		// context: vscode.WebviewViewResolveContext,
		// token: vscode.CancellationToken,
	) {
		// 配置 Webview 选项
		webviewView.webview.options = {
			enableScripts: true, // 允许 JavaScript
			localResourceRoots: [this.extensionContext.extensionUri], // 允许加载扩展内的本地资源
		}

		// 设置 HTML 内容（可以从文件读取或直接写字符串）
		webviewView.webview.html =
			this.extensionContext.extensionMode === vscode.ExtensionMode.Development
				? await this.getHMRHtmlContent(webviewView.webview)
				: this.getHtmlContent(webviewView.webview)

		await this.getHMRHtmlContent(webviewView.webview)
	}

	private getHtmlContent(webview: vscode.Webview): string {
		// 获取 webview-ui 构建文件的 URI
		const scriptUri = webview.asWebviewUri(
			vscode.Uri.joinPath(this.extensionContext.extensionUri, 'dist', 'webview-ui', 'assets', 'index.js'),
		)
		const styleUri = webview.asWebviewUri(
			vscode.Uri.joinPath(this.extensionContext.extensionUri, 'dist', 'webview-ui', 'assets', 'index.css'),
		)

		// 设置 Content Security Policy
		const cspSource = webview.cspSource
		const contentSecurityPolicy = `
			default-src 'none';
			style-src ${cspSource} 'unsafe-inline';
			script-src ${cspSource} 'unsafe-inline';
			font-src ${cspSource};
			img-src ${cspSource} https:;
		`

		return `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Security-Policy" content="${contentSecurityPolicy}">
          <link rel="stylesheet" type="text/css" href="${styleUri.toString()}">
          <title>Chai</title>
        </head>
        <body>
          <div id="root"></div>
          <script type="module" src="${scriptUri.toString()}"></script>
        </body>
      </html>`
	}

	private async getHMRHtmlContent(webview: vscode.Webview): Promise<string> {
		let localPort = '5173'
		let protocol = 'http'
		const localServerUrl = `${protocol}://localhost:${localPort}`

		// Check if local dev server is running.
		try {
			await axios.get(`${localServerUrl}`)
		} catch (error) {
			vscode.window.showErrorMessage('[error] Local dev server not running' + JSON.stringify(error))
			return this.getHtmlContent(webview)
		}

		const nonce = getNonce()
		const scriptUri = `${localServerUrl}/src/main.tsx`
		const stylesUri = `${localServerUrl}/src/index.css`

		const reactRefresh = /*html*/ `
			<script nonce="${nonce}" type="module">
				import RefreshRuntime from "http://localhost:${localPort}/@react-refresh"
				RefreshRuntime.injectIntoGlobalHook(window)
				window.$RefreshReg$ = () => {}
				window.$RefreshSig$ = () => (type) => type
				window.__vite_plugin_react_preamble_installed__ = true
			</script>
		`

		const csp = [
			"default-src 'none'",
			`font-src ${webview.cspSource} data:`,
			`style-src ${webview.cspSource} 'unsafe-inline' https://* ${localServerUrl} http://0.0.0.0:${localPort}`,
			`media-src ${webview.cspSource}`,
			`script-src 'unsafe-eval' 'unsafe-inline' ${webview.cspSource} https://* https://*.posthog.com ${localServerUrl} http://0.0.0.0:${localPort} 'nonce-${nonce}'`,
			`connect-src ${webview.cspSource} https://* ${localServerUrl.replace('http', 'ws')} ws://localhost:${localPort} wss://localhost:${localPort}`,
		]

		return /*html*/ `
			<!DOCTYPE html>
			<html lang="en">
				<head>
					<meta charset="utf-8">
					<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
					<meta http-equiv="Content-Security-Policy" content="${csp.join('; ')}">
					<link rel="stylesheet" type="text/css" href="${stylesUri.toString()}">
					<title>Chai</title>
				</head>
				<body>
					<div id="root"></div>
					${reactRefresh}
					<script type="module" src="${scriptUri}"></script>
				</body>
			</html>
		`
	}
}
