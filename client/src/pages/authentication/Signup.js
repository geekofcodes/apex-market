import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Typography, Link, Grid, Card, CardContent, InputAdornment, Tooltip } from '@mui/material';
import * as Yup from 'yup';
import authService from '../../services/authService';
import InfoIcon from '@mui/icons-material/Info';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    'Invalid email format'
  ).required('Email is required'),
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
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await authService.register(values);
      console.log(response);
      resetForm();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
        <Card elevation={3} style={{ padding: '20px' }}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Sign Up
            </Typography>
            <Formik initialValues={initialValues} validationSchema={SignupSchema} onSubmit={handleSubmit}>
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
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
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                  <Grid item xs={12} sm={6}>
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
                        endAdornment: (
                          <Tooltip title="Password must contain 1 capital letter, 1 number, 1 special character, and be at least 6 characters long">
                            <InputAdornment position="end">
                              <InfoIcon />
                            </InputAdornment>
                          </Tooltip>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      fullWidth
                      variant="outlined"
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOpenIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>

                <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
                  Sign Up
                </Button>

                <Typography variant="body2" style={{ marginTop: '16px' }}>
                  Already have an account? <Link href="#/auth/login">Log in</Link>
                </Typography>
              </Form>
            </Formik>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Signup;
