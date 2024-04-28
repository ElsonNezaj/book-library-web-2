import React, { useState, useEffect } from "react";
import styles from "./home.module.scss";
import Header from "../../Components/Header/Header";
import SearchForm from "../../Components/SearchForm/SearchForm";
import Book from "../../Components/BookList/Book";
import { transformBooks2 } from "../../lib/transformBooks";
import coverImg from "../../Images/cover_not_found.jpg"; // Fallback image

// Function to fetch popular books and transform them
const fetchPopularBooks = async () => {
  try {
    const response = await fetch(
      "https://openlibrary.org/subjects/popular.json"
    ); // Endpoint for popular books
    const data = await response.json();

    console.log(data);

    return transformBooks2(data.works.slice(0, 8)).map((book) => {
      const cover_img = book.cover_id
        ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg` // Correct cover image URL
        : coverImg; // Fallback if no cover found
      return { ...book, cover_img };
    });
  } catch (error) {
    console.error("Failed to fetch popular books:", error);
    return [];
  }
};

const Home = () => {
  const [popularBooks, setPopularBooks] = useState([]);

  useEffect(() => {
    const getPopularBooks = async () => {
      const books = await fetchPopularBooks(); // Fetch the popular books
      setPopularBooks(books); // Store the books in the state
    };
    getPopularBooks(); // Fetch books on component mount
  }, []);

  return (
    <div className={styles.root}>
      <Header caller="home" style="v2" />
      <div className={styles.content}>
        <main className={`container text-white ${styles.main}`}>
          <h2 className="text-capitalize">LibAdventure</h2>
          <p className="fs-18 fw-3">
            Turn the page on tradition, the digital age is here.
          </p>
          <SearchForm />
        </main>
        <div className={styles.buttons}>
          <a href="/book-library.apk" className="btn-icon">
            <img alt="Play Store" src="/playstore.svg" />
          </a>
          <a href="/" className="btn-icon">
            <img alt="Apple Store" src="/apple.png" />
          </a>
        </div>
      </div>

      {/* Section for book grid */}
      <section className={styles.bookGrid}>
        <h2>Most Popular Books</h2> {/* Heading for the grid */}
        <div className={styles.grid}>
          {popularBooks.map((book, index) => (
            <Book key={index} {...book} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
