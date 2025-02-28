// import React from 'react';
// import { Route } from 'react-router-dom';
// import Login from '../pages/authentication/Login';
// import Signup from '../pages/authentication/Signup';
// import VerifyEmail from '../pages/authentication/verifyEmail';
// import ForgotPassword from '../pages/authentication/forgotPassword';
// import ResetPassword from '../pages/authentication/resetPassword';

// const AuthRoutes = () => [
//   <Route key="login" path="/auth/login" element={<Login />} />,
//   <Route key="signup" path="/auth/signup" element={<Signup />} />,
//   <Route key="verify-email" path="/auth/verify-email" element={<VerifyEmail />} />,
//   <Route key="forgot-password" path="/auth/forgot-password" element={<ForgotPassword />} />,
//   <Route key="reset-password" path="/auth/reset-password/:token" element={<ResetPassword />} />
// ];

// export default AuthRoutes;


import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/authentication/Login';
import Signup from '../pages/authentication/Signup';
import VerifyEmail from '../pages/authentication/verifyEmail';
import ForgotPassword from '../pages/authentication/forgotPassword';
import ResetPassword from '../pages/authentication/resetPassword';

const AuthRoutes = () => (
  <>
    <Route path="/auth/login" element={<Login />} />
    <Route path="/auth/signup" element={<Signup />} />
    <Route path="/auth/verify-email" element={<VerifyEmail />} />
    <Route path="/auth/forgot-password" element={<ForgotPassword />} />
    <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
  </>
);

export default AuthRoutes;
