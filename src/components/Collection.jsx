import React, { useState } from "react";
import "./Collection.css";
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
    <section className="collection" id="collection">
      <h2 className="section-title">Our Collection</h2>

      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("female")}>For Her</button>
        <button onClick={() => setFilter("male")}>For Him</button>
        <button onClick={() => setFilter("unisex")}>Unisex</button>
      </div>

      <div className="grid">
        {filtered.map(({ id, image, name, notes, price }) => (
          <div key={id} className="card">
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p className="notes">{notes}</p>
            <div className="card-footer">
              <span className="price">{price}</span>
              <button className="add-button" onClick={scrollToContact}>
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
