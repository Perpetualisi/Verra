import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#fef9f6] to-[#f6ebe4] py-16 px-8 text-gray-800 font-serif">
      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-8 max-w-[1200px] mx-auto text-center sm:text-left">
        {/* Brand */}
        <div>
          <h2 className="text-3xl text-[#d4af37]">Verra</h2>
          <p>Elegance in Every Drop</p>
        </div>

        {/* Navigation */}
        <div>
          <h3>Navigate</h3>
          <ul>
            <li className="list-none"><a href="#home" className="no-underline text-gray-800 transition-colors duration-300 hover:text-[#d4af37]">Home</a></li>
            <li className="list-none"><a href="#collection" className="no-underline text-gray-800 transition-colors duration-300 hover:text-[#d4af37]">Collection</a></li>
            <li className="list-none"><a href="#notes" className="no-underline text-gray-800 transition-colors duration-300 hover:text-[#d4af37]">Notes</a></li>
            <li className="list-none"><a href="#about" className="no-underline text-gray-800 transition-colors duration-300 hover:text-[#d4af37]">About</a></li>
            <li className="list-none"><a href="#contact" className="no-underline text-gray-800 transition-colors duration-300 hover:text-[#d4af37]">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3>Contact</h3>
          <p className="my-2">📧 verra@luxuryperfume.com</p>
          <p className="my-2">📍 New York, USA</p>
        </div>

        {/* Social & Newsletter */}
        <div>
          <h3>Follow Us</h3>
          <div>
            <a href="#" className="text-lg mr-4 text-gray-800 transition-colors duration-300 hover:text-[#d4af37]"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-lg mr-4 text-gray-800 transition-colors duration-300 hover:text-[#d4af37]"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-lg mr-4 text-gray-800 transition-colors duration-300 hover:text-[#d4af37]"><i className="fab fa-twitter"></i></a>
          </div>

          <form className="mt-4 flex flex-col sm:flex border border-gray-300 rounded-full overflow-hidden bg-white">
            <input type="email" placeholder="Subscribe to newsletter" className="flex-1 px-4 py-3 border-none text-sm" />
            <button type="submit" className="bg-[#d4af37] border-none px-4 text-white font-bold cursor-pointer">→</button>
          </form>
        </div>
      </div>

      <p className="text-center mt-8 text-sm text-gray-600">© 2025 Verra. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
