import React, { useState } from "react";
import api from "../config/AxiosInterceptor";
import {
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import pagebg from "../assets/pagebg.jpg";
import Townhouse from "../assets/modern_villa.jpg";

const palette = {
  navy: "#0B1F3A",
  accent: "#632F97",
  background: {
    soft: "#F7F6F2",
    light: "#EEECE7",
  },
  text: {
    primary: "#1C2C46",
    secondary: "#5E6C84",
  },
};

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email address";
    if (!formData.password) newErrors.password = "New password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await api.put("/api/v1/users/reset-password", formData);
      toast.success("Password has been reset successfully!");
      navigate("/otp-reset", { state: { email: formData.email }});
    } catch (err) {
      toast.error(err.response?.data?.errorMessage || "An unexpected error occurred.");
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${pagebg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Grid container sx={{ maxWidth: "960px", boxShadow: 3, borderRadius: 2, overflow: "hidden" }}>
        {/* Left: Reset Password Form */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: palette.background.light,
            p: { xs: 3, sm: 5 },
          }}
        >
          <Box sx={{ maxWidth: 400, width: "100%", mx: "auto" }}>
            <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: palette.navy }}>
              Reset Password
            </Typography>
            <Typography variant="body1" sx={{ color: palette.text.secondary, mb: 4 }}>
              Enter your email and new password to reset.
            </Typography>

            <Box component="form" onSubmit={handleResetPassword}>
              <TextField
                fullWidth
                size="small"
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                fullWidth
                size="small"
                label="New Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <Box component="span">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        sx={{ color: palette.text.secondary }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </Box>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: "none",
                  backgroundColor: palette.accent,
                  "&:hover": { backgroundColor: "#4d1f8f" },
                }}
              >
                Reset Password
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Right: Image + Overlay */}
        <Grid
          item
          xs={0}
          md={6}
          sx={{
            position: "relative",
            backgroundImage: `url(${Townhouse})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
  sx={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(to top, rgba(11,31,58,0.85), rgba(11,31,58,0.3))",
    color: "#fff", // ensures all text is white
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    p: { xs: 3, md: 6 },
  }}
>
  <Typography variant="h3" fontWeight={700}>
    Secure Your Account
  </Typography>
  <Typography
    variant="body1"
    sx={{
      mt: 2,
      maxWidth: 400,
      color: "#fff", // make paragraph text white
    }}
  >
    Reset your password to regain access and ensure your account's security.
  </Typography>
</Box>

        </Grid>
      </Grid>
    </Box>
  );
};

export default ForgetPassword;
