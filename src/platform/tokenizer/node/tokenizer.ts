import { createDecorator as createServiceIdentifier } from '../../../util/vs/instantiation/common/instantiation';

export const ITokenizerProvider = createServiceIdentifier<ITokenizerProvider>('ITokenizerProvider');

export interface ITokenizerProvider {
	readonly _serviceBrand: undefined;
}

export class TokenizerProvider implements ITokenizerProvider {
	readonly _serviceBrand: undefined;
}
