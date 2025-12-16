import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Avatar
} from "@mui/material";
import axios from "../config/AxiosInterceptor";

const LeadManagement = () => {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await axios.get(`/api/v1/leads/all`);
      setLeads(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  const handleViewLead = (lead) => {
    setSelectedLead(lead);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedLead(null);
  };

  return (
    <Card
      sx={{
        maxWidth: 1200,
        width: "95%",
        mx: "auto",
        opacity: 0.8,
        borderRadius: "29px",
        boxShadow: "0px 8px 4px 0px rgba(0, 0, 0, 0.25)",
        background: "linear-gradient(135deg, #632F97 0%, #7B3F9A 50%, #8B4FA8 100%)",
        color: "white",
        overflow: "hidden",
        position: "relative",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.1)",
        mb: 4,
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 4 } }}>
        {/* Header */}
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={4}
          sx={{
            position: "relative",
            zIndex: 2,
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: "bold",
              background: "linear-gradient(45deg, #fff, #e0e7ff)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Lead Management
          </Typography>
        </Box>

        {/* Table */}
        <TableContainer 
          sx={{ 
            background: "transparent",
            borderRadius: 3,
            overflow: "auto",
            maxHeight: { xs: "50vh", md: "65vh" },
            pr: 1,
            "&::-webkit-scrollbar": { width: 6, height: 6 },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(255,255,255,0.35)",
              borderRadius: 8,
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "rgba(255,255,255,0.5)",
            },
            "&::-webkit-scrollbar-track": { background: "transparent" },
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {["Name", "Email", "Property", "Actions"].map(
                  (head) => (
                    <TableCell
                      key={head}
                      sx={{
                        fontWeight: "bold",
                        color: "white",
                        background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                        borderBottom: "2px solid rgba(255,255,255,0.2)",
                        fontSize: "1rem",
                        py: 2,
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      {head}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {leads?.map((lead, index) => (
                <TableRow
                  key={lead.id}
                  sx={{
                    "&:hover": { 
                      backgroundColor: "rgba(255,255,255,0.08)",
                      transform: "scale(1.01)",
                    },
                    transition: "all 0.3s ease",
                    background: index % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                  }}
                >
                  <TableCell sx={{ color: "white", py: 2, fontSize: "0.95rem" }}>
                    {lead.user?.name}
                  </TableCell>
                  <TableCell sx={{ color: "white", py: 2, fontSize: "0.95rem" }}>
                    {lead.user?.email}
                  </TableCell>
                  <TableCell sx={{ color: "white", py: 2, fontSize: "0.95rem" }}>
                    {lead.property?.name}
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Button
                      size="small"
                      sx={{
                        borderRadius: "20px",
                        px: 3,
                        py: 1,
                        background: "linear-gradient(45deg, #a8edea 0%, #fed6e3 100%)",
                        color: "#333",
                        fontWeight: "bold",
                        textTransform: "none",
                        fontSize: "0.85rem",
                        boxShadow: "0 4px 15px rgba(168, 237, 234, 0.3)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        "&:hover": {
                          background: "linear-gradient(45deg, #fed6e3 0%, #a8edea 100%)",
                          transform: "translateY(-1px)",
                          boxShadow: "0 6px 20px rgba(168, 237, 234, 0.5)",
                        },
                        transition: "all 0.3s ease",
                      }}
                      onClick={() => handleViewLead(lead)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>

      {/* Lead Details Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center", color: "primary.main" }}>
          Lead Details
        </DialogTitle>
        <DialogContent>
          {selectedLead && (
            <Grid container spacing={3} sx={{ p: 2 }}>
              {/* Left Side - User & Property Details */}
              <Grid item xs={12} md={8}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  User Information:
                </Typography>
                <Typography><strong>Name:</strong> {selectedLead.user?.name}</Typography>
                <Typography><strong>Email:</strong> {selectedLead.user?.email}</Typography>
                <Typography><strong>Phone:</strong> {selectedLead.user?.phoneNumber}</Typography>
                <Typography><strong>Role:</strong> {selectedLead.user?.role}</Typography>

                <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
                  Property Information:
                </Typography>
                <Typography><strong>Name:</strong> {selectedLead.property?.name}</Typography>
                <Typography><strong>Location:</strong> {selectedLead.property?.location}</Typography>
                <Typography><strong>Builder:</strong> {selectedLead.property?.builder}</Typography>
                <Typography><strong>Price:</strong> ₹{selectedLead.property?.price.toLocaleString()}</Typography>
                <Typography><strong>Discount:</strong> {selectedLead.property?.discount}%</Typography>

                {selectedLead.property?.features?.length > 0 && (
                  <>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3 }}>
                      Features:
                    </Typography>
                    <ul>
                      {selectedLead.property.features.map((feature, index) => (
                        <li key={index}>{feature.replace(/'/g, "")}</li>
                      ))}
                    </ul>
                  </>
                )}
              </Grid>

              {/* Right Side - Property Image */}
              <Grid item xs={12} md={4} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {selectedLead.property?.image && (
                  <Avatar
                    variant="rounded"
                    src={`data:image/jpeg;base64,${selectedLead.property.image}`}
                    alt={selectedLead.property.name}
                    sx={{ width: 250, height: 180, borderRadius: "10px", boxShadow: 3 }}
                  />
                )}
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default LeadManagement;
