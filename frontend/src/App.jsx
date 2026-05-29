import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

import {
  FiMenu,
  FiPlus,
  FiMessageSquare,
  FiSettings,
  FiClock,
  FiBookmark,
  FiCopy,
  FiRefreshCcw,
  FiShare2,
  FiSend
} from "react-icons/fi";

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [message, setMessage] = useState("");

  const [chat, setChat] = useState([]);

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(false);

  // SEND MESSAGE
  const sendMessage = async () => {

    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      text: message
    };

    setChat((prev) => [...prev, userMessage]);

    if (!history.includes(message)) {
      setHistory((prev) => [message, ...prev]);
    }

    setLoading(true);

    try {

      const response = await axios.post(
        "https://nexamind-backend.onrender.com/chat",
        {
          message: message
        }
      );

      const botMessage = {
        role: "assistant",
        text: response.data.reply
      };

      setChat((prev) => [...prev, botMessage]);

    } catch (error) {

      setChat((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "⚠ Error connecting backend"
        }
      ]);
    }

    setLoading(false);

    setMessage("");
  };

  // COPY MESSAGE
  const copyMessage = (text) => {
    navigator.clipboard.writeText(text);
  };

  // SHARE MESSAGE
  const shareMessage = async (text) => {

    if (navigator.share) {

      await navigator.share({
        title: "NexaMind AI",
        text: text
      });

    } else {

      alert("Sharing not supported");
    }
  };

  // NEW CHAT
  const newChat = () => {
    setChat([]);
  };

  return (

    <div className="h-screen bg-[#0A0F1F] text-white flex overflow-hidden">

      {/* SIDEBAR */}
      <div
        className={`${
          sidebarOpen
            ? "w-[260px]"
            : "w-[80px]"
        } transition-all duration-300 border-r border-white/10 bg-[#0D1325] flex flex-col`}
      >

        {/* TOP */}
        <div className="p-4 border-b border-white/10">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-400 flex items-center justify-center font-bold text-lg">
                N
              </div>

              {sidebarOpen && (

                <div>
                  <h1 className="font-bold text-lg">
                    NexaMind
                  </h1>

                  <p className="text-xs text-gray-400">
                    AI Workspace
                  </p>
                </div>

              )}

            </div>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-white"
            >
              <FiMenu size={20} />
            </button>

          </div>

          {/* NEW CHAT */}
          <button
            onClick={newChat}
            className="mt-5 w-full bg-gradient-to-r from-violet-500 to-cyan-400 py-3 rounded-2xl flex items-center justify-center gap-2 text-sm font-medium"
          >

            <FiPlus />

            {sidebarOpen && "New Chat"}

          </button>

        </div>

        {/* NAVIGATION */}
        <div className="p-3 space-y-2">

          <div className="flex items-center gap-3 hover:bg-white/5 p-3 rounded-xl cursor-pointer text-sm">
            <FiMessageSquare />
            {sidebarOpen && "Chats"}
          </div>

          <div className="flex items-center gap-3 hover:bg-white/5 p-3 rounded-xl cursor-pointer text-sm">
            <FiBookmark />
            {sidebarOpen && "Bookmarks"}
          </div>

          <div className="flex items-center gap-3 hover:bg-white/5 p-3 rounded-xl cursor-pointer text-sm">
            <FiClock />
            {sidebarOpen && "History"}
          </div>

          <div className="flex items-center gap-3 hover:bg-white/5 p-3 rounded-xl cursor-pointer text-sm">
            <FiSettings />
            {sidebarOpen && "Settings"}
          </div>

        </div>

        {/* HISTORY */}
        {sidebarOpen && (

          <div className="flex-1 overflow-y-auto px-3 pb-4">

            <p className="text-[11px] tracking-[3px] text-gray-500 mb-3 px-2">
              RECENT
            </p>

            <div className="space-y-2">

              {history.map((item, index) => (

                <div
                  key={index}
                  className="bg-white/5 hover:bg-white/10 transition p-3 rounded-xl text-sm truncate cursor-pointer"
                >
                  {item}
                </div>

              ))}

            </div>

          </div>

        )}

      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col relative overflow-hidden">

        {/* BACKGROUND GLOW */}
        <div className="absolute w-[500px] h-[500px] bg-violet-500/10 blur-[120px] rounded-full top-[-250px] left-[30%]" />

        {/* HEADER */}
        <div className="h-[65px] border-b border-white/10 flex items-center justify-between px-6 bg-[#0D1325]/70 backdrop-blur-xl z-10">

          <h1 className="font-semibold text-lg">
            NexaMind AI
          </h1>

          <div className="text-sm text-gray-400">
            AI Assistant Workspace
          </div>

        </div>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto px-6 py-6 z-10">

          <div className="max-w-4xl mx-auto space-y-6">

            {chat.length === 0 && (

              <div className="h-full flex flex-col justify-center items-center text-center mt-28">

                <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-violet-500 to-cyan-400 flex items-center justify-center text-3xl font-bold">
                  N
                </div>

                <h1 className="text-5xl font-bold mt-8 leading-tight">
                  Think smarter with AI.
                </h1>

                <p className="text-gray-400 mt-5 max-w-xl leading-7 text-sm">
                  NexaMind helps you brainstorm, learn,
                  write, reason, and solve problems in one workspace.
                </p>

              </div>

            )}

            {/* CHAT */}
            {chat.map((msg, index) => (

              <div
                key={index}
                className={`flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-3xl rounded-3xl px-5 py-4 text-[15px] leading-8 ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-violet-600 to-fuchsia-600"
                      : "bg-white/5 border border-white/10"
                  }`}
                >

                  {msg.role === "assistant" ? (

                    <>
                      <div className="prose prose-invert max-w-none text-sm">

                        <ReactMarkdown>
                          {msg.text}
                        </ReactMarkdown>

                      </div>

                      {/* ACTIONS */}
                      <div className="flex items-center gap-4 mt-5 text-gray-400 text-sm">

                        <button
                          onClick={() => copyMessage(msg.text)}
                          className="hover:text-white"
                        >
                          <FiCopy />
                        </button>

                        <button
                          className="hover:text-white"
                        >
                          <FiRefreshCcw />
                        </button>

                        <button
                          onClick={() => shareMessage(msg.text)}
                          className="hover:text-white"
                        >
                          <FiShare2 />
                        </button>

                      </div>
                    </>

                  ) : (
                    msg.text
                  )}

                </div>

              </div>

            ))}

            {/* LOADING */}
            {loading && (

              <div className="bg-white/5 border border-white/10 px-5 py-4 rounded-2xl w-fit text-sm">
                Thinking...
              </div>

            )}

          </div>

        </div>

        {/* INPUT */}
        <div className="p-5 border-t border-white/10 bg-[#0D1325]/70 backdrop-blur-xl z-10">

          <div className="max-w-4xl mx-auto flex items-center gap-3 bg-white/5 border border-white/10 rounded-3xl px-5 py-3">

            <input
              type="text"
              placeholder="Ask anything..."
              value={message}

              onChange={(e) => setMessage(e.target.value)}

              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}

              className="flex-1 bg-transparent outline-none text-sm placeholder-gray-500"
            />

            <button
              onClick={sendMessage}
              className="w-11 h-11 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-400 flex items-center justify-center"
            >
              <FiSend />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;