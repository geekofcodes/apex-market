import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Typography, Link, Grid, Card, CardContent, InputAdornment, Snackbar, Alert } from '@mui/material';
import * as Yup from 'yup';
import authService from '../../services/authService';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import cartService from '../../services/cartService';
// import { useAuth } from '../../contexts/AuthContext';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = ({ onLogin, setUserId }) => {
  // const { isLoggedIn, login } = useAuth();
  const initialValues = {
    email: '',
    password: '',
  };

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('error');
  const history = useHistory();

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
    setAlertMessage(''); // Clear the alert message when the Snackbar is closed
    setAlertSeverity('error'); // Reset alert severity to default
  };

  const fetchCartCount = async (userId) => {
    try {
      const cartCountResponse = await cartService.getCartCount(userId);
      console.log('Cart Count after login:', cartCountResponse.count);
      // You may want to update the cart count in your state or trigger a refresh
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    // console.log('Submitting form with values:', values);
    try {
      const response = await authService.login(values);
      const { user } = response;
      console.log(response);
      console.log(user._id)
      // Set userId in the parent component (Routes.js)
      setUserId(user._id);
      // Handle successful login, e.g., redirect to dashboard
      // Save login state in session storage
      sessionStorage.setItem('isLoggedIn', 'true');
      // Update the parent component (Route.js) about the successful login
      onLogin();
      // Fetch and log the cart count after successful login
      fetchCartCount(user._id);
      console.log(user._id) 
      setAlertSeverity('success');
      setAlertMessage('Login successful');
      setAlertOpen(true);
      // login();
      history.push('/'); // Redirect to home page after successful login
    } catch (error) {
      console.error(error.message);
      // Check if the error is due to validation issues (e.g., wrong email or password)
      if (error.message) {
        setAlertMessage(error.message);
      } else {
        // Show generic alert for other errors
        setAlertMessage('An error occurred. Please try again.');
      }
      // Show alert on validation error
      setAlertOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
        <Card elevation={3} style={{ padding: '20px' }}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Login
            </Typography>
            <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={handleSubmit}>
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="password"
                      label="Password"
                      type="password"
                      fullWidth
                      variant="outlined"
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>

                <Button type='submit' variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
                  Login
                </Button>

                <Typography variant="body2" style={{ marginTop: '16px' }}>
                  Don't have an account? <Link href="#/auth/signup">Sign up</Link>
                </Typography>
              </Form>
            </Formik>

            {/* Alert for empty fields */}
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
              <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: '100%' }} variant="filled">
                {alertMessage}
              </Alert>
            </Snackbar>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
