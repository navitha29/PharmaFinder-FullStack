// SignupForPharmacist.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Grid, TextField, Button, Typography, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignupForPharmacist = () => {
  const [formData, setFormData] = useState({
    pharmacyName: '',
    address: '',
    contact: '',
    license: '',
    inCharge: '',
    businessRegistrationNumber: '',
    operatingHoursFrom: '',
    operatingHoursTo: '',
    email: '',
    password: '',
    pincode: '',
  });
  const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/pharmacies', formData);
      console.log('Signup successful:', response.data);
      alert('Signup successful!'); // Alert for successful signup
      // You can redirect the user or show a success message here
      navigate('/login');
    } catch (error) {
      console.error('There was an error during the signup process:', error);
      // You can show an error message here
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        backgroundColor: '#f5f5f5', // Background color outside the form
        padding: 4,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={5}>
          <img
            src="https://media.istockphoto.com/id/1198487217/vector/cartoon-pharmacist-woman-holding-big-pile-of-pills-isolated-female-doctor.jpg?s=612x612&w=0&k=20&c=lU3ppDjzLHxKFgryKtYcUfF2pDVPD0s7td4ztdh6tps="
            alt="Sign Up"
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              backgroundColor: '#ffffff',
              borderRadius: '15px', // Rounded edges
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h5" gutterBottom>
              Pharmacist Sign Up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <TextField
                label="Pharmacy Name"
                variant="outlined"
                fullWidth
                required
                name="pharmacyName"
                value={formData.pharmacyName}
                onChange={handleChange}
              />
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                required
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              <TextField
                label="Contact"
                variant="outlined"
                fullWidth
                required
                name="contact"
                value={formData.contact}
                onChange={handleChange}
              />
              <TextField
                label="License"
                variant="outlined"
                fullWidth
                required
                name="license"
                value={formData.license}
                onChange={handleChange}
              />
              <TextField
                label="In Charge"
                variant="outlined"
                fullWidth
                required
                name="inCharge"
                value={formData.inCharge}
                onChange={handleChange}
              />
              <TextField
                label="Business Registration Number"
                variant="outlined"
                fullWidth
                required
                name="businessRegistrationNumber"
                value={formData.businessRegistrationNumber}
                onChange={handleChange}
              />
              <TextField
                label="Operating Hours From"
                variant="outlined"
                fullWidth
                required
                name="operatingHoursFrom"
                value={formData.operatingHoursFrom}
                onChange={handleChange}
              />
              <TextField
                label="Operating Hours To"
                variant="outlined"
                fullWidth
                required
                name="operatingHoursTo"
                value={formData.operatingHoursTo}
                onChange={handleChange}
              />
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                required
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <TextField
                label="Pincode"
                variant="outlined"
                fullWidth
                required
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
              >
                Sign Up
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignupForPharmacist;
