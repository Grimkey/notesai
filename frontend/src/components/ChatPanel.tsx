import React, { useState } from "react";

const ChatPanel: React.FC = () => {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", text: input }, { role: "ai", text: "🤖 AI Response Here..." }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white p-4 border-l border-gray-700">
      <h3 className="text-lg font-semibold mb-4">🤖 AI Chat</h3>
      <div className="flex-grow overflow-y-auto space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-md ${
              msg.role === "user" ? "bg-green-500 self-end text-right" : "bg-gray-700 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-grow bg-gray-800 text-white p-2 rounded-md border border-gray-700 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button onClick={sendMessage} className="ml-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;