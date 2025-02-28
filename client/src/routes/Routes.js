// import React, { useState, useEffect } from 'react'
// import { Routes, Route, HashRouter } from 'react-router-dom'
// import Home from '../pages/Home'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
// import Login from '../pages/authentication/Login'
// import Signup from '../pages/authentication/Signup'
// import UserProfile from '../pages/user/UserProfile'
// import CartItem from '../pages/cart/CartItem'
// import cartService from '../services/cartService';
// import VerifyEmail from '../pages/authentication/verifyEmail'

// const MainRoutes = () => {
//   const [isLoggedIn, setLoggedIn] = useState(false);
//   const [userId, setUserId] = useState(null);
//   const [cartCount, setCartCount] = useState(0);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     // Check session storage for login state and userId on component mount
//     const storedLoggedIn = sessionStorage.getItem('isLoggedIn');
//     const storedUserId = sessionStorage.getItem('userId');
//     console.log(storedUserId)

//     if (storedLoggedIn === 'true' && storedUserId) {
//       setLoggedIn(true);
//       setUserId(storedUserId);
//       fetchCartCount(userId)
//     }
//   }, []);

//   const fetchCartCount = async (userId) => {
//     try {
//       if (userId) {
//         const cartCountResponse = await cartService.getCartCount(userId);
//         console.log(cartCountResponse)
//         // setCartCount(cartCountResponse);
//         setCartCount(cartCountResponse);
//       }
//     } catch (error) {
//       console.error('Error fetching cart count:', error);
//     }
//   };

//   const handleLogin = () => {
//     // Save login state in session storage
//     sessionStorage.setItem('isLoggedIn', 'true');
//     setLoggedIn(true);
//   };

//   const handleLogout = () => {
//     // Remove login state from session storage
//     sessionStorage.removeItem('isLoggedIn');
//     sessionStorage.removeItem('userId');
//     setLoggedIn(false);
//     setUserId(null);
//   };

//   const handleSearchChange = (query) => {
//     setSearchQuery(query);
//   };

//   return (
//     <HashRouter>
//       <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} userId={userId} cartCount={cartCount} onSearchChange={handleSearchChange} />
//       <Routes>
//         <Route
//           path="/"
//           exact
//           element={<Home userId={userId} setCartCount={setCartCount} searchQuery={searchQuery} />}
//         />
//         <Route
//           path="/auth/login"
//           element={<Login onLogin={handleLogin} />}
//         />
//         <Route path="/auth/signup" exact element={<Signup />} />
//         <Route path="/auth/verify-email" exact element={<VerifyEmail />} />
//         <Route path="/profile" exact element={<UserProfile />} />
//         <Route
//           path="/cart"
//           exact
//           element={<CartItem userId={userId} setCartCount={setCartCount} />}
//         />
//       </Routes>
//       <Footer />
//     </HashRouter>
//   )
// }

// export default MainRoutes

import React, { useState, useEffect } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UserProfile from '../pages/user/UserProfile';
import CartItem from '../pages/cart/CartItem';
import cartService from '../services/cartService';
import Login from '../pages/authentication/Login';
import Signup from '../pages/authentication/Signup';
import VerifyEmail from '../pages/authentication/verifyEmail';
import ForgotPassword from '../pages/authentication/forgotPassword';
import ResetPassword from '../pages/authentication/resetPassword';

const MainRoutes = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedLoggedIn = sessionStorage.getItem('isLoggedIn');
    const storedUserId = sessionStorage.getItem('userId');

    if (storedLoggedIn === 'true' && storedUserId) {
      setLoggedIn(true);
      setUserId(storedUserId);
      fetchCartCount(storedUserId);
    }
  }, []);

  const fetchCartCount = async (userId) => {
    try {
      if (userId) {
        const cartCountResponse = await cartService.getCartCount(userId);
        setCartCount(cartCountResponse);
      }
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userId');
    setLoggedIn(false);
    setUserId(null);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <HashRouter>
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        userId={userId}
        cartCount={cartCount}
        onSearchChange={handleSearchChange}
      />
      <Routes>
        <Route path="/" element={<Home userId={userId} setCartCount={setCartCount} searchQuery={searchQuery} />} />

        {/* Conditionally render AuthRoutes based on login status */}
        {!isLoggedIn &&
          <>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/verify-email" element={<VerifyEmail />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
          </>
        }

        {/* User Profile and Cart Routes for logged-in users */}
        {isLoggedIn && (
          <>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/cart" element={<CartItem userId={userId} setCartCount={setCartCount} />} />
          </>
        )}
      </Routes>
      <Footer />
    </HashRouter>
  );
};

export default MainRoutes;
