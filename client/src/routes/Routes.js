import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom/cjs/react-router-dom'
import Home from '../pages/Home'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Login from '../pages/authentication/Login'
import Signup from '../pages/authentication/Signup'

const Routes = () => {

  return (
    <HashRouter>
      <Navbar  />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth/login" exact component={Login} />
        <Route path="/auth/signup" exact component={Signup} />
      </Switch>
      <Footer />
    </HashRouter>
  )
}

export default Routes