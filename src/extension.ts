import type { ExtensionContext } from "vscode";
import * as vscode from "vscode";
import { ChaiWebviewViewProvider } from "./ChaiWebviewViewProvider";

export async function activate(context: ExtensionContext) {
  const provider = new ChaiWebviewViewProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("chai-activityBar", provider),
  );
}
