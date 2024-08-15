import React from 'react';
import './LandingPage.css';
import medScoutLogo from './medScoutLogo.jpeg';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate=useNavigate();
  const handleLogin=()=>{
    navigate('/login');
  }
  return (
    <div className="landing-body">
      <div className="landing-container">
        <div className="landing-left">
          <img src={medScoutLogo} alt="MedScout Logo" className="landing-logo" />
          <h1 className="landing-title">MedScout</h1>
          <p className="landing-description">
          Discover the future of pharmaceutical care with MedScout!   
          Our innovative platform is designed to connect you effortlessly with pharmacies and medication suppliers.
          </p>
          <button className="landing-button" onClick={handleLogin}>Continue</button>
        </div>
        <div className="landing-right">
          <img src="https://media.istockphoto.com/id/1217755212/vector/pharmacist.jpg?s=612x612&w=0&k=20&c=neZJvi_cn8LGSGATA7gYmMCT8g-c8wTIR1LApIK5vHk=" alt="Pharmacist" className="landing-image" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
