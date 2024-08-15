import React, { useState, useEffect } from 'react';
import './FirstPage.css'; // Import the CSS file for styling
import Navbar from '../Components/Navbar';
import MedicineSearchResults from '../Components/MedcineSearchResults';

const FindMedicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  useEffect(() => {
    fetch('http://localhost:8080/api/medicines')
      .then(response => response.json())
      .then(data => setMedicines(data));
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setActiveSuggestionIndex(-1);
    if (value.length > 0) {
      const filteredSuggestions = medicines.filter(medicine =>
        medicine.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
    setSelectedMedicine(null);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    setSelectedMedicine(suggestion);
    setSuggestions([]);
  };

  const handleSearch = () => {
    // This will trigger MedicineSearchResults to fetch and display results based on the selected medicine
    if (!selectedMedicine) {
      alert("Please select a medicine from the suggestions.");
      return;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveSuggestionIndex(prevIndex => 
        Math.min(prevIndex + 1, suggestions.length - 1)
      );
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveSuggestionIndex(prevIndex => 
        Math.max(prevIndex - 1, 0)
      );
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (activeSuggestionIndex >= 0 && activeSuggestionIndex < suggestions.length) {
        handleSuggestionClick(suggestions[activeSuggestionIndex]);
        setActiveSuggestionIndex(-1);
      } else {
        handleSearch();
      }
    }
  };

  const toggleMenu = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <body className='searchpage'>
    <div className='searchpage'>
      <Navbar menuOpen={sidebarOpen} toggleMenu={toggleMenu} />
      <div className='first-container'>
        <header>
          <h1>Find Medicine</h1>
        </header>
        <main>
          <div className="search-bar-container">
            <input
              type="text"
              value={searchTerm}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Search medicine brand name"
              className="search-bar"
            />
            {searchTerm && (
              <button className="clear-button" onClick={handleClearSearch}>
                &times;
              </button>
            )}
          </div>
          {suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={index === activeSuggestionIndex ? 'active' : ''}
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
          {selectedMedicine && (
            <div className="dosages">
              <h3>Available Dosages:</h3>
              <ul>
                {selectedMedicine.dosages.map((dosage, index) => (
                  <li key={index}>{dosage.dosage} - ${dosage.cost}</li>
                ))}
              </ul>
            </div>
          )}
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
          {selectedMedicine && (
            <MedicineSearchResults medicineId={selectedMedicine.id} />
          )}
        </main>
        <footer>
          <p>Here's to your health and happiness, today and always.</p>
        </footer>
      </div>
    </div>
    </body>
  );
};

export default FindMedicine;