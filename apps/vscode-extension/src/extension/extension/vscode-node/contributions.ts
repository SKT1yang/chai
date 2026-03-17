import { IExtensionContributionFactory, asContributionFactory } from '../../common/contributions'
import { WebviewContribution } from '../../webview/vscode-node/WebviewContribution'

// ###################################################################################################
// ###                                                                                             ###
// ###                   Node contributions run ONLY in node.js extension host.                    ###
// ###                                                                                             ###
// ### !!! Prefer to list contributions in ../vscode/contributions.ts to support them anywhere !!! ###
// ###                                                                                             ###
// ###################################################################################################

export const vscodeNodeContributions: IExtensionContributionFactory[] = [asContributionFactory(WebviewContribution)]
