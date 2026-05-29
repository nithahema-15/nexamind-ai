function Sidebar() {
  return (
    <div className="w-[320px] border-r border-white/10 bg-black/30 backdrop-blur-xl p-5">

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-cyan-400 flex items-center justify-center font-bold text-xl">
          N
        </div>

        <div>
          <h1 className="font-bold text-xl">NexaMind</h1>
          <p className="text-gray-400 text-sm">
            Human-centered AI workspace
          </p>
        </div>
      </div>

      <button className="mt-8 w-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 py-4 rounded-2xl font-semibold">
        + New conversation
      </button>

      <div className="mt-10">
        <p className="text-gray-500 text-xs tracking-[3px]">
          RECENT CHATS
        </p>

        <div className="mt-5 bg-white/5 border border-white/10 rounded-2xl p-4">
          <h2 className="font-semibold">Current Session</h2>
          <p className="text-gray-400 text-sm mt-2">
            Ready for your first prompt
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
