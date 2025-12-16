// src/pages/Disclaimer.jsx
import React from "react";
import { Container, Typography, Box, Divider, Link } from "@mui/material";

const Disclaimer = () => {
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
          Disclaimer
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
            Platform Role
          </Typography>
          <Typography variant="body1" paragraph>
            First-Buy.com acts solely as a reward-based property discovery platform.
          </Typography>
          <Typography variant="body1" paragraph>
            “Zero brokerage for buyers - we only partner with developers to bring verified projects and exclusive rewards.” We do not guarantee the accuracy or completeness of property information.
          </Typography>
          <Typography variant="body1" paragraph>
            We do not:
            <ul>
              <li>Participate in any sale, purchase, or negotiation between users and builders.</li>
            </ul>
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Financial Disclaimer
          </Typography>
          <ul>
            <li>Rewards, points, and benefits are subject to terms and may change without prior notice.</li>
            <li>All property prices, offers, and promotions are directly provided by builders.</li>
          </ul>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Liability
          </Typography>
          <ul>
            <li>Any financial loss, damage, or misrepresentation arising from third-party listings.</li>
            <li>User decisions made based on platform content.</li>
          </ul>
          <Typography variant="body1" paragraph>
            For any issues or clarifications, reach us at{" "}
            <Link href="mailto:firstbuyrewards.check@gmail.com">
              firstbuyrewards.check@gmail.com
            </Link>.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Disclaimer;
