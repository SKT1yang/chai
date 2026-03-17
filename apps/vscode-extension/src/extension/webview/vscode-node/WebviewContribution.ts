import vscode from 'vscode'

import { IVSCodeExtensionContext } from '../../../platform/extContext/common/extensionContext'
import { Disposable } from '../../../util/vs/base/common/lifecycle'
import { IExtensionContribution } from '../../common/contributions'
import { SideBarWebviewViewProvider } from './SideBarWebviewViewProvider'

export class WebviewContribution extends Disposable implements IExtensionContribution {
	readonly id = 'webview'

	constructor(@IVSCodeExtensionContext private readonly _extensionContext: IVSCodeExtensionContext) {
		super()
		let provider = new SideBarWebviewViewProvider(this._extensionContext)
		this._register(vscode.window.registerWebviewViewProvider('chai', provider))
	}
}
