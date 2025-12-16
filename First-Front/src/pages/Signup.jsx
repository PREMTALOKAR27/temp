import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Container,
  Link,
  Divider,
  InputAdornment,
  IconButton,
  MenuItem,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import modern_villa from "../assets/modern_villa.jpg";
import pagebg from "../assets/pagebg.jpg";
import { FaSpinner } from "react-icons/fa";
import axios from "../config/AxiosInterceptor";
import { toast } from "react-toastify";

const palette = {
  navy: "#0B1F3A",
  sapphire: "#3B4C68",
  background: {
    soft: "#F7F6F2",
    light: "#EEECE7",
  },
  accent: "#632F97", // purple accent
  text: {
    primary: "#1C2C46",
    secondary: "#5E6C84",
  },
};

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    role: "USER",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "", phone_number: "", password: "" };

    if (!formData.name) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }
    if (!formData.phone_number) {
      newErrors.phone_number = "Phone number is required";
      valid = false;
    } else if (!/^\d{10}$/.test(formData.phone_number)) {
      newErrors.phone_number = "Please enter a valid 10-digit phone number";
      valid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  try {
    setIsLoading(true);

    const response = await axios.post(
      "https://first-buy.in/api/v1/users/signup",
      formData
    );

    if (response.data?.success || response.status === 201) {
      toast.success("Signup successful! Please verify your email via OTP.");
      navigate("/otp-verification", { state: { email: formData.email } });
    } else {
      // Backend returned success: false but 200 status
      const backendMessage = response.data?.errorMessage || "Signup failed.";
      if (backendMessage.toLowerCase().includes("email")) {
        setErrors((prev) => ({ ...prev, email: backendMessage }));
      } else {
        toast.error(backendMessage);
      }
    }
  } catch (error) {
    const backendMessage =
      error.response?.data?.errorMessage ||
      error.response?.data?.message ||
      error.message ||
      "Something went wrong.";

    // Show inline error if it's email-related
    if (backendMessage.toLowerCase().includes("email")) {
      setErrors((prev) => ({ ...prev, email: backendMessage }));
    } else if (backendMessage.toLowerCase().includes("phone")) {
      setErrors((prev) => ({ ...prev, phone_number: backendMessage }));
    } else {
      toast.error(backendMessage);
    }
  } finally {
    setIsLoading(false);
  }
};

  const textFieldStyles = {
    "& .MuiInputLabel-root": { color: palette.text.secondary },
    "& .MuiOutlinedInput-root": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(0, 0, 0, 0.23)",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: palette.sapphire,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: palette.accent,
        borderWidth: "2px",
      },
    },
    "& label.Mui-focused": {
      color: palette.accent,
    },
    "& .MuiFormHelperText-root": {
      "&.Mui-error": {
        color: "#d32f2f",
      },
    },
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: `url(${pagebg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        p: 2,
      }}
    >
      <Grid
        container
        sx={{
          maxWidth: "960px",
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {/* Left Side - Form */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            p: { xs: 3, sm: 5 },
          }}
        >
          <Box sx={{ maxWidth: 400, width: "100%" }}>
            <Typography
              variant="h4"
              fontWeight="700"
              gutterBottom
              sx={{ color: palette.navy }}
            >
              Create Your Account
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: palette.text.secondary, mb: 4 }}
            >
              Join us and explore exclusive properties.
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                required
                size="small"
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                error={Boolean(errors.name)}
                helperText={errors.name}
                sx={textFieldStyles}
              />

              <TextField
                fullWidth
                required
                size="small"
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                error={Boolean(errors.email)}
                helperText={errors.email}
                sx={textFieldStyles}
              />

              <TextField
                fullWidth
                required
                size="small"
                label="Phone Number"
                name="phone_number"
                type="tel"
                value={formData.phone_number}
                onChange={handleChange}
                margin="normal"
                error={Boolean(errors.phone_number)}
                helperText={errors.phone_number}
                sx={textFieldStyles}
              />

              <TextField
                select
                fullWidth
                required
                size="small"
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                margin="normal"
                sx={textFieldStyles}
              >
                <MenuItem value="USER">USER</MenuItem>
                <MenuItem value="BUILDER">BUILDER</MenuItem>
              </TextField>

              <TextField
                fullWidth
                required
                size="small"
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                error={Boolean(errors.password)}
                helperText={errors.password}
                sx={textFieldStyles}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        sx={{ color: palette.text.secondary }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: "600",
                  textTransform: "none",
                  backgroundColor: palette.accent,
                  "&:hover": {
                    backgroundColor: "#4d1f8f",
                  },
                }}
              >
                {isLoading ? <FaSpinner className="animate-spin" /> : "Sign Up"}
              </Button>

              <Divider
                sx={{
                  my: 3,
                  color: palette.text.secondary,
                  "&::before, &::after": {
                    borderColor: "rgba(0, 0, 0, 0.12)",
                  },
                }}
              >
                OR
              </Divider>

              <Typography
                variant="body2"
                align="center"
                sx={{ color: palette.text.secondary }}
              >
                Already have an account?{" "}
                <Link
                  component={RouterLink}
                  to="/login"
                  sx={{
                    fontWeight: "bold",
                    color: palette.accent,
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                    },
                  }}
                >
                  Log In
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Right Side - Image */}
        <Grid
          item
          xs={0}
          md={6}
          sx={{
            backgroundImage: `url(${modern_villa})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </Container>
  );
};

export default SignupPage;
