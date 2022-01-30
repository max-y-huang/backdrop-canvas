const { ipcRenderer, contextBridge, shell } = require("electron");
const path = require("path");

contextBridge.exposeInMainWorld("ipc_namespace", {
  selectFolderPath() {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("selectFolderPath");
      ipcRenderer.on("selectFolderPath_response", (event, args) => {
        if (args) {
          resolve({ path: args });
        } else {
          reject({ message: "No folder selected." });
        }
      });
    });
  },
  runGame(workingPath) {
    shell.openExternal(path.join(workingPath, "game.exe"), {
      workingDirectory: workingPath,
    });
  },
  openURL(url) {
    shell.openExternal(url);
  },
});
