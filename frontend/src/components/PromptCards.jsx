function PromptCards() {
  const cards = [
    "Design a launch plan",
    "Debug my code",
    "Learn something hard",
    "Write premium copy",
  ];

  return (
    <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto mt-20">
      {cards.map((card) => (
        <div
          key={card}
          className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl hover:border-fuchsia-500 transition cursor-pointer"
        >
          <h2 className="text-xl font-semibold">{card}</h2>
        </div>
      ))}
    </div>
  );
}

export default PromptCards;