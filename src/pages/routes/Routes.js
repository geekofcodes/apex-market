import React from 'react'
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom'
import Navbar from '../../components/Navbar'
import Home from '../Home'

const Routes = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route path="/">          
          <Home />
        </Route>
      </Switch>
    </React.Fragment>
  )
}

export default Routes