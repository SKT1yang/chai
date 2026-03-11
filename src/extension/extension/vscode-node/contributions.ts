import { IExtensionContributionFactory, asContributionFactory } from '../../common/contributions';
import { RemoteAgentContribution } from '../../conversation/vscode-node/remoteAgents';

// ###################################################################################################
// ###                                                                                             ###
// ###                   Node contributions run ONLY in node.js extension host.                    ###
// ###                                                                                             ###
// ### !!! Prefer to list contributions in ../vscode/contributions.ts to support them anywhere !!! ###
// ###                                                                                             ###
// ###################################################################################################

export const vscodeNodeContributions: IExtensionContributionFactory[] = [
	asContributionFactory(RemoteAgentContribution),
];
