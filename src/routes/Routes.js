import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom/cjs/react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/authentication/Login'
import SignUp from '../pages/authentication/Signup'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Routes = () => {

  return (
    <BrowserRouter>
      <Navbar  />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default Routes