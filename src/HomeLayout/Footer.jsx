import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200  py-10 mt-10 rounded-xl">
      <div className="px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">About</h3>
          <p className="text-sm leading-relaxed">
            We are committed to reducing food waste by connecting restaurants and charities 
            for meaningful food distribution.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="md:justify-self-center">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="flex justify-center md:justify-start flex-col md:flex-row gap-4 text-sm">
            <li>
              <Link to="/" className="hover:text-green-400 transition-colors duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/donations" className="hover:text-green-400 transition-colors duration-200">
                All Donations
              </Link>
            </li>
            <li>
              <Link to="/dashboard/profile" className="hover:text-green-400 transition-colors duration-200">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links Section */}
        <div className="md:justify-self-end">
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-5 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors duration-200">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors duration-200">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500 transition-colors duration-200">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center mt-8 text-xs text-gray-400 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Food Save Platform. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
