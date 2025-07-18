import React, { useState } from "react";
import "./Hero.css";

const slides = [
  {
    image: "/verra11.jpg",
    heading: "Verra",
    text: "Where Fragrance Meets Art",
    button: "Shop Now",
  },
  {
    image: "/verra2.jpg",
    heading: "Unleash the Power of Scent",
    text: "Luxury perfumes crafted for elegance",
    button: "Discover Collection",
  },
  {
    image: "/verra3.jpg",
    heading: "Fragrance, Redefined",
    text: "Every bottle tells your story",
    button: "Explore Now",
  },
  {
    image: "/verra4.jpg",
    heading: "Timeless Beauty",
    text: "Inspired by nature, perfected by Verra",
    button: "Get Yours",
  },
  {
    image: "/verra5.jpg",
    heading: "Bold. Elegant. You.",
    text: "Let your scent speak louder",
    button: "View Notes",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const scrollToNext = () => {
    const collectionSection = document.querySelector("#collection");
    if (collectionSection) {
      collectionSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero" id="home">
      <div className="hero-wrapper">
        <div className="arrow left-arrow" onClick={prevSlide}>
          ‹
        </div>

        <div className="hero-text">
          <h1 className="brand-name gradient-text">
            {slides[current].heading}
          </h1>
          <p className="tagline">{slides[current].text}</p>
          <button className="cta-button" onClick={scrollToNext}>
            {slides[current].button}
          </button>
        </div>

        <div className="hero-image-wrapper">
          <img
            src={slides[current].image}
            alt="Verra Perfume"
            className="hero-image fade-image"
          />
        </div>

        <div className="arrow right-arrow" onClick={nextSlide}>
          ›
        </div>
      </div>

      <div className="scroll-indicator" onClick={scrollToNext}></div>
    </section>
  );
};

export default Hero;
