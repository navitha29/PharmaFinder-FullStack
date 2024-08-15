import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [tab, setTab] = useState('Dashboard');
  const navigate = useNavigate();

  const handleTabChange = (tabName) => {
    setTab(tabName);
  };
  const handlenavigate= (path) => () =>{
    navigate(path)
  }

  const handleCardClick = (route) => {
    navigate(route);
  };

  const cardDetails = [
    {
      title: 'Stocks',
      description: 'Manage and monitor your stock levels efficiently. Keep track of stock availability and ensure timely replenishment to avoid shortages. Utilize advanced tools for accurate inventory management and forecasting.',
      image: 'https://media.istockphoto.com/id/1454741302/vector/inventory-control-system-concept-professional-manager-checking-goods-and-stock-supply.jpg?s=612x612&w=0&k=20&c=UTL6VEH5WkrFKJR3RHtZhwpi4c3LtfNP4WtPF_ykAqs=',
      route: '/stocks'
    },
    {
      title: 'Pharmacy',
      description: 'Get detailed information about pharmacy operations and available tablets. View drug availability, manage prescriptions, and streamline pharmacy processes with ease. Ensure optimal service quality and patient satisfaction.',
      image: 'https://png.pngtree.com/png-clipart/20231020/original/pngtree-pharmacy-and-medicine-and-pharmacist-png-image_13373033.png',
      route: '/orders'
    },
    {
      title: 'Analysis',
      description: 'Check the recent and new lists made for various purposes. Review and manage lists efficiently, whether for stock, prescriptions, or other administrative tasks. Stay organized and up-to-date with the latest entries.',
      image: 'https://media.istockphoto.com/id/1406947107/vector/woman-with-pencil-standing-around-check-list-all-task-check-concept-vector-flat-style.jpg?s=612x612&w=0&k=20&c=3aPFOekVlYj01LF8_l-2czcKViVnkqKlKeZzUGn-Ylg=',
      route: '/analysis'
    }
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 style={{color:"black"}}>Pharmacist's Page</h1>
      </header>
      <nav className="dashboard-nav">
        <button className={`nav-button ${tab === 'Dashboard' ? 'active' : ''}`} onClick={() => handleTabChange('Dashboard')}>Dashboard</button>
        <button className={`nav-button ${tab === 'Lists' ? 'active' : ''}`} onClick={handlenavigate('/stocks')}>Lists</button>
        <button className={`nav-button ${tab === 'Users' ? 'active' : ''}`} onClick={handlenavigate('/orders')}>Users</button>
        <button className={`nav-button ${tab === 'Settings' ? 'active' : ''}`} onClick={handlenavigate('/analysis')}>Chart</button>
      </nav>
      <main className="dashboard-main">
        <div className="cards-wrapper">
          {cardDetails.map((card, index) => (
            <div className="card" key={index} onClick={() => handleCardClick(card.route)}>
              <img src={card.image} alt={card.title} className="card-image" />
              <div className="card-content">
                <h2>{card.title}</h2>
                <p>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
