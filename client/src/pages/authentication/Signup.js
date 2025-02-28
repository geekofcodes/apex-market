// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Formik, Form, Field } from 'formik';
// import { TextField, Button, Typography, Link, Grid, Card, CardContent, InputAdornment, IconButton, Tooltip, LinearProgress } from '@mui/material';
// import * as Yup from 'yup';
// import { motion } from 'framer-motion';
// import zxcvbn from 'zxcvbn';
// import authService from '../../services/authService';
// import EmailIcon from '@mui/icons-material/Email';
// import LockIcon from '@mui/icons-material/Lock';
// import PersonIcon from '@mui/icons-material/Person';
// import LockOpenIcon from '@mui/icons-material/LockOpen';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import logo from '../../assets/images/logos/logo_transparent.png';
// import Swal from 'sweetalert2'

// const SignupSchema = Yup.object().shape({
//   name: Yup.string().required('Name is required'),
//   email: Yup.string()
//     .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format')
//     .required('Email is required'),
//   password: Yup.string()
//     .matches(
//       /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/,
//       'Password must contain 1 capital letter, 1 number, 1 special character, and be at least 6 characters long'
//     )
//     .required('Password is required'),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password'), null], 'Passwords must match')
//     .required('Confirm Password is required'),
// });

// const Signup = () => {
//   const [passwordStrength, setPasswordStrength] = useState(0);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const navigate = useNavigate()

//   const initialValues = {
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   };

//   const handleSubmit = async (values, { resetForm }) => {
//     try {
//       const response = await authService.register(values);
//       console.log(response);
//       Swal.fire({
//         title: 'Success!',
//         text: `You have been signed up, ${values.name}!`,
//         icon: 'success',
//         confirmButtonText: 'OK'
//       }).then(() => {
//         navigate('/auth/verify-email'); // Navigate to verifyEmail page
//       });
//       resetForm();
//     } catch (error) {
//       console.error(error.message);
//       Swal.fire({
//         title: 'Error!',
//         text: 'There was a problem with your signup. Please try again.',
//         icon: 'error',
//         confirmButtonText: 'OK'
//       });
//     }
//   };

//   const handlePasswordChange = (password) => {
//     const { score } = zxcvbn(password);
//     setPasswordStrength((score + 1) * 20);
//   };

//   return (
//     <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
//       <Grid item xs={12} sm={8} md={6} lg={4}>
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Card elevation={3} style={{ padding: '20px', borderRadius: '16px', maxWidth: '400px', margin: 'auto' }}>
//             <CardContent>
//               <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
//                 <img src={logo} alt="Logo" style={{ width: '100px', height: '100px' }} />
//               </div>
//               <Typography variant="h4" align="center" gutterBottom style={{ color: '#3f51b5', fontFamily: 'Poppins' }}>
//                 Sign Up
//               </Typography>
//               <Formik initialValues={initialValues} validationSchema={SignupSchema} onSubmit={handleSubmit}>
//                 {({ values, handleChange }) => (
//                   <Form>
//                     <Grid container spacing={2} direction="column">
//                       <Grid item>
//                         <Field
//                           as={TextField}
//                           name="name"
//                           label="Name"
//                           fullWidth
//                           variant="outlined"
//                           size="small"
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <PersonIcon />
//                               </InputAdornment>
//                             ),
//                           }}
//                         />
//                       </Grid>
//                       <Grid item>
//                         <Field
//                           as={TextField}
//                           name="email"
//                           label="Email"
//                           fullWidth
//                           variant="outlined"
//                           size="small"
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <EmailIcon />
//                               </InputAdornment>
//                             ),
//                             inputMode: 'email',
//                           }}
//                         />
//                       </Grid>
//                       <Grid item>
//                         <Tooltip title="Password must contain 1 capital letter, 1 number, 1 special character, and be at least 6 characters long">
//                           <Field
//                             as={TextField}
//                             name="password"
//                             label="Password"
//                             type={showPassword ? 'text' : 'password'}
//                             fullWidth
//                             variant="outlined"
//                             size="small"
//                             onChange={(e) => {
//                               handleChange(e);
//                               handlePasswordChange(e.target.value);
//                             }}
//                             InputProps={{
//                               startAdornment: (
//                                 <InputAdornment position="start">
//                                   <LockIcon />
//                                 </InputAdornment>
//                               ),
//                               endAdornment: (
//                                 <InputAdornment position="end">
//                                   <IconButton
//                                     onClick={() => setShowPassword((prev) => !prev)}
//                                     edge="end"
//                                   >
//                                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                                   </IconButton>
//                                 </InputAdornment>
//                               ),
//                             }}
//                           />
//                         </Tooltip>
//                         <LinearProgress
//                           variant="determinate"
//                           value={passwordStrength}
//                           style={{ marginTop: '8px' }}
//                           color={passwordStrength < 60 ? 'error' : passwordStrength < 80 ? 'warning' : 'success'}
//                         />
//                       </Grid>
//                       <Grid item>
//                         <Field
//                           as={TextField}
//                           name="confirmPassword"
//                           label="Confirm Password"
//                           type={showConfirmPassword ? 'text' : 'password'}
//                           fullWidth
//                           variant="outlined"
//                           size="small"
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <LockOpenIcon />
//                               </InputAdornment>
//                             ),
//                             endAdornment: (
//                               <InputAdornment position="end">
//                                 <IconButton
//                                   onClick={() => setShowConfirmPassword((prev) => !prev)}
//                                   edge="end"
//                                 >
//                                   {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//                                 </IconButton>
//                               </InputAdornment>
//                             ),
//                           }}
//                         />
//                       </Grid>
//                     </Grid>

