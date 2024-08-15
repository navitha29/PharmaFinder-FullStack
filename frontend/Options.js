import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import '@fontsource/roboto';

// Import a Google Font
import '@fontsource/roboto'; // Adjust to the font you prefer

const OptionButton = styled(Button)(({ theme, bgcolor }) => ({
  backgroundColor: bgcolor,
  color: 'black',
  borderRadius: '8px', // Rounded corners
  border: '1px solid transparent', // Border for better visibility
  '&:hover': {
    backgroundColor: theme.palette.grey[300],
    border: `1px solid ${theme.palette.grey[400]}`, // Border on hover
  },
  boxShadow: theme.shadows[5], // Enhanced shadow
  margin: theme.spacing(1),
  
  width: '100%',
  height: '60px',
  display: 'block',
  fontSize: '16px',
  fontFamily: 'Roboto, Arial, sans-serif', // Font family
  fontWeight: '500', // Slightly bolder text
}));

const Options = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, padding: '20px', textAlign: 'center' }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6} md={2}>
          <OptionButton
            bgcolor="#b3e5fc" // Light blue color
            onClick={() => navigate('/list')}
          >
            Create List
          </OptionButton>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <OptionButton
            bgcolor="#b3e5fc" // Light blue color
            onClick={() => navigate('/history')}
          >
            View Pharmacy Replies
          </OptionButton>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <OptionButton
            bgcolor="#b3e5fc" // Light blue color
            onClick={() => navigate('/post')}
          >
            Post
          </OptionButton>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <OptionButton
            bgcolor="#b3e5fc" // Light blue color
            onClick={() => navigate('/diagnosis')}
          >
            Search Symptoms
          </OptionButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Options;
