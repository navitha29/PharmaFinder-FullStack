import React from 'react';
import NavigationBar from './NavigationBar';
import Options from './Options';
import MainPage from './MainPage';
import AdSlider from './AdSlider';
import Footer from './Footer';

import './Final.css';

function Final() {
  return (
    <div className="app-body">
      <NavigationBar />
      <Options />
      <MainPage/>
      <Footer/>
    </div>
  );
}

export default Final;