//                     <motion.div whileHover={{ scale: 1.05 }}>
//                       <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
//                         Sign Up
//                       </Button>
//                     </motion.div>

//                     <Typography variant="body2" style={{ marginTop: '16px', textAlign: 'center' }}>
//                       Already have an account? <Link href="#/auth/login">Log in</Link>
//                     </Typography>
//                   </Form>
//                 )}
//               </Formik>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </Grid>
//     </Grid>
//   );
// };

// export default Signup;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, Typography, Link, Grid, Card, CardContent, InputAdornment, IconButton, Tooltip, LinearProgress, CircularProgress } from '@mui/material';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import zxcvbn from 'zxcvbn';
import authService from '../../services/authService';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import logo from '../../assets/images/logos/logo_transparent.png';
import Swal from 'sweetalert2';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/,
      'Password must contain 1 capital letter, 1 number, 1 special character, and be at least 6 characters long'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Signup = () => {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loader
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const response = await authService.register(values);
      console.log(response);
      Swal.fire({
        title: 'Success!',
        text: `You have been signed up, ${values.name}!`,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/auth/verify-email');
      });
      resetForm();
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        title: 'Error!',
        text: 'There was a problem with your signup. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (password) => {
    const { score } = zxcvbn(password);
    setPasswordStrength((score + 1) * 20);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card elevation={3} style={{ padding: '20px', borderRadius: '16px', maxWidth: '400px', margin: 'auto' }}>
            <CardContent>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <img src={logo} alt="Logo" style={{ width: '100px', height: '100px' }} />
              </div>
              <Typography variant="h4" align="center" gutterBottom style={{ color: '#3f51b5', fontFamily: 'Poppins' }}>
                Sign Up
              </Typography>
              <Formik initialValues={initialValues} validationSchema={SignupSchema} onSubmit={handleSubmit}>
                {({ values, handleChange, isValid }) => (
                  <Form>
                    <Grid container spacing={2} direction="column">
                      <Grid item>
                        <Field
                          as={TextField}
                          name="name"
                          label="Name"
                          fullWidth
                          variant="outlined"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonIcon />
                              </InputAdornment>
                            ),
                          }}
                          error={!!values.name}
                          helperText={<ErrorMessage name="name" component="div" style={{ color: 'red' }} />}
                        />
                      </Grid>
                      <Grid item>
                        <Field
                          as={TextField}
                          name="email"
                          label="Email"
                          fullWidth
                          variant="outlined"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon />
                              </InputAdornment>
                            ),
                            inputMode: 'email',
                          }}
                          error={!!values.email}
                          helperText={<ErrorMessage name="email" component="div" style={{ color: 'red' }} />}
                        />
                      </Grid>
                      <Grid item>
                        <Tooltip title="Password must contain 1 capital letter, 1 number, 1 special character, and be at least 6 characters long">
                          <Field
                            as={TextField}
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            variant="outlined"
                            size="small"
                            onChange={(e) => {
                              handleChange(e);
                              handlePasswordChange(e.target.value);
                            }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LockIcon />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    edge="end"
                                  >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Tooltip>
                        <LinearProgress
                          variant="determinate"
                          value={passwordStrength}
                          style={{ marginTop: '8px' }}
                          color={passwordStrength < 60 ? 'error' : passwordStrength < 80 ? 'warning' : 'success'}
                        />
                      </Grid>
                      <Grid item>
                        <Field
                          as={TextField}
                          name="confirmPassword"
                          label="Confirm Password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          fullWidth
                          variant="outlined"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockOpenIcon />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                                  edge="end"
                                >
                                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          error={!!values.confirmPassword}
                          helperText={<ErrorMessage name="confirmPassword" component="div" style={{ color: 'red' }} />}
                        />
                      </Grid>
                    </Grid>

                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{
                          marginTop: '16px',
                          backgroundColor: !isValid || loading ? '#ccc' : '#3f51b5',
                        }}
                        disabled={!isValid || loading}
                      >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
                      </Button>
                    </motion.div>

                    <Typography variant="body2" style={{ marginTop: '16px', textAlign: 'center' }}>
                      Already have an account? <Link href="#/auth/login">Log in</Link>
                    </Typography>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default Signup;




