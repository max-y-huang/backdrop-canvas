const { ipcRenderer, contextBridge, shell } = require("electron");

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
  openURL(url) {
    shell.openExternal(url);
  },
});
