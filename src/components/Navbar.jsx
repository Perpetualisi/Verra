import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="logo">Verra</div>
        <ul className="nav-links">
          {["Home", "Collection", "Notes", "About", "Contact"].map((link) => (
            <li key={link}><a href={`#${link.toLowerCase()}`}>{link}</a></li>
          ))}
        </ul>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          {["Home", "Collection", "Notes", "About", "Contact"].map((link) => (
            <li key={link} onClick={() => setMenuOpen(false)}>
              <a href={`#${link.toLowerCase()}`}>{link}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
