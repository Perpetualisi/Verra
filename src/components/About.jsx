import React from "react";

const highlights = [
  {
    title: "Artisanal Ingredients",
    text: "Crafted with rare botanicals and exquisite natural oils sourced globally.",
  },
  {
    title: "Timeless Design",
    text: "Every bottle is a blend of heritage and modern elegance — minimal yet iconic.",
  },
  {
    title: "Effortless Elegance",
    text: "Verra captures the essence of refined femininity in every scent.",
  },
];

const About = () => {
  return (
    <section className="bg-gradient-to-br from-[#fef9f6] to-[#f6ebe4] py-20 px-8 font-serif" id="about">
      <div className="flex flex-col md:flex-row items-center justify-between flex-wrap gap-12 max-w-[1200px] mx-auto">
        <div className="flex-1 min-w-[500px]">
          <h2 className="text-2xl md:text-4xl text-gray-800 mb-6">The Verra Story</h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-10">
            Born from a dream to bottle beauty, Verra is where fragrance becomes art.
            Each scent tells a story — soft whispers of petals, golden sunlit woods,
            and timeless elegance. Designed for the modern muse, Verra perfumes linger
            with grace and leave a memory of magic.
          </p>

          <div className="grid grid-cols-1 gap-6">
            {highlights.map((item, index) => (
              <div key={index}>
                <h4 className="text-lg md:text-xl text-[#c49a6c] mb-1">{item.title}</h4>
                <p className="text-base text-gray-700 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 min-w-[400px] text-center">
          <img src="/verra3.jpg" alt="Verra bottle in luxury setting" className="w-[90%] rounded-xl shadow-2xl max-h-[520px] object-cover" />
        </div>
      </div>
    </section>
  );
};

export default About;
