import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Button, Typography, Box, CircularProgress, Snackbar, Alert, Card } from "@mui/material";
import * as Yup from "yup";
import authService from "../../services/authService";
import { motion } from "framer-motion";

// Validation Schema for Reset Password
const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const ResetPassword = () => {
  const { token } = useParams(); // Get the reset token from URL params
  const navigate = useNavigate();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setAlertMessage("Invalid or expired reset token.");
      setAlertSeverity("error");
      setAlertOpen(true);
      navigate("/auth/forgot-password");
    }
  }, [token]);

  const handleAlertClose = () => {
    setAlertOpen(false);
    setAlertMessage("");
    setAlertSeverity("error");
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true); // Show loader
    try {
      await authService.resetPassword(token, values.password);
      setAlertSeverity("success");
      setAlertMessage("Password reset successful. You can now login.");
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
    <Box
      display="flex"
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
            Reset Password
          </Typography>

          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={ResetPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid, dirty, isSubmitting }) => (
              <Form>
                <Box display="flex" justifyContent="center" mb={3}>
                  <Field
                    as={TextField}
                    name="password"
                    label="New Password"
                    type="password"
                    size="small"
                    fullWidth
                    variant="outlined"
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

                <Box display="flex" justifyContent="center" mb={3}>
                  <Field
                    as={TextField}
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    size="small"
                    fullWidth
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="confirmPassword"
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
                      {isLoading ? "Resetting..." : "Reset Password"}
                    </Button>
                  </motion.div>
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
    </Box>
  );
};

export default ResetPassword;
