import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ menuOpen, toggleMenu }) => {
  const navigate = useNavigate();

  return (
    <div className={`navbar-container ${menuOpen ? 'navbar-open' : ''}`}>
      <div className="menu-toggle" onClick={toggleMenu}>
        ☰
      </div>
      <ul className="navbar-menu">
        <li onClick={() => navigate('/home')} className="navbar-item">Home</li>
        <li onClick={() => navigate('/list')} className="navbar-item">Create List</li>
        <li onClick={() => navigate('/diagnosis')} className="navbar-item">Diagnosis</li>
        <li onClick={() => navigate('/')} className="navbar-item navbar-signout">Sign Out</li>
      </ul>
    </div>
  );
};

export default Navbar;
