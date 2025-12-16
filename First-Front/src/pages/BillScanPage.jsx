import React, { useState } from 'react';
import { Box, Typography, Button, Grid, CircularProgress, LinearProgress } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import axios from '../config/AxiosInterceptor';
import { toast } from 'react-toastify';
import { numberToWords } from './../utils/numberToWords';
import bgImage from '../assets/pagebg.jpg';
import BillIllustration from '../assets/bill_illustration.jpeg';

const NAVBAR_HEIGHT = 80;
const FOOTER_HEIGHT = 64;

const BillScanPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ocrResult, setOcrResult] = useState(null);
  const [error, setError] = useState('');

  const onDrop = (acceptedFiles, rejectedFiles) => {
    setError('');
    if (rejectedFiles && rejectedFiles.length > 0) {
      const rejectedFile = rejectedFiles[0];
      if (rejectedFile.errors[0].code === 'file-invalid-type') {
        setError('Only PDF files are accepted');
      } else if (rejectedFile.errors[0].code === 'too-many-files') {
        setError('Only one file can be uploaded at a time');
      }
      return;
    }
    setFile(acceptedFiles[0]);
    setProgress(0);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    multiple: false,
  });

  const handleScan = async () => {
  if (!file) {
    toast.error('Please upload a bill to scan!');
    return;
  }

  setLoading(true);
  setOcrResult(null);

  try {
    const formData = new FormData();
    formData.append('bill', file); // key MUST match backend DTO

    // DEBUG: check FormData
    for (let pair of formData.entries()) {
      console.log('FormData entry:', pair[0], pair[1]);
    }

    const response = await axios.post('/api/v1/bill-scan-ocr/scan-bill', formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
      },
    });

    setOcrResult(response.data);
    toast.success('File scanned successfully');
  } catch (error) {
    const errorMessage =
      error.response?.data?.errorMessage || 'An error occurred during scanning';
    toast.error(errorMessage);
    console.error('Scan error:', error);
  } finally {
    setLoading(false);
  }
};


  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: `calc(100vh - ${NAVBAR_HEIGHT + FOOTER_HEIGHT}px)`,
        pt: `${NAVBAR_HEIGHT}px`,
        pb: `${FOOTER_HEIGHT}px`,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(73, 87, 130, 0.71)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{ position: 'relative', zIndex: 2 }}
      >
        {/* Upload area */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 4,
              border: '2px dashed #ccc',
              borderRadius: 3,
              textAlign: 'center',
              bgcolor: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              color: '#fff',
              marginLeft: "50px",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }} >
              SCAN YOUR BILL
            </Typography>
            <CloudUploadIcon sx={{ fontSize: 60, color: '#fff' }} />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Drag & drop your bill here, or click to upload
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: error ? 'red' : '#ddd' }}>
              {error || 'Only PDF files are accepted'}
            </Typography>

            {file && (
              <Typography variant="body2" sx={{ mt: 2 }}>
                Selected File: {file.name}
              </Typography>
            )}

            {loading && (
              <Box sx={{ mt: 3 }}>
                <LinearProgress variant="determinate" value={progress} />
                <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                  Uploading... {progress}%
                </Typography>
              </Box>
            )}

            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                fontWeight: 'bold',
                borderRadius: '30px',
                background: 'linear-gradient(90deg, #1e90ff, #8a2be2)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #187bcd, #6a1bb9)',
                },
              }}
              onClick={handleScan}
              disabled={loading || !file}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Scan Bill'}
            </Button>
          </Box>
        </Grid>

        {/* Illustration / OCR result */}
        <Grid item xs={12} md={6}>
          {!ocrResult ? (
            <Box
              component="img"
              src={BillIllustration}
              alt="Scan illustration"
              sx={{
                width: '100%',
                maxWidth: 400,
                display: 'block',
                mx: 'auto',
                borderRadius: 3,
              }}
            />
          ) : (
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: 'rgba(255,255,255,0.9)',
                boxShadow: 3,
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                Invoice Summary
              </Typography>
              <Typography variant="subtitle1">
                <strong>Invoice Number:</strong> {ocrResult.invoiceNumber}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Invoice Date:</strong> {ocrResult.invoiceDate}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Seller:</strong> {ocrResult.seller}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Address:</strong> {ocrResult.address}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Amount:</strong> {ocrResult.amount}
              </Typography>
              <Typography variant="subtitle2">
                {numberToWords(ocrResult.amount)}
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default BillScanPage;