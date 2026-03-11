import * as vscode from 'vscode';

export class ChaiWebviewViewProvider implements vscode.WebviewViewProvider {
	constructor(private readonly _extensionUri: vscode.Uri) {}

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		// context: vscode.WebviewViewResolveContext,
		// token: vscode.CancellationToken,
	) {
		// 配置 Webview 选项
		webviewView.webview.options = {
			enableScripts: true, // 允许 JavaScript
			localResourceRoots: [this._extensionUri], // 允许加载扩展内的本地资源
		};

		// 设置 HTML 内容（可以从文件读取或直接写字符串）
		webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
	}

	private _getHtmlForWebview(webview: vscode.Webview): string {
		// 获取 webview-ui 构建文件的 URI
		const scriptUri = webview.asWebviewUri(
			vscode.Uri.joinPath(this._extensionUri, 'dist', 'webview-ui', 'assets', 'index.js'),
		);
		const styleUri = webview.asWebviewUri(
			vscode.Uri.joinPath(this._extensionUri, 'dist', 'webview-ui', 'assets', 'index.css'),
		);

		// 设置 Content Security Policy
		const cspSource = webview.cspSource;
		const contentSecurityPolicy = `
			default-src 'none';
			style-src ${cspSource} 'unsafe-inline';
			script-src ${cspSource} 'unsafe-inline';
			font-src ${cspSource};
			img-src ${cspSource} https:;
		`;

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
      </html>`;
	}
}
