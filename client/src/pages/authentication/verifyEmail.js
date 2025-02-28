import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Grid, Card, TextField, Box } from '@mui/material';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import logo from '../../assets/images/logos/logo_transparent.png';
import authService from '../../services/authService';

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleVerifyEmail = async () => {
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }

    try {
      await authService.verifyEmail({ code: otp }); // Call the verifyEmail API
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Your email has been verified successfully!',
      }).then(() => {
        navigate('/login'); // Redirect to login page
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Verification Failed',
        text: err.response?.data?.message || 'Invalid OTP. Please try again.',
      });
    }
  };

  const handleResendEmail = () => {
    Swal.fire({
      icon: 'info',
      title: 'Code Resent',
      text: 'A new verification code has been sent to your email.',
    });
    console.log('Resend verification code triggered');
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: '100vh', background: '#f9fafb', padding: '10px' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Card
          elevation={3}
          style={{
            maxWidth: '400px',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Logo Section */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            mb={2}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: '80px', marginBottom: '10px' }}
            />
          </Box>

          {/* Title and Description */}
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            style={{
              fontWeight: 'bold',
              color: '#3f51b5',
              fontFamily: 'Poppins',
              marginBottom: '10px',
            }}
          >
            Verify Email
          </Typography>
          <Typography
            variant="body2"
            align="center"
            style={{ color: '#6b7280', marginBottom: '20px' }}
          >
            Enter the OTP sent to your email to verify your account.
          </Typography>

          {/* OTP Input */}
          <Box display="flex" justifyContent="center" mb={3}>
            <TextField
              label="OTP"
              variant="outlined"
              size="small" // Reduced size for minimalism
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setError('');
              }}
              error={!!error}
              helperText={error}
              style={{
                width: '75%',
                textAlign: 'center',
              }}
            />
          </Box>

          {/* Buttons */}
          <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
            {/* Verify Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                onClick={handleVerifyEmail}
                style={{
                  backgroundColor: '#3f51b5',
                  color: '#fff',
                  fontWeight: 'bold',
                  padding: '10px 30px',
                  borderRadius: '8px',
                  textTransform: 'none',
                  marginBottom: '10px',
                }}
              >
                Verify
              </Button>
            </motion.div>

            {/* Resend Code Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outlined"
                onClick={handleResendEmail}
                style={{
                  color: '#3f51b5',
                  borderColor: '#3f51b5',
                  fontWeight: 'bold',
                  padding: '8px 30px',
                  borderRadius: '8px',
                  textTransform: 'none',
                }}
              >
                Resend Code
              </Button>
            </motion.div>
          </Box>

          {/* Footer Text */}
          <Typography
            variant="body2"
            align="center"
            style={{ color: '#9ca3af', marginTop: '20px' }}
          >
            Didn’t receive the email? Check your spam folder.
          </Typography>
        </Card>
      </motion.div>
    </Grid>
  );
};

export default VerifyEmail;
