import React, { useState } from "react";
import { TextField, Button, Typography, Box, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../config/AxiosInterceptor";
import { toast } from "react-toastify";
import Building3 from "../assets/building3.png";
import pagebg from "../assets/pagebg.jpg";
import Townhouse from "../assets/Townhouse.jpg";

const palette = {
  navy: "#0B1F3A",
  sapphire: "#3B4C68",
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

const OTPResetPass = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || sessionStorage.getItem("email");

  const handleChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
      setError("");
    } else {
      setError("OTP must be a 4-digit number.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError("OTP is required.");
    } else if (otp.length !== 4) {
      setError("OTP must be exactly 4 digits.");
    } else {
      try {
        console.log(otp, email);
        await axios.post("/api/v1/users/verify-otp-password", { otp, email });
        toast.success("Email Password updated successfully.");
        navigate("/login");
      } catch (err) {
        toast.error(err.response?.data?.message || "OTP verification failed");
        console.error(err);
      }
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
      <Grid container sx={{ maxWidth: "960px", boxShadow: 3, borderRadius: 2, overflow: "hidden", background: "rgba(255,255,255,0.1)" }}>
        {/* Left: OTP Form */}
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
              Reset Your Password
            </Typography>
            <Typography variant="body1" sx={{ color: palette.text.secondary, mb: 4 }}>
              Enter the 4-digit OTP sent to your email/phone to reset your password.
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                size="small"
                label="Enter OTP"
                name="otp"
                value={otp}
                onChange={handleChange}
                margin="normal"
                error={Boolean(error)}
                helperText={error}
                InputProps={{ style: { fontWeight: 500 } }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: "none",
                  backgroundColor: palette.accent,
                  "&:hover": { backgroundColor: "#4d1f8f" },
                }}
              >
                Verify OTP
              </Button>

              <Typography
                variant="body2"
                align="center"
                sx={{ mt: 2, color: palette.text.secondary }}
              >
                Didn't receive the OTP?{" "}
                <a href="/resend-otp" style={{ color: palette.accent, fontWeight: 600 }}>
                  Resend
                </a>
              </Typography>
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
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              p: { xs: 3, md: 6 },
            }}
          >
            <Typography variant="h3" fontWeight={700} sx={{ textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}>
              Secure Your Account
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 2,
                maxWidth: 400,
                textShadow: "1px 1px 4px rgba(0,0,0,0.5)",
              }}
            >
              Verify your email or phone number to proceed with secure access to your account.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OTPResetPass;
