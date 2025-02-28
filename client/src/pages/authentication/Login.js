// Importing necessary components from MUI and other libraries
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  TextField,
  Button,
  Typography,
  Link,
  Grid,
  Card,
  InputAdornment,
  Snackbar,
  Alert,
  Box,
  CircularProgress,
  Switch,
  FormControlLabel,
} from "@mui/material";
import * as Yup from "yup";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { motion } from "framer-motion";
import authService from "../../services/authService";
import cartService from "../../services/cartService";
import logo from "../../assets/images/logos/logo_transparent.png";

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = ({ onLogin }) => {
  const initialValues = {
    email: "",
    password: "",
    rememberMe: false, // Remember me field
  };

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if credentials are stored in localStorage
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      initialValues.email = storedEmail;
      initialValues.rememberMe = true;
    }
  }, []);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
    setAlertMessage("");
    setAlertSeverity("error");
  };

  const fetchCartCount = async (userId) => {
    try {
      const cartCountResponse = await cartService.getCartCount(userId);
      console.log("Cart Count after login:", cartCountResponse.count);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true); // Show loader
    try {
      const response = await authService.login(values);
      const { user } = response;

      // If "Remember Me" is checked, save email to localStorage
      if (values.rememberMe) {
        localStorage.setItem("email", values.email);
      } else {
        localStorage.removeItem("email");
      }

      sessionStorage.setItem("userId", user._id);
      sessionStorage.setItem("userName", user.name);
      sessionStorage.setItem("userEmail", user.email);
      sessionStorage.setItem("isLoggedIn", "true");
      onLogin();
      fetchCartCount(user._id);

      setAlertSeverity("success");
      setAlertMessage("Login successful");
      setAlertOpen(true);
      navigate("/");
    } catch (error) {
      console.error(error.message);
      setAlertMessage(error.message || "An error occurred. Please try again.");
      setAlertOpen(true);
    } finally {
      setIsLoading(false); // Hide loader
      setSubmitting(false);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh", background: "#f9fafb", padding: "10px" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card
          elevation={3}
          style={{
            maxWidth: "400px",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
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
              style={{ width: "80px", marginBottom: "10px" }}
            />
          </Box>

          {/* Title */}
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            style={{
              fontWeight: "bold",
              color: "#3f51b5",
              fontFamily: "Poppins",
              marginBottom: "10px",
            }}
          >
            Login
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid, dirty, isSubmitting, values, setFieldValue }) => (
              <Form>
                <Box display="flex" justifyContent="center" mb={2}>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    size="small"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                    style={{ width: "100%" }}
                    helperText={
                      <ErrorMessage
                        name="email"
                        render={(msg) => (
                          <Typography variant="caption" style={{ color: "red" }}>
                            {msg}
                          </Typography>
                        )}
                      />
                    }
                    required
                  />
                </Box>

                <Box display="flex" justifyContent="center" mb={3}>
                  <Field
                    as={TextField}
                    name="password"
                    label="Password"
                    type="password"
                    size="small"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                    }}
                    style={{ width: "100%" }}
                    helperText={
                      <ErrorMessage
                        name="password"
                        render={(msg) => (
                          <Typography variant="caption" style={{ color: "red" }}>
                            {msg}
                          </Typography>
                        )}
                      />
                    }
                    required
                  />
                </Box>

                {/* Remember Me and Forgot Password in the Same Line */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={values.rememberMe}
                        onChange={(e) => setFieldValue("rememberMe", e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Remember Me"
                  />
                  <Typography variant="body2" align="right" style={{ color: "#6b7280" }}>
                    <Link
                      href="#/auth/forgot-password"
                      style={{
                        color: "#3f51b5",
                        fontWeight: "bold",
                        textDecoration: "none",
                        fontSize: "14px",
                        transition: "color 0.3s ease, transform 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "#ff4081";
                        e.target.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "#3f51b5";
                        e.target.style.transform = "scale(1)";
                      }}
                    >
                      Forgot Password?
                    </Link>
                  </Typography>
                </Box>

                {/* Login Button */}
                <Box display="flex" justifyContent="center" mb={2}>
                  <motion.div
                    whileHover={{ scale: isValid && dirty ? 1.05 : 1 }}
                    whileTap={{ scale: isValid && dirty ? 0.95 : 1 }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={!isValid || !dirty || isSubmitting}
                      style={{
                        backgroundColor: !isValid || !dirty
                          ? "#c5c6d0"
                          : "#3f51b5",
                        color: !isValid || !dirty ? "#6b7280" : "#fff",
                        fontWeight: "bold",
                        padding: "10px 30px",
                        borderRadius: "8px",
                        textTransform: "none",
                      }}
                      startIcon={isLoading ? <CircularProgress size={20} /> : null}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                  </motion.div>
                </Box>

                {/* Signup Link */}
                <Box display="flex" justifyContent="center" mt={2}>
                  <Typography variant="body2" align="center">
                    Don't have an account?{" "}
                    <Link
                      href="#/auth/signup"
                      style={{
                        fontWeight: "bold",
                        color: "#3f51b5",
                        textDecoration: "none",
                        transition: "color 0.3s ease, transform 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "#ff4081";
                        e.target.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "#3f51b5";
                        e.target.style.transform = "scale(1)";
                      }}
                    >
                      Sign Up
                    </Link>
                  </Typography>
                </Box>
              </Form>
            )}
          </Formik>
        </Card>
      </motion.div>

      {/* Alert Snackbar */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Login;
