import { createDecorator as createServiceIdentifier } from '../../../util/vs/instantiation/common/instantiation';

export const IDiffService = createServiceIdentifier<IDiffService>('IDiffService');

export interface IDiffService {
	readonly _serviceBrand: undefined;
}

export class DiffServiceImpl implements IDiffService {
	declare readonly _serviceBrand: undefined;
}
