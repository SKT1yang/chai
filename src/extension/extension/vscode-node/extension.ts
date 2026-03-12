import type { ExtensionContext } from 'vscode';
import { vscodeNodeContributions } from './contributions';
import { registerServices } from './services';
import { InstantiationServiceBuilder } from '../../../util/vs/instantiation/common/services';
import { ContributionCollection } from '../../common/contributions';

export async function activate(context: ExtensionContext) {
	const accessor = new InstantiationServiceBuilder();

	registerServices(accessor, context);

	const instantiationService = accessor.seal();
	context.subscriptions.push(instantiationService);

	await instantiationService.invokeFunction(async () => {
		const contributions = instantiationService.createInstance(ContributionCollection, vscodeNodeContributions);
		context.subscriptions.push(contributions);
		await contributions.waitForActivationBlockers();
	});
}
