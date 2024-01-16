import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom/cjs/react-router-dom'
import Home from '../Home'
import Login from '../authentication/Login'
import SignUp from '../authentication/Signup'
import Navbar from '../../components/Navbar'

const Routes = () => {
  const isLoggedIn = true;

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes