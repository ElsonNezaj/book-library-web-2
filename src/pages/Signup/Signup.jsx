import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // Firebase auth functions
import { useNavigate } from 'react-router-dom'; // Navigation hook
import Navbar from '../../Components/Navbar/Navbar'; // Navbar component
import './Signup.css'; // Updated CSS styles

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to store the error message
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (event) => {
    event.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Sign-up successful
        console.log('Sign Up Successful:', userCredential);
        navigate('/'); // Redirect to the home page
      })
      .catch((error) => {
        // Provide user-friendly error messages
        if (error.message.includes("email already in use")) {
          setError("This email address is already in use. Please try a different one.");
        } else if (error.message.includes("invalid email")) {
          setError("The email address is invalid. Please check your input.");
        } else if (error.message.includes("weak password")) {
          setError("Your password must be at least 6 characters long.");
        } else {
          setError("An error occurred during sign-up. Please try again.");
        }
      });
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to the sign-up page
  };

  return (
    <>
      <Navbar /> {/* Navbar for navigation */}
      <div className="signup-container"> {/* Container for the sign-up page */}
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2> {/* Form title */}
          
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange = {(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange = {(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && ( /* Display error message at the bottom of the form */
            <div className="signup-error">
              {error}
            </div>
          )}

          <button type="submit" className="signup-button">Sign Up</button> {/* Sign-up button */}

          <p className="signup-text">
            Already have an account? {/* Sign-up redirect */}
            <button type="button" onClick={handleLoginRedirect} className="signup-redirect-button">
              Log In
            </button>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUpPage;
