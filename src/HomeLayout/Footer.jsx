import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 py-8 mt-10 rounded-xl">
      <div className=" px-4 flex justify-between gap-6 text-center md:text-left">

        <div>
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-sm w-96">
            We are committed to reducing food waste by connecting restaurants and charities for meaningful food distribution.
          </p>
        </div>



   
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-600">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-sky-500">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-6 text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Food Save Platform. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
