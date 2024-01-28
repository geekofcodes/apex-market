// components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';
// import { useAuth } from '../contexts/AuthContext';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const { isLoggedIn, logout } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-white text-lg font-bold">
            ApexMarket
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex items-center justify-center w-1/2 md:w-1/3 ml-4 max-w-xs">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="py-1 px-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
            />
            <div className="absolute top-0 right-0 h-full flex items-center pr-2 text-gray-500">
              <FaSearch />
            </div>
          </div>
        </div>

        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-white">
            Home
          </Link>
          <Link to="/account" className="text-white">
            Account
          </Link>
          <Link to="/cart" className="text-white text-lg font-bold">
            <FaShoppingCart />
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="text-white">
                Profile
              </Link>
              <button className="text-white" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth/login" className="text-white">
              Login
            </Link>
          )}
          
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
          <div className="md:hidden absolute top-16 left-0 right-0 bg-gray-800">
            <div className="flex flex-col space-y-4 p-4 items-center">
              <Link to="/" className="text-white">
                Home
              </Link>
              <Link to="/account" className="text-white">
                Account
              </Link>
              <Link to="/cart" className="text-white text-lg font-bold">
                <FaShoppingCart className="mb-1" />
              </Link>
              {/* ... (existing links) */}
              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="text-white">
                    Profile
                  </Link>
                  <button className="text-white" onClick={onLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/auth/login" className="text-white">
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
