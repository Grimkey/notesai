import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  getNotes: () => ipcRenderer.invoke("get-notes"),
  readNote: (filename: string) => ipcRenderer.invoke("read-note", filename),
  saveNote: (filename: string, content: string) => ipcRenderer.invoke("save-note", filename),
  createNote: () => ipcRenderer.invoke("create-note"),
  deleteNote: (filename: string) => ipcRenderer.invoke("delete-note", filename),
});