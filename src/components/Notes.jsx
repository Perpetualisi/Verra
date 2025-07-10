import React from "react";
import "./Notes.css";

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
    <section className="notes-section" id="notes">
      <h2 className="notes-title">Fragrance Notes</h2>
      <div className="notes-grid">
        {notesData.map((note, index) => (
          <div className="note-card" key={index}>
            <div className="note-icon">{note.icon}</div>
            <h3>{note.title}</h3>
            <p className="note-desc">{note.description}</p>
            <ul className="note-list">
              {note.ingredients.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Notes;
