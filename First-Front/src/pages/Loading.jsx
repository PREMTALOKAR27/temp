import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: "fixed",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        color: 'text.primary',
        gap: 2,

      }}
      
    >
      <CircularProgress size={60} thickness={5} color="primary" />
      <Typography variant="h6" sx={{ fontWeight: 500 }}>
        Loading, please wait...
      </Typography>
    </Box>
  );
};

export default Loading;
