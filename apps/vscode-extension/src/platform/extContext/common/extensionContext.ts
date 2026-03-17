import type { ExtensionContext } from 'vscode'

import { createDecorator as createServiceIdentifier } from '../../../util/vs/instantiation/common/instantiation'

export const IVSCodeExtensionContext = createServiceIdentifier<IVSCodeExtensionContext>('IVSCodeExtensionContext')

export interface IVSCodeExtensionContext extends ExtensionContext {
	readonly _serviceBrand: undefined
}
