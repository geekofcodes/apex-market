import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import MadeWithLove from 'react-made-with-love';

const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row items-center md:justify-between">
          <div className="mb-4 md:mb-0 sm:flex-col sm:items-center">
            <h3 className="text-2xl font-bold mb-2">Connect with us</h3>
            <div className="flex space-x-4">
              <a href="www.facebook.com" className="text-gray-300 hover:text-white">
                <FaFacebook />
              </a>
              <a href="www.twitter.com" className="text-gray-300 hover:text-white">
                <FaTwitter />
              </a>
              <a href="www.instagram.com" className="text-gray-300 hover:text-white">
                <FaInstagram />
              </a>
              <a href="www.linkedin.com" className="text-gray-300 hover:text-white">
                <FaLinkedin />
              </a>
            </div>
          </div>
          <div className='sm:flex-col sm:items-center'>
            <h3 className="text-2xl font-bold mb-2">Contact Us</h3>
            <p className="text-gray-300">Email: contact@geekofcodes.com</p>
            <p className="text-gray-300">Phone: 9531876577</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-300">&copy; {currentYear} ApexMarket. All rights reserved.</p>
          <p className="text-sm mt-2 lg:mt-0"><MadeWithLove by="Geek of Codes" emoji /></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
