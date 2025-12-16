// src/pages/PrivacyPolicy.jsx
import React from "react";
import { Container, Typography, Box, Link, Divider } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {/* Header Section with custom purple color */}
      <Box
        sx={{
          bgcolor: "rgba(96, 37, 156, 0.2)", // #60259C with 20% opacity
          color: "#000", // dark text for readability
          py: 12, // taller header
          textAlign: "center",
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          Privacy Policy
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          Aurevo28 Proptech Private Limited (First-Buy.com)
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5 }}>
           Updated October 2025 | Effective Date: Immediately
        </Typography>
      </Box>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Divider sx={{ mb: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Introduction
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to <strong>First-Buy.com</strong>, operated by Aurevo28 Proptech
            Private Limited (“Company”, “we”, “our”, or “us”). This Privacy Policy explains
            how we collect, use, share, and protect your personal information when you use
            our platform, website, and mobile application (collectively, “Services”). By
            using First-Buy.com, you agree to this policy.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            1. Information We Collect
          </Typography>
          <ul>
            <li><strong>Personal Information:</strong> Name, email, mobile number, and address when creating an account.</li>
            <li><strong>Bill & Expense Data:</strong> Details of bills you upload or scan to earn rewards.</li>
            <li><strong>Property Interest Data:</strong> Actions such as browsing, shortlisting, or inquiring about properties.</li>
            <li><strong>Technical Data:</strong> IP address, device details, browser type, and cookies.</li>
            <li><strong>Communication Data:</strong> Messages, queries, or feedback sent to support or builders.</li>
          </ul>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            2. How We Use Your Information
          </Typography>
          <ul>
            <li>Create and manage your account.</li>
            <li>Reward you for eligible activities.</li>
            <li>Personalize your dashboard and property recommendations.</li>
            <li>Improve our Services and run analytics.</li>
            <li>Communicate updates, offers, or marketing content (with consent).</li>
          </ul>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            3. Sharing of Information
          </Typography>
          <ul>
            <li><strong>Builders/Developers:</strong> Only when you show interest in their listings.</li>
            <li><strong>Service Providers:</strong> For payment processing, analytics, or technical support.</li>
            <li><strong>Legal Authorities:</strong> When required by law or legal process.</li>
          </ul>
          <Typography variant="body1" paragraph>
            We do <strong>not</strong> sell or rent your personal information to third parties.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            4. Cookies and Tracking
          </Typography>
          <Typography variant="body1" paragraph>
            We use cookies and similar technologies to keep you logged in securely, analyze
            traffic, store preferences, and improve user experience. You can modify cookie
            settings through your browser or our cookie consent tool.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            5. Data Security
          </Typography>
          <Typography variant="body1" paragraph>
            We implement reasonable technical and organizational measures to protect your
            data from unauthorized access, alteration, or misuse.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            6. Your Rights
          </Typography>
          <Typography variant="body1" paragraph>
            You can request access, correction, or deletion of your data, and withdraw consent
            for marketing communication. Contact us at{" "}
            <Link href="mailto:first.buyrewards@gmail.com">first.buyrewards@gmail.com</Link>.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            7. Grievance Officer
          </Typography>
          <Typography variant="body1" paragraph>
            In compliance with the Information Technology Act, 2000:
            <br />
            <strong>Grievance Officer</strong><br />
            Aurevo28 Proptech Private Limited<br />
            Email: <Link href="mailto:firstbuyrewards.check@gmail.com">firstbuyrewards.check@gmail.com</Link><br />
            Response Time: Within 15 working days
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
