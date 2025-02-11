import * as React from "react";
import { useState, useEffect } from "react";import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

interface MarkdownEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ content, onChange }: MarkdownEditorProps) => {
  return (
    <div className="editor-container">
      <SimpleMDE value={content} onChange={onChange} />
    </div>
  );
};

export default MarkdownEditor;