import { DiffServiceImpl, IDiffService } from '../../../platform/diff/node/diffServiceImpl';
import { ITokenizerProvider, TokenizerProvider } from '../../../platform/tokenizer/node/tokenizer';
import { IInstantiationServiceBuilder } from '../../../util/vs/instantiation/common/services';
import { SyncDescriptor } from '../../../util/vs/instantiation/common/descriptors';

// ###########################################################################################
// ###                                                                                     ###
// ###               Node services that run ONLY in node.js extension host.                ###
// ###                                                                                     ###
// ###  !!! Prefer to list services in ../vscode/services.ts to support them anywhere !!!  ###
// ###                                                                                     ###
// ###########################################################################################

export function registerServices(builder: IInstantiationServiceBuilder): void {
	builder.define(IDiffService, new DiffServiceImpl());
	builder.define(ITokenizerProvider, new SyncDescriptor(TokenizerProvider, [true]));
}
