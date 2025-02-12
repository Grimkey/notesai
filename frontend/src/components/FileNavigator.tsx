import React, { useEffect, useState } from "react";

interface FileMetadata {
  name: string;
  createdAt: number;
}

interface FileNavigatorProps {
  onSelectFile: (filename: string) => void;
}

const FileNavigator: React.FC<FileNavigatorProps> = ({ onSelectFile }) => {
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [editingFile, setEditingFile] = useState<string | null>(null);
  const [newFileName, setNewFileName] = useState<string>("");

  const refreshFiles = () => {
    window.electron.getNotes().then(setFiles);
  };

  useEffect(() => {
    refreshFiles();
  }, []);

  const handleSelectFile = (filename: string) => {
    setSelectedFile(filename);
    onSelectFile(filename);
  };

  return (
    <div className="bg-gray-900 text-white p-4 h-full w-60 border-r border-gray-700">
      <h3 className="text-lg font-semibold mb-4">📁 Notes</h3>
      <button
        onClick={() => window.electron.createNote().then(refreshFiles)}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4 transition"
      >
        ➕ New Note
      </button>
      <ul className="space-y-2">
        {files.map(({ name, createdAt }) => (
          <li
            key={name}
            onClick={() => handleSelectFile(name)}
            className={`cursor-pointer px-3 py-2 rounded-md ${
              selectedFile === name ? "bg-green-500" : "hover:bg-gray-700"
            } transition`}
          >
            📄 {name} <span className="text-xs text-gray-400">({new Date(createdAt).toLocaleString()})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileNavigator;