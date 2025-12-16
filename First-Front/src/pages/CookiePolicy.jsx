// src/pages/CookiePolicy.jsx
import React from "react";
import { Container, Typography, Box, Divider } from "@mui/material";

const CookiePolicy = () => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {/* Header Section */}
      <Box
        sx={{
          bgcolor: "rgba(96, 37, 156, 0.2)", // #60259C with 20% opacity
          color: "#000", // dark text for readability
          py: 12, // taller header
          textAlign: "center",
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          Cookie Policy
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          Aurevo28 Proptech Private Limited (First-Buy.com)
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5 }}>
           Updated October 2025
        </Typography>
      </Box>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Divider sx={{ mb: 3 }} />

        <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
            What Are Cookies
          </Typography>
          <Typography variant="body1" paragraph>
            Cookies are small text files stored on your device to help us recognize you and improve your browsing experience.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            How We Use Cookies
          </Typography>
          <ul>
            <li>To keep you logged in securely</li>
            <li>To remember your preferences</li>
            <li>To track website analytics</li>
            <li>To display relevant offers or rewards</li>
          </ul>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Managing Cookies
          </Typography>
          <Typography variant="body1" paragraph>
            You can adjust your browser settings, reject non-essential cookies, or delete stored cookies at any time. Note that disabling cookies may affect some features.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default CookiePolicy;
