import { Box } from "@mui/material";
import PropertyManagement from "../components/PropertyManagement";
import LeadManagement from "../components/LeadManagement";
import pagebg from "../assets/pagebg.jpg";

const BuilderContent = () => {
  return (
    <Box 
      sx={{ 
        backgroundImage: `url(${pagebg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: { xs: 2, md: 3 },
        pb: 0,
      }}
    >
      <PropertyManagement/>
      <LeadManagement/>
    </Box>
  );
};

export default BuilderContent;


