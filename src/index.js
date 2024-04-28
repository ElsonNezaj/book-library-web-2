import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Make sure this is the correct path
import './scss/index.scss';
// index.js or App.js
import './firebase-config'; // Adjust the path according to your project structure
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Favorites from './Components/Favorites/Favorites';
import BookRead from '../src/Components/BookRead/BookRead';
import Books from './pages/Books';
import Book from './pages/Book';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Suppress all logs
console.log = () => {};
console.warn = () => {};
console.error = () => {};

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="signup" element={<Signup />} />
        <Route path="bookread" element={<BookRead />} />
        <Route path="book" element={<Books />} />
        <Route path="book/:id" element={<Book />} />
      </Routes>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ToastContainer />
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  </>
);
