import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import './Login.css';

function Login() {
  const [accountType, setAccountType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignupRedirect = () => {
    if (accountType === 'doctor') {
      navigate('/pharmacist-signup');
    } else if (accountType === 'patient') {
      navigate('/customer-signup');
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the form from submitting

    if (!accountType) {
      alert('Please select an account type');
      return;
    }

    const apiEndpoint = accountType === 'doctor' 
      ? `http://localhost:8080/api/pharmacies/authenticate?email=${email}&password=${password}`
      : `http://localhost:8080/api/users/authenticate?email=${email}&password=${password}`;

    try {
      const response = await axios.get(apiEndpoint); // Use GET request as parameters are in URL

      if (response.data && response.data.id) {
        // Successful login
        localStorage.setItem('user', JSON.stringify(response.data));
        if (accountType === 'doctor') {
          navigate('/pharmacist');
        } else if (accountType === 'patient') {
          navigate('/home');
        }
      } else if (response.data === 'Invalid email or password') {
        // Handle invalid credentials
        alert('Invalid email or password');
      } else {
        // Handle other cases if necessary
        alert('An unexpected error occurred');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="Login">
        <div className="Login-image">
          <img 
            src="https://media.istockphoto.com/id/1223737192/vector/medicine-icon-vector-illustration-medicine-vector-illustration-template-medicine-icon-design.jpg?s=612x612&w=0&k=20&c=tyZHi-ZTFsjrQO5dHdftTwRKB3guBaxAkoS-QVoS5Xk=" 
            alt="Pharmacist" 
          />
        </div>
        <div className="Login-form">
          <header className="Login-header">
            <h1>Choose Account Type</h1>
          </header>
          <div className="account-selection">
            <div 
              className={`account-box ${accountType === 'doctor' ? 'selected' : ''}`}
              onClick={() => setAccountType('doctor')}
            >
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYVf-tJFOHCA-uuL9C_TYZ9ycreAHbRQZXQw&s" 
                alt="Doctor" 
              />
              <p>Pharmacist</p>
            </div>
            <div 
              className={`account-box ${accountType === 'patient' ? 'selected' : ''}`}
              onClick={() => setAccountType('patient')}
            >
              <img 
                src="https://png.pngtree.com/png-vector/20200211/ourmid/pngtree-illustration-of-two-person-talking-with-bubble-chat-png-image_2143687.jpg" 
                alt="Patient" 
              />
              <p>Customer</p>
            </div>
          </div>
          <form className="login-form" onSubmit={handleLogin}>
            <p>Hello {accountType}</p>
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="form-footer">
              <button type="submit">Login</button>
            </div>
          </form>
          <footer className="App-footer">
            <p>No account? 
              <a href="#" onClick={handleSignupRedirect}>Signup</a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Login;
