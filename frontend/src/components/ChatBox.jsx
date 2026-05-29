import { useState } from "react";
import axios from "axios";

function ChatBox() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      text: message,
    };

    setChat((prev) => [...prev, userMessage]);

    const res = await axios.post(
      "http://127.0.0.1:8000/chat",
      {
        message,
      }
    );

    const botMessage = {
      role: "assistant",
      text: res.data.reply,
    };

    setChat((prev) => [...prev, botMessage]);

    setMessage("");
  };

  return (
    <div className="border-t border-white/10 bg-black/30 backdrop-blur-xl p-5">

      <div className="max-h-[300px] overflow-y-auto mb-5 space-y-4">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`p-4 rounded-2xl max-w-3xl ${
              msg.role === "user"
                ? "bg-fuchsia-500 ml-auto"
                : "bg-white/10"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask NexaMind anything..."
          className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
        />

        <button
          onClick={sendMessage}
          className="px-8 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-cyan-400 font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;