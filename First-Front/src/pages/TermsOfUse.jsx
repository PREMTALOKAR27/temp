// src/pages/TermsOfUse.jsx
import React from "react";
import { Container, Typography, Box, Divider } from "@mui/material";

const TermsOfUse = () => {
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
          Terms of Use
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
          <Typography variant="h6" gutterBottom>
            Acceptance of Terms
          </Typography>
          <Typography variant="body1" paragraph>
            By accessing or using First-Buy.com, you agree to comply with these Terms of Use. 
            If you disagree, please refrain from using our services.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Use of Platform
          </Typography>
          <ul>
            <li>You agree to provide accurate, complete, and updated information.</li>
            <li>You shall not use the platform for illegal, fraudulent, or harmful activities.</li>
          </ul>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Rewards & Points
          </Typography>
          <ul>
            <li>Points are awarded based on eligible actions such as bill uploads, referrals, and engagement.</li>
            <li>Points hold no direct monetary value and can only be redeemed as per platform guidelines.</li>
            <li>Misuse or fraudulent activities may result in account suspension or point forfeiture.</li>
          </ul>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Property Listings
          </Typography>
          <ul>
            <li>Builder and developer information is provided by third parties.</li>
            <li>First-Buy.com is not a broker or agent — it acts as a digital rewards-based discovery platform. “Zero brokerage for buyers - we only partner with developers to bring verified projects and exclusive rewards.”</li>
            <li>Users should verify all project information independently before making decisions.</li>
          </ul>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Intellectual Property
          </Typography>
          <Typography variant="body1" paragraph>
            All content, trademarks, designs, and code on the site are the property of Aurevo28 Proptech Pvt. Ltd. You may not copy, modify, or reproduce any content without prior written consent.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Limitation of Liability
          </Typography>
          <ul>
            <li>Inaccurate builder data or third-party listings.</li>
            <li>Losses due to decisions made based on platform content.</li>
            <li>Temporary downtime or technical interruptions.</li>
          </ul>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Termination
          </Typography>
          <Typography variant="body1" paragraph>
            We reserve the right to suspend or terminate any account that violates these Terms or harms the integrity of our platform.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Governing Law
          </Typography>
          <Typography variant="body1" paragraph>
            These Terms are governed by the laws of India.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default TermsOfUse;
