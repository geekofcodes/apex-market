import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row items-center md:justify-between">
          <div className="mb-4 md:mb-0 sm:flex-col sm:items-center">
            <h3 className="text-2xl font-bold mb-2">Connect with us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaLinkedin />
              </a>
            </div>
          </div>
          <div className='sm:flex-col sm:items-center'>
            <h3 className="text-2xl font-bold mb-2">Contact Us</h3>
            <p className="text-gray-300">Email: contact@geekofcodes.com</p>
            <p className="text-gray-300">Phone: +1 123-456-7890</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-300">&copy; 2024 ApexMarket. All rights reserved. Developed by GeekofCodes</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
