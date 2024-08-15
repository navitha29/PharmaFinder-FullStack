import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './Home/LandingPage';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Login from './LoginandSignup/Login';
import Routing from './Routing';
import Search from './ListSearch/Search';
import SearchSymptoms from './ListSearch/SearchSymptoms';
import Recommended from './Recommended';

import Dashboard from './Pharma/Dashboard';
import OrderPage from './Pharma/OrderPage';
import StockPage from './Pharma/StockPage';

import HomeNew from './HomeNewNew/HomeNew';
import Homepage from './HomePageFinal/HomePageNew';

ReactDOM.render(
  <React.StrictMode>
    
      
  <Routing />
    
  </React.StrictMode>,
  document.getElementById('root')
);
