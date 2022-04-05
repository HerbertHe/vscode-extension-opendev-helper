import * as vscode from "vscode"

export function activate(context: vscode.ExtensionContext) {
    console.log(
        'Congratulations, your extension "opendev-helper" is now active!'
    )

    // 注册指令
    context.subscriptions.push(
        vscode.commands.registerCommand("opendev-helper.helloWorld", () => {
            vscode.window.showInformationMessage(
                "Hello World from opendev-helper!"
            )
        })
    )
}

export function deactivate() {}
