import React, { useState } from "react";
import { TextField, Button, Typography, Box, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../config/AxiosInterceptor";
import { toast } from "react-toastify";
import pagebg from "../assets/pagebg.jpg";
import Townhouse from "../assets/Townhouse.jpg";

const palette = {
  navy: "#0B1F3A",
  accent: "#632F97",
  background: { light: "#EEECE7" },
  text: { secondary: "#5E6C84" },
};

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

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
      return;
    }
    if (otp.length !== 4) {
      setError("OTP must be exactly 4 digits.");
      return;
    }

    try {
      const response = await axios.post(
        "https://first-buy.in/api/v1/users/verify-otp",
        { email, otp },
        { responseType: "text" } // important for plain text responses
      );

      // backend returns plain text like "Otp verified successfully"
      const message = response.data?.trim() || "";

      if (message.toLowerCase().includes("otp verified")) {
        toast.success("Otp verified successfully 🎉");
        navigate("/login");
      } else {
        toast.error("Invalid OTP or verification failed");
      }
    } catch (err) {
      toast.error("OTP verification failed");
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
      <Grid
        container
        sx={{
          maxWidth: "960px",
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
          background: "rgba(255,255,255,0.1)",
        }}
      >
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
              Verify Your Account
            </Typography>
            <Typography variant="body1" sx={{ color: palette.text.secondary, mb: 4 }}>
              Enter the 4-digit OTP sent to your email.
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
            </Box>
          </Box>
        </Grid>

        {/* Right: Image */}
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
        />
      </Grid>
    </Box>
  );
};

export default OTPVerificationPage;
