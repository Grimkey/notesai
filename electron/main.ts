import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import fileManager from "./fileManager";

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Load React app in development, or built files in production
  const devServerUrl = "http://localhost:5173";
  const prodPath = path.join(__dirname, "../frontend/index.html");

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL(devServerUrl);
  } else {
    mainWindow.loadFile(prodPath);
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

// IPC handlers using fileManager
ipcMain.handle("get-notes", async () => fileManager.getNotes());
ipcMain.handle("read-note", async (_event, filename) => fileManager.readNote(filename));
ipcMain.handle("save-note", async (_event, filename, content) => fileManager.saveNote(filename, content));
ipcMain.handle("create-note", async () => fileManager.createNote());
ipcMain.handle("delete-note", async (_event, filename) => fileManager.deleteNote(filename));

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});