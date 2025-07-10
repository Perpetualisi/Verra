import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="verra-footer">
      <div className="footer-content">
        {/* Brand */}
        <div className="footer-brand">
          <h2 className="footer-logo">Verra</h2>
          <p>Elegance in Every Drop</p>
        </div>

        {/* Navigation */}
        <div className="footer-links">
          <h3>Navigate</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#collection">Collection</a></li>
            <li><a href="#notes">Notes</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h3>Contact</h3>
          <p>📧 verra@luxuryperfume.com</p>
          <p>📍 New York, USA</p>
        </div>

        {/* Social & Newsletter */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="icons">
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
          </div>

          <form className="newsletter">
            <input type="email" placeholder="Subscribe to newsletter" />
            <button type="submit">→</button>
          </form>
        </div>
      </div>

      <p className="footer-bottom">© 2025 Verra. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
