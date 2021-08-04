/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';
import loadImages from "./load-itk-image";
import {ipcRenderer} from "electron";

console.log('👋 This message is being logged by "renderer.js", included via webpack');

const directoryButton: HTMLButtonElement = document.querySelector("#openDirectoryButton");
const directoryLabel: HTMLElement = document.querySelector("#directoryLabel");
const resultsEl: HTMLElement = document.querySelector("#results");

directoryButton.addEventListener("click", () => {
    const result = ipcRenderer.sendSync("showOpenDialog", {properties: ["openDirectory"]});
    if (result.canceled) return;
    resultsEl.innerText = "";
    resultsEl.style.color = undefined;
    const directory = result.filePaths[0];

    directoryLabel.innerText = directory;
    loadImages(directory).then((image) => {
        console.log(image);
        resultsEl.style.color = "forestgreen"
        resultsEl.innerText = "Image Loaded Successfully!";
    }).catch(err => {
        console.error(err);
        resultsEl.style.color = "darkred"
        resultsEl.innerText = `Error encountered:\n${err.stack || JSON.stringify(err)}`
    });
})


