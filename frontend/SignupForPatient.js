// SignupForPatient.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Grid, TextField, Button, Typography, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignupForPatient = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    dob: '',
    mobileNumber: '',
    address: '',
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
      const response = await axios.post('http://localhost:8080/api/users/create', formData);
      console.log('Response:', response.data);
      // Display success alert
      window.alert('Signup successful!');
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      // Optionally, handle error with an alert or other UI feedback
      window.alert('Signup failed. Please try again.');
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
        <Grid item xs={12} md={6}>
          <img
            src="https://www.cureatr.com/hubfs/tranisitions%20of%20care%20pharmacist.jpeg"
            alt="Sign Up"
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              maxWidth: '100%',
              width: '100%',
              height: 'auto',
              backgroundColor: '#ffffff',
            }}
          >
            <Typography variant="h5" gutterBottom>
              Sign Up
            </Typography>
            <Box 
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <TextField
                name="username"
                label="Username"
                variant="outlined"
                fullWidth
                required
                value={formData.username}
                onChange={handleChange}
              />
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
                required
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                name="password"
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                required
                value={formData.password}
                onChange={handleChange}
              />
              <TextField
                name="dob"
                label="Date of Birth"
                variant="outlined"
                placeholder="yyyy-mm-dd"
                fullWidth
                required
                value={formData.dob}
                onChange={handleChange}
              />
              <TextField
                name="mobileNumber"
                label="Mobile Number"
                variant="outlined"
                fullWidth
                required
                value={formData.mobileNumber}
                onChange={handleChange}
              />
              <TextField
                name="address"
                label="Address"
                variant="outlined"
                fullWidth
                required
                value={formData.address}
                onChange={handleChange}
              />
              <TextField
                name="pincode"
                label="Pincode"
                variant="outlined"
                fullWidth
                required
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

export default SignupForPatient;
