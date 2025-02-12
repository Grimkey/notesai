import * as React from "react";
import { useState, useEffect } from "react";
import MarkdownEditor from "./components/MarkdownEditor";
import ReactMarkdown from "react-markdown";
import FileNavigator from "./components/FileNavigator";
import ChatPanel from "./components/ChatPanel";

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>("## Welcome to NotesAI!");
  const [currentFile, setCurrentFile] = useState<string | null>(null);

  const loadFile = (filename: string) => {
    window.electron.readNote(filename).then((content) => {
      setCurrentFile(filename);
      setMarkdown(content);
    });
  };

  const saveFile = () => {
    if (currentFile) {
      window.electron.saveNote(currentFile, markdown);
    }
  };

  useEffect(() => {
    const interval = setInterval(saveFile, 2000); // Auto-save every 2s
    return () => clearInterval(interval);
  }, [markdown, currentFile]);

  return (
    <div className="flex h-screen">
      {/* Left Panel: Navigation */}
      <div className="w-1/5 bg-gray-900 text-white p-4">
        <h3 className="text-lg font-semibold mb-4">📁 Notes</h3>
        <FileNavigator onSelectFile={loadFile} />
      </div>

      {/* Middle Panel: Markdown Editor */}
      <div className="flex flex-col flex-grow bg-gray-800 text-white">
        <div className="p-2 bg-gray-900 text-center font-bold">
          {currentFile ? `Editing: ${currentFile}` : "No file selected"}
        </div>
        <MarkdownEditor content={markdown} onChange={setMarkdown} />
        <button
          onClick={saveFile}
          className="m-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Save Note
        </button>
      </div>

      {/* Right Panel: Markdown Preview & Chat */}
      <div className="w-1/3 flex flex-col">
        <div className="bg-gray-100 p-4 overflow-y-auto h-1/2">
          <h3 className="text-lg font-semibold">📄 Preview</h3>
          <ReactMarkdown className="prose">{markdown}</ReactMarkdown>
        </div>
        <div className="h-1/2">
          <ChatPanel />
        </div>
      </div>
    </div>
  );
};

export default App;