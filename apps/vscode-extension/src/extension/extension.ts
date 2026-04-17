import type { ExtensionContext } from 'vscode'
import * as vscode from 'vscode'

import { SideBarWebviewViewProvider } from './webview/SideBarWebviewViewProvider'

export async function activate(context: ExtensionContext) {
	vscode.window.registerWebviewViewProvider('chai', new SideBarWebviewViewProvider(context))
}
