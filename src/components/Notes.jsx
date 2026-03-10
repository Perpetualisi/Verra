import React from "react";

const notesData = [
  {
    title: "Top Notes",
    icon: "🌿",
    description: "The first impression of Verra — fresh, floral, and sparkling aromas that captivate immediately.",
    ingredients: ["Bergamot", "Rose", "Pear", "Citrus"]
  },
  {
    title: "Heart Notes",
    icon: "💐",
    description: "The heart reveals Verra’s true elegance — sensual, delicate, and rich with floral depth.",
    ingredients: ["Jasmine", "White Musk", "Ylang-Ylang", "Lavender"]
  },
  {
    title: "Base Notes",
    icon: "🌲",
    description: "The long-lasting trail — warm, woody, and deeply luxurious for a timeless scent.",
    ingredients: ["Amber", "Vanilla", "Sandalwood", "Musk"]
  }
];

const Notes = () => {
  return (
    <section className="bg-gradient-to-br from-[#fef9f6] to-[#f6ebe4] py-20 px-8 text-center" id="notes">
      <h2 className="font-serif text-2xl sm:text-4xl text-gray-800 mb-12">Fragrance Notes</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8">
        {notesData.map((note, index) => (
          <div className="bg-white rounded-xl p-8 shadow-lg" key={index}>
            <div className="text-4xl mb-4">{note.icon}</div>
            <h3 className="font-serif text-lg sm:text-xl text-gray-700 mb-2">{note.title}</h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">{note.description}</p>
            <ul className="list-none p-0 text-sm text-gray-700">
              {note.ingredients.map((item, idx) => (
                <li className="my-1" key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Notes;
