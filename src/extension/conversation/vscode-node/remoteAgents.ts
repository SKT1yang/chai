import { DisposableStore, IDisposable } from '../../../util/vs/base/common/lifecycle';

export class RemoteAgentContribution implements IDisposable {
	private disposables = new DisposableStore();

	constructor() {}

	dispose() {
		this.disposables.dispose();
	}
}
