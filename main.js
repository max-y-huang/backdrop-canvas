const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const path = require("path");
const url = require("url");

const isDev = require("electron-is-dev");

// If in development use electron-reload to watch for
// changes in the current directory
if (isDev) {
  require("electron-reload")(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`),
  });
}

function createWindow() {
  // Create the browser window with node integration
  const win = new BrowserWindow({
    width: 1024,
    height: 720,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "public/index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  // win.maximize();

  // Open the DevTools only if app is in development
  // If in production, don't show.
  // if (isDev) win.webContents.openDevTools();

  ipcMain.on("selectFolderPath", async (event, arg) => {
    let result = await dialog.showOpenDialog({ properties: ["openDirectory"] });
    event.sender.send(
      "selectFolderPath_response",
      result.filePaths.length > 0 ? result.filePaths[0] : undefined
    );
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
