import React from 'react'
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom/cjs/react-router-dom'
import Home from './pages/Home'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact element={<Home/>} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
