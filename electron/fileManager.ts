import fs from "fs";
import path from "path";
import { app } from "electron";

const notesDirectory = path.resolve(app.getPath("userData"), "notes");

const ensureNotesDirectory = () => {
  if (!fs.existsSync(notesDirectory)) {
    fs.mkdirSync(notesDirectory, { recursive: true });
  }
};
ensureNotesDirectory();

const fileManager = {
  getNotes: (): { name: string; createdAt: number }[] => {
    ensureNotesDirectory();
    return fs.readdirSync(notesDirectory)
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const filePath = path.join(notesDirectory, file);
        const stats = fs.statSync(filePath);
        return { name: file, createdAt: stats.birthtimeMs }; // Get creation timestamp
      })
      .sort((a, b) => b.createdAt - a.createdAt); // Sort newest first
  },

  renameNote: (oldName: string, newName: string): void => {
    ensureNotesDirectory();
    const oldPath = path.join(notesDirectory, oldName);
    const newPath = path.join(notesDirectory, newName);

    if (fs.existsSync(oldPath) && !fs.existsSync(newPath)) {
      fs.renameSync(oldPath, newPath);
    } else {
      console.error(`[FileManager] Rename failed: ${oldName} -> ${newName} (File exists or not found)`);
    }
  },

  readNote: (filename: string): string => {
    ensureNotesDirectory();
    const filePath = path.join(notesDirectory, filename);
    return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
  },

  saveNote: (filename: string, content: string): void => {
    ensureNotesDirectory();
    const filePath = path.join(notesDirectory, filename);
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`[FileManager] Successfully saved ${filename}`);
  },

  createNote: (): string => {
    ensureNotesDirectory();
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const newFileName = `note-${timestamp}.md`;
    const newFilePath = path.join(notesDirectory, newFileName);

    console.log(`[FileManager] Creating file: ${newFilePath}`);
    fs.writeFileSync(newFilePath, "# New Note\n", "utf8");

    return newFileName;
  },

  deleteNote: (filename: string): void => {
    ensureNotesDirectory();
    const filePath = path.join(notesDirectory, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  },
};

export default fileManager;