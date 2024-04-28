import React, { useEffect, useState } from 'react';
import Book from "../BookList/Book";
import Loading from "../Loader/Loader";
import coverImg from "../../Images/cover_not_found.jpg";
import "./Favorites.css";
import Navbar from '../Navbar/Navbar';
import { useAuth } from '../../AuthContext'; // Ensure useAuth is correctly imported
import { getDocs, collection} from 'firebase/firestore';
import { db } from '../../firebase-config';

const Favorites = () => {
  const [loading, setLoading] = useState(true);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const { currentUser } = useAuth(); // Use the useAuth hook to access the current user

  useEffect(() => {
    const fetchFavoriteBooksDetails = async () => {
      if (!currentUser) {
        console.error("No authenticated user found");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Fetch favorite books with author and cover_img directly from the favorites collection
        const favoritesRef = collection(db, `users/${currentUser.uid}/favorites`);
        const favoritesSnapshot = await getDocs(favoritesRef);
        
        const favorites = favoritesSnapshot.docs
          .map(doc => ({
            id: doc.id, // The book ID
            ...doc.data() // The stored favorite book details (author, cover_img, title)
          }))
          .filter(book => book.cover_img && book.title); // Optionally filter out incomplete entries

        setFavoriteBooks(favorites);
      } catch (error) {
        console.error("Error fetching favorite books details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteBooksDetails();
  }, [currentUser]);

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
      <div className='container'>
        <div className='section-title'>
          <h2>Favorites</h2>
        </div>
        <div className='booklist-content grid'>
          {favoriteBooks.length > 0 ? (
            favoriteBooks.map((book, index) => (
              <Book key={index} {...book} cover_img={book.cover_img ? book.cover_img : coverImg} />
            ))
          ) : (
            <div className='no-favorites-message'>No favorites found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Favorites;
