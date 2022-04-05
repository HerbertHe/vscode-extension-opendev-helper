import * as vscode from "vscode"
import { checkGitRemoteURLs } from "./checkers/checkGitRemoteURLs"
import { RemotePanel } from "./webviews/RemotePanel"

export function activate(context: vscode.ExtensionContext) {
    console.log(
        'Congratulations, your extension "opendev-helper" is now active!'
    )

    checkGitRemoteURLs().then((res) => console.log(res))

    // 注册指令
    context.subscriptions.push(
        vscode.commands.registerCommand("opendev-helper.helloWorld", () => {
            // vscode.window.showInformationMessage(
            //     "Hello World from opendev-helper!"
            // )
            RemotePanel("测试", "https://github.com")
        })
    )
}

export function deactivate() {}
