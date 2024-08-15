import React from 'react';
import { Container, Typography, Grid } from '@mui/material';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f5f5f5', padding: '20px 0', marginBottom: '20px' }}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6">About Us</Typography>
            <Typography variant="body2">
              We hope MedScout helps you and find your way to your medicine!
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6">Contact</Typography>
            <Typography variant="body2">
              Email: info.medscout@example.com
            </Typography>
            <Typography variant="body2">
              Phone: (123) 456-7890
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6">Follow Us</Typography>
            <Typography variant="body2">
              Facebook | Twitter | Instagram
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
