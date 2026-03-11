import { ILogService } from '../../../platform/log/common/logService';
import { DisposableStore, IDisposable } from '../../../util/vs/base/common/lifecycle';

export class RemoteAgentContribution implements IDisposable {
	private disposables = new DisposableStore();

	constructor(@ILogService private readonly logService: ILogService) {}

	dispose() {
		this.disposables.dispose();
	}

	hello() {
		this.logService.error('111', 'Failed to fetch info about current GitHub repository');
	}
}
