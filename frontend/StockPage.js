import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StockPage.css';
import { Navigate, useNavigate } from 'react-router-dom';

const StockPage = () => {
  const [products, setProducts] = useState([]);
  const [pharmacyId, setPharmacyId] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      console.log('User from localStorage:', user); // Log user object to check its structure
      setPharmacyId(user.id);
    } else {
      console.log('No user found in localStorage');
    }
  }, []);

  useEffect(() => {
    if (pharmacyId) {
      axios.get(`http://localhost:8080/api/stocks/groups/${pharmacyId}`)
        .then(response => {
          const medicineData = response.data[0]?.medicines || [];
          console.log('Medicine data:', medicineData); // Verify data here
          setProducts(medicineData);
        })
        .catch(error => {
          console.error('Error fetching stock data:', error);
        });
    }
  }, [pharmacyId]);

  const navigate=useNavigate();
  const handleAdd=()=>{
    navigate("/add");
  }
  return (
    <div className="stock-body">
      <div className="stock-section">
        <div className="header">
          <h1>Manage Products</h1>
          <div>
            <button>Create Category</button>
            <button onClick={handleAdd}>Add New Product</button>
          </div>
        </div>
        <div className="filters">
          <input type="text" placeholder="Search products" />
          <select>
            <option>Category</option>
            <option>Price</option>
          </select>
        </div>
        <div className="table-container">
          <h2>All Medicines</h2>
          {products.length > 0 ? (
            <table className="product-table">
              <thead>
                <tr>
                  <th><input type="checkbox" /></th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <tr key={index}>
                    <td><input type="checkbox" /></td>
                    <td>{item.medicine.name}</td>
                    <td>{item.medicine.category}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <span
                        className={item.quantity > 10 ? 'status-in-stock' : 'status-low-stock'}
                      >
                        {item.quantity > 10 ? 'In Stock' : 'Low Stock'}
                      </span>
                    </td>
                    <td className="actions">
                      <button style={{ color: "black" }}>Edit</button>
                      <button style={{ color: "black" }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockPage;
