import React, { useState, useEffect } from 'react';
import './SearchSymptoms.css';
import Navbar from '../Components/Navbar';
import ListMedicineSearch from '../Components/ListMedicineSearch';
import { useNavigate } from 'react-router-dom';

const SearchSymptoms = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const userPincode = user ? user.pincode : null;
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/medicines/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetch(`http://localhost:8080/api/medicines/by-category?category=${selectedCategory}`)
        .then((response) => response.json())
        .then((data) => setMedicines(data))
        .catch((error) => console.error('Error fetching medicines:', error));
    }
  }, [selectedCategory]);

  const handleAddMedicine = (medicine, dosageId) => {
    setSelectedMedicines((prevSelectedMedicines) => {
      const existingMedicine = prevSelectedMedicines.find(m => m.id === medicine.id);
      if (existingMedicine) {
        return prevSelectedMedicines.map(m =>
          m.id === medicine.id ? { ...m, quantity: m.quantity + 1 } : m
        );
      } else {
        const selectedDosage = medicine.dosages.find(d => d.id === dosageId);
        return [...prevSelectedMedicines, { ...medicine, selectedDosage, quantity: 1 }];
      }
    });
  };

  const handleIncrement = (medicine) => {
    setSelectedMedicines((prevSelectedMedicines) =>
      prevSelectedMedicines.map(m =>
        m.id === medicine.id ? { ...m, quantity: m.quantity + 1 } : m
      )
    );
  };

  const handleDecrement = (medicine) => {
    setSelectedMedicines((prevSelectedMedicines) =>
      prevSelectedMedicines.map(m =>
        m.id === medicine.id && m.quantity > 1 ? { ...m, quantity: m.quantity - 1 } : m
      )
    );
  };

  const handleRemove = (medicine) => {
    setSelectedMedicines((prevSelectedMedicines) =>
      prevSelectedMedicines.filter(m => m.id !== medicine.id)
    );
  };

  const handleSearch = () => {
    setShowResults(true);
  };

  const handlePost = () => {
    if (selectedMedicines.length === 0) {
      alert('Please select at least one medicine.');
      return;
    }
    navigate('/post', { state: { selectedMedicines } });
  };

  const toggleMenu = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="search-symptoms-page">
      <Navbar menuOpen={sidebarOpen} toggleMenu={toggleMenu} />
      <div className="diagnosis-container">
        <div className="dg-search-bar">
          <select
            className="search-input"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory || ''}
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        {!selectedCategory && (
          <div className="common-symptoms">
            <h2>Common Symptoms</h2>
            <div className="grid">
              <div className="symptom-card">
                <img src="https://5.imimg.com/data5/SELLER/Default/2023/6/319597573/MH/NE/SR/135658020/ibuprofen-400-mg-bp-tablets.jpg" alt="Body pain" />
                <p>Body pain / Fever</p>
              </div>
              <div className="symptom-card">
                <img src="https://www.netmeds.com/images/product-v1/600x600/387780/vomistop_10mg_tablet_10_s_0.jpg" alt="Vomiting" />
                <p>Stomach Pain</p>
              </div>
              <div className="symptom-card">
                <img src="https://5.imimg.com/data5/SELLER/Default/2023/1/DZ/WH/DE/138308991/antibiotic-tablets.jpg" alt="Common Cold" />
                <p>Common Cold</p>
              </div>
              <div className="symptom-card">
                <img src="https://5.imimg.com/data5/SELLER/Default/2023/1/DZ/WH/DE/138308991/antibiotic-tablets.jpg" alt="Allergy" />
                <p>Allergy</p>
              </div>
              <div className="symptom-card">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDhYbSkIemhOypeL6HhEf1_W8b8qVjjtiMcw&s" alt="Vomiting" />
                <p>Vomiting</p>
              </div>
              <div className="symptom-card">
                <img src="https://5.imimg.com/data5/SELLER/Default/2023/1/DZ/WH/DE/138308991/antibiotic-tablets.jpg" alt="Viral/Bacterial Infections" />
                <p>Viral/Bacterial Infections</p>
              </div>
            </div>
          </div>
        )}

        {selectedCategory && medicines.length > 0 && (
          <div className="medicine-list">
            {medicines.map((medicine) => (
              <div key={medicine.id} className="dg-medicine-card">
                <h3>{medicine.name}</h3>
                <p>Brand: {medicine.brand}</p>
                <p>Category: {medicine.category}</p>
                <p>Form: {medicine.form}</p>
                <p>Cost: ${medicine.cost.toFixed(2)}</p>
                <select
                  onChange={(e) => {
                    const selectedDosageId = parseInt(e.target.value, 10);
                    handleAddMedicine(medicine, selectedDosageId);
                  }}
                >
                  <option value="">Select Dosage</option>
                  {medicine.dosages.map((dosage) => (
                    <option key={dosage.id} value={dosage.id}>
                      {dosage.dosage} - ${dosage.cost.toFixed(2)}
                    </option>
                  ))}
                </select>
                <div className="quantity-controls">
                  <button onClick={() => handleDecrement(medicine)}>-</button>
                  <span>
                    {selectedMedicines.find(m => m.id === medicine.id)?.quantity || 0}
                  </span>
                  <button onClick={() => handleIncrement(medicine)}>+</button>
                  <button onClick={() => handleRemove(medicine)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedMedicines.length > 0 && (
          <div className="selected-medicines">
            <h2>Selected Medicines</h2>
            <ul>
              {selectedMedicines.map((medicine, index) => (
                <li key={index}>
                  {medicine.name} - Dosage: {medicine.selectedDosage.dosage} - Quantity: {medicine.quantity}
                </li>
              ))}
            </ul>
            <button onClick={handleSearch} className="search-btn">Search the List</button>
            <button onClick={handlePost} className="search-btn">Post the List</button>
          </div>
        )}

        {showResults && (
          <ListMedicineSearch selectedMedicines={selectedMedicines} userPincode={userPincode} />
        )}
      </div>
    </div>
  );
};

export default SearchSymptoms;
