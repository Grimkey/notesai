import fs from "fs";
import path from "path";
import { app } from "electron";

const notesDirectory = path.join(app.getPath("userData"), "notes");

// Ensure the notes directory exists
if (!fs.existsSync(notesDirectory)) {
  fs.mkdirSync(notesDirectory, { recursive: true });
}

const fileManager = {
  getNotes: (): string[] => {
    return fs.readdirSync(notesDirectory).filter((file) => file.endsWith(".md"));
  },

  readNote: (filename: string): string => {
    const filePath = path.join(notesDirectory, filename);
    return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
  },

  saveNote: (filename: string, content: string): void => {
    console.log('Filename:', filename);
    console.log('Data:', content);
    const filePath = path.join(notesDirectory, filename);
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`[FileManager] Successfully saved ${filename}`);
  },

  createNote: (): string => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const newFileName = `note-${timestamp}.md`;
    const newFilePath = path.join(notesDirectory, newFileName);
  
    console.log(`[FileManager] Creating file: ${newFilePath}`);
    fs.writeFileSync(newFilePath, "# New Note\n", "utf8");
  
    // ✅ Wait a bit for the file system to register the file
    let tries = 5;
    while (!fs.existsSync(newFilePath) && tries > 0) {
      require("child_process").execSync("sleep 0.1");
      tries--;
    }
  
    return newFileName;
  },

  deleteNote: (filename: string): void => {
    const filePath = path.join(notesDirectory, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  },
};

export default fileManager;