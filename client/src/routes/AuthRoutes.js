import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import Login from '../pages/authentication/Login';
import Signup from '../pages/authentication/Signup';

const AuthRoutes = () => {
  return (
    <Switch>
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/signup" component={Signup} />
    </Switch>
  );
};

export default AuthRoutes;
