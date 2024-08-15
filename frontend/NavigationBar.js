import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, IconButton, Box } from '@mui/material';
import { Search as SearchIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { alpha, styled } from '@mui/material/styles';
import medScoutLogo from './medScoutLogo.jpeg'; // Import the logo image
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  alignItems: 'center',
  marginLeft: theme.spacing(2),
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const HeaderImage = styled('img')({
  height: '120px', // Increased height for the image
  marginLeft: 'auto',
});

const NavigationBar = () => {

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSearchClick = (path) =>() => {
    navigate(path); // Navigate to the search page
  };
  return (
    <AppBar position="static" sx={{ backgroundColor: '#ADD8E6', padding: '20px' }}> {/* Increased padding for the navbar */}
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: '120px' }}> {/* Increased minHeight for the navbar */}
        <IconButton edge="start" color="inherit" aria-label="back">
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h6" noWrap component="div" sx={{ marginRight: 2, display: 'flex', alignItems: 'center' }}>
            <h2>MedScout</h2>
            <img src={medScoutLogo} alt="MedScout Logo" style={{ height: '40px', marginLeft: '10px' }} /> {/* Add the logo image */}
          </Typography>
          <Search onClick={handleSearchClick('/list')}> 
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Medicines…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Box>
        <HeaderImage src="https://media.istockphoto.com/id/1217755212/vector/pharmacist.jpg?s=612x612&w=0&k=20&c=neZJvi_cn8LGSGATA7gYmMCT8g-c8wTIR1LApIK5vHk=" alt="Pharmacist" />
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
