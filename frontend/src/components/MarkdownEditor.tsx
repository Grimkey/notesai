import React from "react";

interface MarkdownEditorProps {
  content: string;
  onChange: (newContent: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ content, onChange }) => {
  return (
    <div className="flex flex-col flex-grow p-4 bg-gray-800 text-white">
      <textarea
        className="w-full h-full bg-gray-900 text-white text-lg leading-relaxed p-4 border border-gray-700 rounded-md outline-none focus:ring-2 focus:ring-green-400 transition"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your note in Markdown..."
      />
    </div>
  );
};

export default MarkdownEditor;