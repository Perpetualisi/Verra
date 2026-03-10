import React, { useState } from "react";
import perfumes from "../data/perfumes";

const Collection = () => {
  const [filter, setFilter] = useState("all");

  const filtered = perfumes.filter((perfume) =>
    filter === "all" ? true : perfume.gender === filter
  );

  const scrollToContact = () => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 px-4 sm:py-16 sm:px-8 bg-gradient-to-br from-[#fef9f6] to-[#f6ebe4] text-center" id="collection">
      <h2 className="text-4xl font-serif mb-8 text-gray-800">Our Collection</h2>

      <div className="mb-8 flex gap-4 justify-start sm:justify-center flex-nowrap overflow-x-auto pb-2">
        <button className="whitespace-nowrap px-4 py-2 sm:px-5 sm:py-3 bg-white border border-gray-300 rounded-full font-serif text-gray-800 cursor-pointer transition-all duration-300 flex-shrink-0 hover:bg-[#f0e5da] hover:border-[#d4af37] hover:text-gray-800" onClick={() => setFilter("all")}>All</button>
        <button className="whitespace-nowrap px-4 py-2 sm:px-5 sm:py-3 bg-white border border-gray-300 rounded-full font-serif text-gray-800 cursor-pointer transition-all duration-300 flex-shrink-0 hover:bg-[#f0e5da] hover:border-[#d4af37] hover:text-gray-800" onClick={() => setFilter("female")}>For Her</button>
        <button className="whitespace-nowrap px-4 py-2 sm:px-5 sm:py-3 bg-white border border-gray-300 rounded-full font-serif text-gray-800 cursor-pointer transition-all duration-300 flex-shrink-0 hover:bg-[#f0e5da] hover:border-[#d4af37] hover:text-gray-800" onClick={() => setFilter("male")}>For Him</button>
        <button className="whitespace-nowrap px-4 py-2 sm:px-5 sm:py-3 bg-white border border-gray-300 rounded-full font-serif text-gray-800 cursor-pointer transition-all duration-300 flex-shrink-0 hover:bg-[#f0e5da] hover:border-[#d4af37] hover:text-gray-800" onClick={() => setFilter("unisex")}>Unisex</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filtered.map(({ id, image, name, notes, price }) => (
          <div key={id} className="bg-white rounded-3xl p-4 sm:p-6 shadow-lg transition-transform duration-300 hover:-translate-y-1">
            <img src={image} alt={name} className="w-full h-[160px] sm:h-[180px] md:h-[220px] object-contain mb-4 rounded-xl" />
            <h3 className="text-lg sm:text-xl text-gray-800 mb-2">{name}</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-4">{notes}</p>
            <div className="flex justify-between items-center mt-4 sm:flex-col sm:gap-2">
              <span className="font-bold text-[#d4af37] text-base sm:text-lg">{price}</span>
              <button className="bg-gray-800 text-white px-4 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm rounded-lg border-none cursor-pointer transition-all duration-300 shadow-md hover:bg-[#d4af37] hover:scale-105" onClick={scrollToContact}>
                Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Collection;
