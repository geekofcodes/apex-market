import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Typography, Link, Grid, Card, CardContent, InputAdornment, Snackbar, Alert } from '@mui/material';
import * as Yup from 'yup';
import authService from '../../services/authService';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const [alertOpen, setAlertOpen] = useState(false);

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    console.log('Submitting form with values:', values);
    try {
      const response = await authService.login(values);
      console.log(response);
      // Handle successful login, e.g., redirect to dashboard
    } catch (error) {
      console.error(error.message);
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
              <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }} variant="filled">
                Please fill in all the required fields.
              </Alert>
            </Snackbar>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
