import React, { useState, useEffect } from "react";
import "./Hero.css";

const images = [
  "/verra11.jpg",
  "/verra2.jpg",
  "/verra3.jpg",
  "/verra4.jpg",
  "/verra5.jpg",
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const scrollToNext = () => {
    const contactSection = document.querySelector("#collection");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero" id="home">
      <div className="particles"></div>

      <div className="hero-wrapper">
        <div className="hero-text">
          <h1 className="brand-name">Verra</h1>
          <p className="tagline">Where Fragrance Meets Art</p>
          <button className="cta-button" onClick={scrollToNext}>
            Shop Now
          </button>
        </div>

        <div className="hero-image-wrapper">
          <img
            src={images[currentImage]}
            alt="Verra Perfume"
            className="hero-image fade-image"
          />
        </div>
      </div>

      <div className="scroll-indicator" onClick={scrollToNext}></div>
    </section>
  );
};

export default Hero;
