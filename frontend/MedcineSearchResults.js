import React, { useState, useEffect } from 'react';
import './MedicineSearch.css'; // Import the CSS file for styling

const MedicineSearchResults = ({ medicineId }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const userPincode = JSON.parse(localStorage.getItem('user')).pincode;
        const response = await fetch(`http://localhost:8080/api/medicines/search?id=${medicineId}&userPincode=${userPincode}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    if (medicineId) {
      fetchResults();
    }
  }, [medicineId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="medicine-search-results">
      <h2>Matching Pharmacies</h2>
      {searchResults.length > 0 ? (
        searchResults.map((pharmacy, index) => (
          <div className="pharmacy-card" key={index}>
            <div className="pharmacy-name">{pharmacy.pharmacyName}</div>
            <div className="pharmacy-details">
              <p>{pharmacy.address}</p>
              <p className="pharmacy-contact">Contact: {pharmacy.contact}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No matching pharmacies found.</p>
      )}
    </div>
  );
};

export default MedicineSearchResults;