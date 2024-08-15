import React, { useState } from 'react';
import SignupForPatient from './SignupForPatient';
import SignupForPharmacist from './SignupForPharmacist';
import './Signup.css';

const Signup = () => {
  const [isPatient, setIsPatient] = useState(true);

  const toggleForm = () => {
    setIsPatient(!isPatient);
  };

  return (
    <div className={`signup-container ${isPatient ? '' : 'signup-right-panel-active'}`}>
      <SignupForPatient isActive={isPatient} />
      <SignupForPharmacist isActive={!isPatient} />
      <div className="signup-overlay-container">
        <div className="signup-overlay">
          <div className="signup-overlay-panel signup-overlay-left">
            <h1 className="signup-overlay-h1">Welcome Back!</h1>
            <p className="signup-overlay-p">To keep connected with us please login with your personal info</p>
            <button className="signup-overlay-button ghost" onClick={toggleForm}>
              Sign Up as Patient
            </button>
          </div>
          <div className="signup-overlay-panel signup-overlay-right">
            <h1 className="signup-overlay-h1">Hello, Friend!</h1>
            <p className="signup-overlay-p">Enter your personal details and start your journey with us</p>
            <button className="signup-overlay-button ghost" onClick={toggleForm}>
              Sign Up as Pharmacist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
