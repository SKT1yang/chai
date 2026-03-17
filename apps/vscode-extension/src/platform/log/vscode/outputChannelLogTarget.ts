import { ExtensionContext, LogLevel, OutputChannel, window } from 'vscode';
import { ILogTarget } from '../common/logService';

export let outputChannel: OutputChannel;

export const OutputChannelName = 'Chai';

export class NewOutputChannelLogTarget implements ILogTarget {
	private readonly _outputChannel = window.createOutputChannel(OutputChannelName, { log: true });

	constructor(extensionContext: ExtensionContext) {
		outputChannel = this._outputChannel;
		extensionContext.subscriptions.push(this._outputChannel);
	}

	logIt(level: LogLevel, metadataStr: string) {
		switch (level) {
			case LogLevel.Trace:
				this._outputChannel.trace(metadataStr);
				break;
			case LogLevel.Debug:
				this._outputChannel.debug(metadataStr);
				break;
			case LogLevel.Info:
				this._outputChannel.info(metadataStr);
				break;
			case LogLevel.Warning:
				this._outputChannel.warn(metadataStr);
				break;
			case LogLevel.Error:
				this._outputChannel.error(metadataStr);
				break;
		}
	}

	show(preserveFocus?: boolean): void {
		this._outputChannel.show(preserveFocus);
	}
}
