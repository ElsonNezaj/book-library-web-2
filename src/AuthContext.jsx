// In AuthContext.js or wherever you've defined your AuthContext
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to sign in users
  function signIn(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Function to log out users
  function logout() {
    const auth = getAuth();
    // Perform any pre-logout tasks here (optional)
    // e.g., clear user-specific data from state
    return signOut(auth).then(() => {
      // Perform any post-logout tasks here (optional)
      // Note: Redirection should ideally be handled in the component that calls logout
      console.log("User logged out successfully");
      // You can also reset any user-specific state here
    });
  }

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe; // Unsubscribe on cleanup
  }, []);

  const value = {
    currentUser,
    signIn,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
