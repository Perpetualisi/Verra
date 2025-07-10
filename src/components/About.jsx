import React from "react";
import "./About.css";

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
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-text">
          <h2 className="about-title">The Verra Story</h2>
          <p className="about-story">
            Born from a dream to bottle beauty, Verra is where fragrance becomes art.
            Each scent tells a story — soft whispers of petals, golden sunlit woods,
            and timeless elegance. Designed for the modern muse, Verra perfumes linger
            with grace and leave a memory of magic.
          </p>

          <div className="about-highlights">
            {highlights.map((item, index) => (
              <div className="highlight" key={index}>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-image">
          <img src="/verra3.jpg" alt="Verra bottle in luxury setting" />
        </div>
      </div>
    </section>
  );
};

export default About;
