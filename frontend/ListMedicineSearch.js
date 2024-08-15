import React, { useState, useEffect } from 'react';
import './MedicineSearch.css'

const MedicineSearchResults = ({ selectedMedicines, userPincode }) => {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPharmacies = async () => {
      setLoading(true);
      setError(null);
      let pharmacyMap = new Map();

      for (let medicine of selectedMedicines) {
        try {
          const response = await fetch(`http://localhost:8080/api/medicines/search?id=${medicine.id}&userPincode=${userPincode}`);
          if (!response.ok) {
            throw new Error('No results found');
          }
          const data = await response.json();
          data.forEach(pharmacy => {
            if (!pharmacyMap.has(pharmacy.id)) {
              pharmacyMap.set(pharmacy.id, { ...pharmacy, medicineIds: new Set() });
            }
            pharmacyMap.get(pharmacy.id).medicineIds.add(medicine.id);
          });
        } catch (error) {
          setError(error.message);
          setLoading(false);
          return;
        }
      }

      const resultPharmacies = Array.from(pharmacyMap.values())
        .filter(pharmacy => pharmacy.medicineIds.size === selectedMedicines.length);

      setPharmacies(resultPharmacies);
      setLoading(false);
    };

    fetchPharmacies();
  }, [selectedMedicines, userPincode]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="medicine-search-results">
      <h2>Available Pharmacies</h2>
      {pharmacies.length > 0 ? (
        <ul>
          {pharmacies.map((pharmacy) => (
            <div className="pharmacy-card" key={pharmacy.id}>
            <div className="pharmacy-name">{pharmacy.pharmacyName}</div>
            <div className="pharmacy-details">
              <p>{pharmacy.address}</p>
              <p className="pharmacy-contact">Contact: {pharmacy.contact}</p>
            </div>
          </div>
          ))}
        </ul>
      ) : (
        <p>No pharmacies found with all the selected medicines.</p>
      )}
    </div>
  );
};

export default MedicineSearchResults;