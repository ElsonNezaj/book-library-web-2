import { useContext } from 'react';
import { db } from '../firebase-config';
import { doc, setDoc, deleteDoc, getDocs, collection, getDoc} from 'firebase/firestore';
import { AuthContext } from '../AuthContext';

export function useFavorites() {
  const { currentUser } = useContext(AuthContext);

  const addFavoriteBook = async (bookId, coverImg, title) => {
    if (!currentUser) {
      console.error("No authenticated user found");
      return;
    }
  
    try {
      await setDoc(doc(db, `users/${currentUser.uid}/favorites`, bookId), {
        cover_img: coverImg,
        title: title,
      });
      console.log("Book added to favorites with cover image and title");
    } catch (error) {
      console.error("Error adding book to favorites: ", error);
    }
  };
  
  const removeFavoriteBook = async (bookId) => {
    if (!currentUser) {
      console.error("No authenticated user found");
      return;
    }
  
    try {
      await deleteDoc(doc(db, `users/${currentUser.uid}/favorites`, bookId));
      console.log("Book removed from favorites");
    } catch (error) {
      console.error("Error removing book from favorites: ", error);
    }
  };

  const getFavoriteBooks = async () => {
    if (!currentUser) {
      console.error("No authenticated user found");
      return [];
    }
  
    const userFavoritesRef = collection(db, `users/${currentUser.uid}/favorites`);
    try {
      const querySnapshot = await getDocs(userFavoritesRef);
      const favoriteBooks = [];
      querySnapshot.forEach((doc) => {
        // Fetching the document ID, cover_img, and title
        favoriteBooks.push({ id: doc.id, ...doc.data() });
      });
      return favoriteBooks;
    } catch (error) {
      console.error("Error fetching favorite books: ", error);
      return [];
    }
  };

  const isBookFavorite = async (bookId) => {
    if (!currentUser) {
      console.error("No authenticated user found");
      return false;
    }

    const bookRef = doc(db, `users/${currentUser.uid}/favorites`, bookId);
    const favoriteDoc = await getDoc(bookRef);

    return favoriteDoc.exists();
  };

  return { addFavoriteBook, removeFavoriteBook, getFavoriteBooks, isBookFavorite };
}
