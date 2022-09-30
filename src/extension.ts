// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import * as path from 'path'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	/* future TODOs:
	* - install a particular Herbie version via git tag
	* - show installation info in the Terminal API https://stackoverflow.com/questions/43007267/how-to-run-a-system-command-from-vscode-extension
	* - check for version updates on load
	* - start the Herbie server
	*/

	// for now, assume the Herbie server is running already at localhost 8000

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "interactive-herbie" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('interactive-herbie.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Herbie!!!');
	});

	context.subscriptions.push(disposable);

	// TODO show that we can connect to the server and get a response (let's try a webview of the index)

	let disposable1 = vscode.commands.registerCommand('interactive-herbie.webViewTest', () => {
		
		// Create and show a new webview
		const panel = vscode.window.createWebviewPanel(
			'herbieIndex', // Identifies the type of the webview. Used internally
			'webViewTest Title', // Title of the panel displayed to the user
			vscode.ViewColumn.One, // Editor column to show the new webview panel in.
			{
				// Enable scripts in the webview
				enableScripts: true,
				// Only allow the webview to access resources in these directories
				localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'out'))]
			}
		)
		
		// And set its HTML content
		panel.webview.html = `<!DOCTYPE html>
				<html lang="en">
				<head>
						<meta charset="UTF-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">

						<meta
							http-equiv="Content-Security-Policy"
							content="default-src 'none'; img-src ${panel.webview.cspSource} https:; script-src ${panel.webview.cspSource} 'unsafe-eval'; style-src ${panel.webview.cspSource} 'unsafe-inline';"
						/>

						<script src="${panel.webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, 'out', 'webview', 'index.js')))}" type="module"></script>
						<title>Interactive Herbie</title>
				</head>
				<body>
						
						<div id="app"></div>
				</body>
				</html>`

		vscode.window.showInformationMessage('Created WebView.');
	});

	context.subscriptions.push(disposable1);
}


// this method is called when your extension is deactivated
export function deactivate() {}
