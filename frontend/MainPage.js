import React from 'react';
import { Typography, Box } from '@mui/material';
import AdSlider from './AdSlider';
import './MainPage.css';

const MainPage = () => {
  return (
    <>
      <section className="find-medicine-section">
        <Box textAlign="center" mt={4}>
          <Typography variant="h4" gutterBottom>
            Find your Medicine
          </Typography>
          <AdSlider />
        </Box>
      </section>
      <section className="info-section">
        <div className="info-image">
          <img src="https://media.istockphoto.com/id/1256196921/vector/doctor-researcher-team-vector-illustration-cartoon-flat-scientist-doctor-characters-work-at.jpg?s=612x612&w=0&k=20&c=-PEoXCqNsfs6JoD6S9ZlVfgKV0d8gvrVmTECIgLDbRw=" alt="Research Team"/>
        </div>
        <div className="info-text">
          <h4>Discover ways to find and order your medicines with MedScout. Our platform offers a comprehensive database of pharmacies and medicines, 
          ensuring you get what you need quickly and efficiently.Say goodbye to the hassle of searching for medicines with MedScout, your health is just a click away!</h4>
        </div>
      </section>
      <section className="info-section">
      <div className="info-text">
        <h4>You get to Create your own List of Medicines with the "Create List" Option and can also search your medicines through Symptoms.
        Post your list with the prescription form and get your replies from the nearest open pharmacies without any hassle.</h4>
      </div>
      <div className="info-image">
      <img src="https://media.istockphoto.com/id/1194838658/vector/pharmacist.jpg?s=612x612&w=0&k=20&c=OWaGmyzdz5Q87kqsgiQ5gBTXqf5y2Vn4UPF8XiKoAiU=" alt="Research Team"/>
      </div>
    </section>
    <section className="info-section">
    <div className="info-image">
      <img src="https://media.istockphoto.com/id/2084045334/vector/pharmacy.jpg?s=612x612&w=0&k=20&c=gjkA4PF3cDvsxcqpsdUi5DSbs6T9UhwCgjS9Gup4XwQ=" alt="Research Team"/>
    </div>
    <div className="info-text">
      <h4>Save your Medicine list for easier access. Contact the pharmacies in ease and get their information in their dashboard!</h4>
    </div>
  </section>
    </>
  );
};

export default MainPage;
