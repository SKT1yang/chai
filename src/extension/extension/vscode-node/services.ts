import { ExtensionContext } from 'vscode';
import { IInstantiationServiceBuilder } from '../../../util/vs/instantiation/common/services';
import { SyncDescriptor } from '../../../util/vs/instantiation/common/descriptors';
import { ILogService, LogServiceImpl } from '../../../platform/log/common/logService';
import { NewOutputChannelLogTarget } from '../../../platform/log/vscode/outputChannelLogTarget';
import { IVSCodeExtensionContext } from '../../../platform/extContext/common/extensionContext';

// ###########################################################################################
// ###                                                                                     ###
// ###               Node services that run ONLY in node.js extension host.                ###
// ###                                                                                     ###
// ###  !!! Prefer to list services in ../vscode/services.ts to support them anywhere !!!  ###
// ###                                                                                     ###
// ###########################################################################################

export function registerServices(builder: IInstantiationServiceBuilder, extensionContext: ExtensionContext): void {
	builder.define(
		ILogService,
		new SyncDescriptor(LogServiceImpl, [[new NewOutputChannelLogTarget(extensionContext)]]),
	);

	builder.define(IVSCodeExtensionContext, <any>/*force _serviceBrand*/ extensionContext);
}
