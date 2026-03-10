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
		const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'style.css'));
		return `<!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" type="text/css" href="${styleUri.toString()}">
        </head>
        <body>
          <h1>Hello from Webview View!</h1>
        </body>
      </html>`;
	}
}
