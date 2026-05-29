import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import PromptCards from "../components/PromptCards";

function Home() {
  return (
    <div className="flex h-screen bg-[#050816]">
      <Sidebar />

      <div className="flex-1 flex flex-col relative overflow-hidden">

        {/* Background Glow */}
        <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full top-[-100px] left-[30%]" />

        <div className="flex-1 overflow-y-auto scrollbar p-10 relative z-10">
          
          {/* Hero */}
          <div className="text-center mt-20">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-r from-fuchsia-500 to-cyan-400 flex items-center justify-center text-3xl font-bold glow">
              N
            </div>

            <h1 className="text-6xl font-bold mt-8 leading-tight">
              A calmer, sharper way to think with AI.
            </h1>

            <p className="text-gray-400 mt-6 text-lg max-w-3xl mx-auto">
              NexaMind blends practical reasoning, emotional intelligence,
              and clean structure in a focused workspace.
            </p>
          </div>

          <PromptCards />
        </div>

        <ChatBox />
      </div>
    </div>
  );
}

export default Home;
