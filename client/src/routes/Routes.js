import React, { useState, useEffect } from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom/cjs/react-router-dom'
import Home from '../pages/Home'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Login from '../pages/authentication/Login'
import Signup from '../pages/authentication/Signup'
import UserProfile from '../pages/user/UserProfile'
import ProductList from '../pages/product/ProductList'

const Routes = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Check session storage for login state and userId on component mount
    const storedLoggedIn = sessionStorage.getItem('isLoggedIn');
    const storedUserId = sessionStorage.getItem('userId');
    console.log(storedUserId)

    if (storedLoggedIn === 'true' && storedUserId) {
      setLoggedIn(true);
      setUserId(storedUserId);
    }
  }, []);

  const handleLogin = () => {
    // Save login state in session storage
    sessionStorage.setItem('isLoggedIn', 'true');
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Remove login state from session storage
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userId');
    setLoggedIn(false);
    setUserId(null);
  };

  return (
    <HashRouter>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} userId={userId} cartCount={cartCount} />
      <Switch>
        <Route 
          path="/" 
          exact
          render={(props) => <Home {...props} userId={userId} setCartCount={setCartCount} />} 
          // component={Home} 
        />
        <Route
          path="/auth/login"
          render={(props) => <Login {...props} onLogin={handleLogin} />}
        />
        <Route path="/auth/signup" exact component={Signup} />
        <Route path="/profile" exact component={UserProfile} />
        <Route path="/products" exact render={(props) => <ProductList {...props} userId={userId} />} />
      </Switch>
      <Footer />
    </HashRouter>
  )
}

export default Routes