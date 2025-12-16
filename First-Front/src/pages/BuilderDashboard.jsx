import {useEffect, useState} from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import BuilderContent from "./BuilderContent";
import axios from "../config/AxiosInterceptor";
import { useNavigate } from "react-router-dom";
import pagebg from "../assets/pagebg.jpg";
import builderDashboardBg from "../assets/builderDashboardBg.png";

const BuilderDashboard = () => {

  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
    if(role!=="BUILDER"){
      navigate("/")
    }
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://first-buy.in/api/v1/users/logged-in-user");
        const data = res?.data || {};
        const derivedName = data.name || data.fullName || `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim() || data.username;
        if (derivedName) setUserName(derivedName);
      } catch (e) {
        // silent fail; keep default name
      }
    };
    fetchUser();
  }, []);

  const analyticsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Property Views",
        data: [120, 150, 200, 180, 300, 250],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Leads",
        data: [40, 60, 80, 100, 120, 140],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <Box sx={{ padding: 0, mt: 0 }}>
      {/* Hero Template */}
      <Box
        sx={{
          backgroundColor: "#AFD2E5",
          borderRadius: 0,
          py: { xs: 4, md: 6 },
          mb: 2,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Grid container spacing={4} sx={{ position: "relative", zIndex: 2, maxWidth: 1200, mx: "auto", px: 3 }}>
          {/* Left Section - Text Content */}
          <Grid item xs={12} md={7}>
            {/* Main Title */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: "#000",
                mb: 3,
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              Builder Dashboard
            </Typography>

            {/* Welcome Message Card */}
            <Card
              sx={{
                background: "linear-gradient(90deg, #0D8AFE 5.41%, #DA89FF 89.37%)",
                borderRadius: 4,
                p: 3,
                mb: 3,
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                border: "none",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  mb: 1,
                  fontSize: { xs: "1.5rem", md: "2rem" },
                }}
              >
                Welcome, {userName || "User"}!
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  fontSize: { xs: "1rem", md: "1.2rem" },
                  lineHeight: 1.4,
                }}
              >
                Here's your Builder Dashboard — track your points, rewards and progress with ease.
              </Typography>
            </Card>

            {/* Bottom Descriptive Text */}
            <Typography
              variant="h5"
              sx={{
                color: "#000",
                fontWeight: "500",
                fontSize: { xs: "1.2rem", md: "1.5rem" },
              }}
            >
              Track your progress, rewards, and achievements.
            </Typography>
          </Grid>

          {/* Right Section - Illustration */}
          <Grid item xs={12} md={5}>
            <Card
              sx={{
                background: "rgba(255,255,255,0.2)",
                borderRadius: 4,
                p: 3,
                height: "100%",
                minHeight: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                border: "1px solid rgba(255,255,255,0.3)",
                backdropFilter: "blur(6px)",
              }}
            >
              
              {/* Illustration Content */}
              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  textAlign: "center",
                  color: "#666",
                }}
              >
                <img
                  src={builderDashboardBg}
                  alt="Dashboard Illustration"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    maxHeight: "250px",
                    borderRadius: "8px",
                  }}
                />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <BuilderContent/>
    </Box>
  );
};

export default BuilderDashboard;
