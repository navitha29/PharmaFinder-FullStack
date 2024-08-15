import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './Home/LandingPage';
import Login from './LoginandSignup/Login';
import Signup from './LoginandSignup/Signup';
import Firstpage from './Home/FirstPage';
import CreateList from './ListSearch/CreateList';
import SearchSymptoms from './ListSearch/SearchSymptoms';
import Post from './Posts/Post';
import Dashboard from './Pharma/Dashboard';
import SignupForPharmacist from './LoginandSignup/SignupForPharmacist';
import SignupForPatient from './LoginandSignup/SignupForPatient';
import OrderPage from './Pharma/OrderPage';
import StockPage from './Pharma/StockPage';
import Analysis from './Pharma/Analysis';
import History from './ListSearch/History';
import Final from './NewComponents/Final';
import HomeNew from './HomeNewNew/HomeNew';
import AddMedicineForm from './Pharma/AddMedicine';


const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Final />} />
        <Route path="/list" element={<CreateList />} />
        <Route path="/diagnosis" element={<SearchSymptoms />} />
        <Route path="/post" element={<Post />} />
        <Route path="/pharmacist" element={<Dashboard />} />
        <Route path="/pharmacist-signup" element={<SignupForPharmacist />} />
        <Route path="/customer-signup" element={<SignupForPatient />} />
        <Route path="/stocks" element={<StockPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/history" element={<History />} />
        <Route path="/add" element={<AddMedicineForm/>} />
       
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
