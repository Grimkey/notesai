import * as React from "react";
import { useEffect, useState } from "react";

interface FileNavigatorProps {
  onSelectFile: (filename: string) => void;
}

const FileNavigator: React.FC<FileNavigatorProps> = ({ onSelectFile }: FileNavigatorProps) => {
  const [files, setFiles] = useState<string[]>([]);

  const refreshFiles = () => {
    window.electron.getNotes().then(setFiles);
  };

  useEffect(() => {
    refreshFiles();
  }, []);

  const handleCreateNote = async () => {
    const newNote = await window.electron.createNote();
    refreshFiles();
    onSelectFile(newNote);
  };

  const handleDeleteNote = async (filename: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering file selection
    await window.electron.deleteNote(filename);
    refreshFiles();
  };

  return (
    <div style={{ padding: "10px", background: "#2c3e50", color: "white", height: "100vh" }}>
      <h3>📁 Notes</h3>
      <button onClick={handleCreateNote} style={{ marginBottom: "10px", padding: "5px 10px" }}>
        ➕ New Note
      </button>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {files.map((file) => (
          <li key={file} onClick={() => onSelectFile(file)} style={{ cursor: "pointer", marginBottom: "8px" }}>
            📄 {file} 
            <button onClick={(e) => handleDeleteNote(file, e)} style={{ marginLeft: "10px" }}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileNavigator;
