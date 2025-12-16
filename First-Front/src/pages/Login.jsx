import { useState } from "react";
import { authStore } from "../store/authStore";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Link,
  Divider,
  Stack,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Townhouse from "../assets/Townhouse.jpg";
import pagebg from "../assets/pagebg.jpg"; // background image

const palette = {
  navy: "#0B1F3A",
  sapphire: "#3B4C68",
  background: {
    soft: "#F7F6F2",
    light: "#EEECE7",
  },
  accent: "#632F97", // updated color
  text: {
    primary: "#1C2C46",
    secondary: "#5E6C84",
  },
};

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { login, isLoading } = authStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const result = await login(formData, navigate);
    if (result.success) {
      toast.success("Login successful");
    } else {
      toast.error(result.message);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorize/google`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: `url(${pagebg})`, // full page background
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        p: 2,
      }}
    >
      <ToastContainer />
      <Grid
        container
        sx={{
          maxWidth: "960px",
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {/* Left section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.9)", // translucent background
            p: { xs: 3, sm: 5 },
          }}
        >
          <Box sx={{ maxWidth: 400, width: "100%", mx: "auto" }}>
            <Typography
              variant="h4"
              fontWeight={700}
              gutterBottom
              sx={{ color: palette.navy }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: palette.text.secondary, mb: 4 }}
            >
              Please enter your details to sign in
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleGoogleLogin}
                  sx={{
                    textTransform: "none",
                    borderColor: palette.text.secondary,
                    color: palette.text.primary,
                    py: 1.2,
                    "&:hover": {
                      borderColor: palette.accent,
                      backgroundColor: "rgba(99, 47, 151, 0.08)",
                    },
                  }}
                >
                  <img
                    src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo.png"
                    alt="Google Logo"
                    style={{ width: 18, marginRight: 12 }}
                  />
                  Sign in with Google
                </Button>

                <Divider sx={{ color: palette.text.secondary }}>or</Divider>

                <TextField
                  fullWidth
                  size="small"
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />

                <TextField
                  fullWidth
                  size="small"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        sx={{ color: palette.text.secondary }}
                      />
                    }
                    label={
                      <Typography
                        variant="body2"
                        sx={{ color: palette.text.secondary }}
                      >
                        Remember me
                      </Typography>
                    }
                  />
                  <Link
                    component={RouterLink}
                    to="/reset-password"
                    sx={{
                      color: palette.accent,
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    Forgot password?
                  </Link>
                </Stack>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  fullWidth
                  sx={{
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: 600,
                    backgroundColor: palette.accent,
                    "&:hover": {
                      backgroundColor: "#4e2375", // darker purple
                    },
                  }}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </Stack>
            </Box>

            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 4, color: palette.text.secondary }}
            >
              Don’t have an account?{" "}
              <Link
                component={RouterLink}
                to="/signup"
                sx={{
                  color: palette.accent,
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Grid>

        {/* Right section */}
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
              background: `linear-gradient(to top, ${palette.navy}E6, ${palette.navy}33)`,
              color: palette.background.soft,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              p: { xs: 4, md: 6 },
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              fontWeight={700}
              sx={{ textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}
            >
              Your First Step to Homeownership Starts Here!
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                opacity: 0.9,
                textShadow: "1px 1px 4px rgba(0,0,0,0.5)",
              }}
            >
              Sign up for free, unlock all features and earn bonus rewards.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;
