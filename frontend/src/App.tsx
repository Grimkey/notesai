import * as React from "react";
import { useState, useEffect } from "react";
import MarkdownEditor from "./components/MarkdownEditor";
import ReactMarkdown from "react-markdown";
import FileNavigator from "./components/FileNavigator";

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
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Panel: Navigation */}
      <div style={{ width: "20%", background: "#2c3e50", color: "white", padding: "10px" }}>
        <h3>📁 Notes</h3>
        {/* TODO: Add Note Navigation */}
      </div>

      {/* Middle Panel: Markdown Editor */}
      <div style={{ flex: 1, padding: "10px" }}>
        <MarkdownEditor content={markdown} onChange={setMarkdown} />
      </div>

      {/* Right Panel: Markdown Preview */}
      <div style={{ width: "30%", background: "#ecf0f1", padding: "10px", overflowY: "auto" }}>
        <h3>📄 Preview</h3>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
};

export default App;