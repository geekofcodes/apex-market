import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          ApexMarket
        </Link>

        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-white">
            Home
          </Link>
          <Link to="/account" className="text-white">
            Account
          </Link>
          <Link to="/cart" className="text-white">
            Cart
          </Link>
          <Link to="/profile" className="text-white">
            User Profile
          </Link>
          <Link to="/login" className="text-white">
            Login
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          {isMobileMenuOpen ? (
            <FaTimes onClick={toggleMobileMenu} className="text-white text-2xl cursor-pointer" />
          ) : (
            <FaBars onClick={toggleMobileMenu} className="text-white text-2xl cursor-pointer" />
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-14 left-0 right-0 bg-gray-800">
            <div className="flex flex-col space-y-4 p-4">
              <Link to="/" className="text-white">
                Home
              </Link>
              <Link to="/account" className="text-white">
                Account
              </Link>
              <Link to="/cart" className="text-white">
                Cart
              </Link>
              <Link to="/profile" className="text-white">
                User Profile
              </Link>
              <Link to="/login" className="text-white">
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
