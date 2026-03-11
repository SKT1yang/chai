import type { ExtensionContext } from 'vscode';
import * as vscode from 'vscode';
import { ChaiWebviewViewProvider } from '../../webview/vscode/ChaiWebviewViewProvider';
import { vscodeNodeContributions } from './contributions';
import { registerServices } from './services';
import { InstantiationServiceBuilder } from '../../../util/vs/instantiation/common/services';
import { ContributionCollection } from '../../common/contributions';

export async function activate(context: ExtensionContext) {
	const accessor = new InstantiationServiceBuilder();

	registerServices(accessor, context);

	const instantiationService = accessor.seal();
	context.subscriptions.push(instantiationService);

	const provider = new ChaiWebviewViewProvider(context.extensionUri);

	context.subscriptions.push(vscode.window.registerWebviewViewProvider('chai', provider));

	await instantiationService.invokeFunction(async () => {
		const contributions = instantiationService.createInstance(ContributionCollection, vscodeNodeContributions);
		context.subscriptions.push(contributions);
		await contributions.waitForActivationBlockers();
	});
}
