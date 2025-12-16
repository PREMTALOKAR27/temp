import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";

import { authStore } from "../store/authStore";
import { notificationStore } from "../store/notificationStore";

function NotifyProperty() {
  const navigate = useNavigate();
  const location = useLocation();

  // 👇 property is passed via navigation
  const property = location.state?.property;

  const { authData } = authStore();
  const {
    fetchAll,
    fetchByUserId,
    connectWebSocket,
    disconnectWebSocket,
  } = notificationStore();

  const userId = authData?.id || null;

  useEffect(() => {
    fetchAll();
    if (userId) fetchByUserId(userId);
    connectWebSocket(userId);

    return () => {
      disconnectWebSocket();
    };
  }, [userId]);

  if (!property) {
    return (
      <Box p={3} textAlign="center">
        <Typography variant="h6" color="error">
          No property data provided.
        </Typography>
        <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate(-1)}>
          ⬅ Back
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: "900px", mx: "auto" }}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        ⬅ Back
      </Button>

      <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
        {property.name}
      </Typography>

      {/* Property Image */}
      <Box
        component="img"
        src={property.image}
        alt={property.name}
        sx={{
          width: "100%",
          maxWidth: "600px",
          height: "auto",
          display: "block",
          mx: "auto",
          borderRadius: 2,
          mb: 2,
          objectFit: "cover",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        }}
      />

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            Location: {property.location}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
            Price:{" "}
            <s>{property.price}</s> →{" "}
            <b style={{ color: "green" }}>{property.discountedPrice}</b>
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {property.description}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <b>Features:</b> {property.features}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <b>Builder:</b> {property.builder}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <b>Contact:</b> {property.contact}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <b>Points Required:</b> {property.pointsRequired}
          </Typography>
        </CardContent>
      </Card>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2, display: "block", mx: "auto" }}
        onClick={() => alert(`Calling ${property.contact}...`)}
      >
        Contact Now
      </Button>
    </Box>
  );
}

export default NotifyProperty;
