import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Menu,
  Plus,
  MessageSquare,
} from "lucide-react";

function App() {
  const [chatId, setChatId] = useState(
    Date.now()
  );

  const [messages, setMessages] = useState(
    []
  );

  const [input, setInput] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  const [conversations, setConversations] =
    useState([]);

  const messagesEndRef = useRef(null);

  // 🔥 YOUR BACKEND URL
  const API_URL =
    "https://nexamind-backend.onrender.com/chat";

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Save Conversations
  useEffect(() => {
    localStorage.setItem(
      "conversations",
      JSON.stringify(conversations)
    );
  }, [conversations]);

  // Load Conversations
  useEffect(() => {
    const savedConversations =
      JSON.parse(
        localStorage.getItem(
          "conversations"
        )
      );

    if (savedConversations) {
      setConversations(savedConversations);
    }
  }, []);

  // New Chat
  const handleNewChat = () => {
    setMessages([]);
    setInput("");
    setChatId(Date.now());
  };

  // Smart Topic Generator
  const generateTopic = (text) => {
    const cleaned = text
      .replace(/[^\w\s]/gi, "")
      .trim();

    const words = cleaned.split(" ");

    const ignoreWords = [
      "what",
      "is",
      "the",
      "about",
      "tell",
      "me",
      "explain",
      "can",
      "you",
    ];

    const filtered = words.filter(
      (word) =>
        !ignoreWords.includes(
          word.toLowerCase()
        )
    );

    return filtered
      .slice(0, 3)
      .join(" ");
  };

  // Send Message
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    // Show user message immediately
    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    // First message = create conversation
    if (messages.length === 0) {
      const topic = generateTopic(input);

      const newConversation = {
        id: chatId,
        title: topic,
        messages: [userMessage],
      };

      setConversations((prev) => [
        newConversation,
        ...prev,
      ]);
    }

    const currentInput = input;

    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        API_URL,
        {
          message: currentInput,
        }
      );

      const botMessage = {
        role: "assistant",
        content:
          response.data.reply ||
          response.data.response ||
          response.data.message ||
          "AI did not respond",
      };

      setMessages((prev) => {
        const updatedMessages = [
          ...prev,
          botMessage,
        ];

        // Update conversation
        setConversations((prevConv) =>
          prevConv.map((conv) =>
            conv.id === chatId
              ? {
                  ...conv,
                  messages:
                    updatedMessages,
                }
              : conv
          )
        );

        return updatedMessages;
      });
    } catch (error) {
      console.log(error);

      const errorMessage = {
        role: "assistant",
        content:
          "⚠ Backend connection error",
      };

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-[#212121] text-white overflow-hidden text-sm">
      {/* SIDEBAR */}
      <div
        className={`bg-[#171717] border-r border-gray-800 transition-all duration-300 flex flex-col ${
          sidebarOpen ? "w-60" : "w-0"
        } overflow-hidden`}
      >
        {/* TOP */}
        <div className="p-3 border-b border-gray-800">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-2 bg-[#2a2a2a] hover:bg-[#343434] p-3 rounded-xl transition"
          >
            <Plus size={18} />

            <span>New Chat</span>
          </button>
        </div>

        {/* RECENT CHATS */}
        <div className="flex-1 overflow-y-auto p-3">
          <p className="text-gray-400 text-xs mb-3 uppercase tracking-wide">
            Recent Conversations
          </p>

          <div className="space-y-2">
            {conversations.map((chat) => (
              <div
                key={chat.id}
                onClick={() => {
                  setChatId(chat.id);
                  setMessages(
                    chat.messages
                  );
                }}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#2a2a2a] cursor-pointer transition"
              >
                <MessageSquare
                  size={16}
                />

                <p className="truncate text-[14px]">
                  {chat.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex flex-col flex-1">
        {/* TOP BAR */}
        <div className="h-14 border-b border-gray-800 flex items-center px-4">
          <button
            onClick={() =>
              setSidebarOpen(
                !sidebarOpen
              )
            }
            className="p-2 rounded-lg hover:bg-[#2a2a2a] transition"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <h1 className="text-4xl font-semibold mb-3">
                SmartTalk
              </h1>

              <p className="text-gray-400 text-sm">
                Your intelligent AI
                assistant
              </p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map(
                (msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.role ===
                      "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl leading-7 whitespace-pre-wrap ${
                        msg.role ===
                        "user"
                          ? "bg-[#2f2f2f]"
                          : "bg-[#171717]"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                )
              )}

              {loading && (
                <div className="text-gray-400 text-sm">
                  AI is thinking...
                </div>
              )}

              <div
                ref={messagesEndRef}
              ></div>
            </div>
          )}
        </div>

        {/* INPUT */}
        <div className="border-t border-gray-800 p-4">
          <div className="max-w-4xl mx-auto flex items-center gap-3 bg-[#2a2a2a] rounded-2xl px-4 py-3">
            <input
              type="text"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) =>
                setInput(
                  e.target.value
                )
              }
              onKeyDown={(e) => {
                if (
                  e.key === "Enter"
                ) {
                  handleSend();
                }
              }}
              className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400"
            />

            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-white text-black px-5 py-2 rounded-xl font-medium hover:opacity-90 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;