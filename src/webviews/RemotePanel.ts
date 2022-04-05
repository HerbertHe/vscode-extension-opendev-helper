import * as vscode from "vscode"

const getWebviewContent = (title: string, url: string) => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        * {
            box-sizing: border-box;
        }

        html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100vh;
        }

        iframe {
            height: 100vh;
            width: 100%;
        }
    </style>
</head>
<body>
<iframe src="${url}" frameborder="0"></iframe>
</body>
</html>
    `
}

/**
 * Open Remote Page
 * @param title
 * @param url
 * @returns
 */
export const RemotePanel = (title: string, url: string) => {
    const panel = vscode.window.createWebviewPanel(
        "remoteView",
        title,
        vscode.ViewColumn.Three
    )

    panel.webview.html = getWebviewContent(title, url)

    return panel
}
