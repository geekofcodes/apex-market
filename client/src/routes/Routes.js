import React, { useState, useEffect } from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom/cjs/react-router-dom'
import Home from '../pages/Home'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Login from '../pages/authentication/Login'
import Signup from '../pages/authentication/Signup'
import UserProfile from '../pages/user/UserProfile'

const Routes = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check session storage for login state on component mount
    const storedLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (storedLoggedIn === 'true') {
      setLoggedIn(true);
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
    setLoggedIn(false);
  };

  return (
    <HashRouter>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/auth/login"
          render={(props) => <Login {...props} onLogin={handleLogin} />}
        />
        <Route path="/auth/signup" exact component={Signup} />
        <Route path="/profile" exact component={UserProfile} />
      </Switch>
      <Footer />
    </HashRouter>
  )
}

export default Routes