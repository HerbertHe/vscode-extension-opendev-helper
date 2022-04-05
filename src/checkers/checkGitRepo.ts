import * as fs from "fs"
import * as path from "path"
import * as vscode from "vscode"

/**
 * Check if current workspace is a git repo
 * @returns
 */
export function checkIsGitRepo() {
    const current_workspace_folder =
        vscode.workspace.workspaceFolders?.[0]?.uri?.fsPath
    if (
        !!current_workspace_folder &&
        fs.existsSync(path.join(current_workspace_folder, ".git"))
    ) {
        return [true, current_workspace_folder]
    }

    return [false, current_workspace_folder]
}
