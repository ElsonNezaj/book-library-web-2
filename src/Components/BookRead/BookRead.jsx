import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import './BookRead.css';
import Navbar from '../Navbar/Navbar';

const BookDisplay = () => {
  const [bookContent, setBookContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const location = useLocation();
  const { id, bookTitle } = location.state || {};

  useEffect(() => {
    if (!id) {
      setError(true);
      setLoading(false);
      return;
    }

    const storage = getStorage();
    const fileRef = ref(storage, `Books/${id}.txt`);

    getDownloadURL(fileRef)
      .then((url) => {
        setBookContent(url);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (!id) return <Navigate to="/books" />;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading the book content. Please ensure you have navigated here correctly.</div>;

  return (
    <>
      <Navbar />
      <div className="book-content">
        <h2>{bookTitle}</h2>
        {/* Adjusted width and height for the object tag */}
        <object data={bookContent} type="text/plain" width="80%" height="800px" style={{border: '1px solid black', display: 'block', margin: 'auto'}}>
          This is the book content that your browser does not support displaying. Please use a browser that supports object embedding.
        </object>
      </div>
    </>
  );
};

export default BookDisplay;