import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; // Authentication context
import './Login.css'; // Updated CSS styles
import Navbar from '../../Components/Navbar/Navbar'; // Navbar component

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to hold error messages
  const navigate = useNavigate();

  const authContext = useAuth(); // Get authentication context

  useEffect(() => {
    setError(null); // Clear error message on component mount
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await authContext.signIn(email, password); // Call the signIn function from the auth context
      navigate('/'); // Redirect to the home page on successful login
    } catch (error) {
      // Provide more user-friendly error messages
      if (error.message.includes("wrong password")) {
        setError("The password you entered is incorrect. Please try again.");
      } else if (error.message.includes("no user record")) {
        setError("No account found with this email address. Please check and try again.");
      } else {
        setError("An error occurred during login. Please try again.");
      }
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/signup'); // Redirect to the sign-up page
  };

  return (
    <>
      <Navbar /> {/* Navbar for navigation */}
      <div className="login-page-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2> {/* Form title */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className = "input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange = {(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && ( /* Display error at the bottom of the form */
            <div className="error-message">
              {error}
            </div>
          )}

          <button type="submit" className="login-button">Login</button> {/* Login button */}
          
          <p className="signup-text">
            Don't have an account? {/* Sign-up redirect */}
            <button type="button" onClick={handleSignUpRedirect} className="signup-redirect-button">
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
