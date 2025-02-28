import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Button, Typography, Link, Grid, Card, Box, CircularProgress, Snackbar, Alert } from "@mui/material";
import * as Yup from "yup";
import authService from "../../services/authService";
import { motion } from "framer-motion";

// Validation Schema for Forgot Password
const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const initialValues = {
    email: "",
  };

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAlertClose = () => {
    setAlertOpen(false);
    setAlertMessage("");
    setAlertSeverity("error");
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true); // Show loader
    try {
      await authService.forgotPassword(values.email);
      setAlertSeverity("success");
      setAlertMessage("Password reset email sent successfully");
      setAlertOpen(true);
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (error) {
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
            Forgot Password
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={ForgotPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid, dirty, isSubmitting }) => (
              <Form>
                <Box display="flex" justifyContent="center" mb={3}>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    size="small"
                    fullWidth
                    variant="outlined"
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
                        backgroundColor: !isValid || !dirty ? "#c5c6d0" : "#3f51b5",
                        color: !isValid || !dirty ? "#6b7280" : "#fff",
                        fontWeight: "bold",
                        padding: "10px 30px",
                        borderRadius: "8px",
                        textTransform: "none",
                      }}
                      startIcon={isLoading ? <CircularProgress size={20} /> : null}
                    >
                      {isLoading ? "Sending..." : "Send Reset Link"}
                    </Button>
                  </motion.div>
                </Box>

                <Box display="flex" justifyContent="center" mt={2}>
                  <Typography variant="body2" align="center">
                    Remember your password?{" "}
                    <Link
                      href="#/auth/login"
                      style={{
                        fontWeight: "bold",
                        color: "#3f51b5",
                        textDecoration: "none",
                      }}
                    >
                      Login
                    </Link>
                  </Typography>
                </Box>
              </Form>
            )}
          </Formik>
        </Card>
      </motion.div>

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

export default ForgotPassword;
