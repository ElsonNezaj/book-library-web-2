import React, { useState, useEffect } from "react";
import Book from "../BookList/Book";
import Loading from "../Loader/Loader";
import coverImg from "../../Images/cover_not_found.jpg";
import { useSearchParams } from "react-router-dom";
import useGet from "../../hooks/useGet";
import { transformBooks } from "../../lib/transformBooks";
import Checkbox from "../../ui/Checkbox";
import styles from "./books.module.scss";
import BoxField from "../../ui/BoxField";
import Search from "../../ui/Search";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
 
const popularGenres = [
  "Fiction",
  "Mystery",
  "Fantasy",
  "Science Fiction",
  "Romance",
  "Thriller",
  "Young Adult",
  "Non-Fiction",
  "Historical Fiction",
  "Children",
]; // A static list of popular genres
 
const BookList = () => {
  const resultTitle = useSearchParams()[0].get("search");
  const { data, loading, err } = useGet(
    `https://openlibrary.org/search.json?title=${resultTitle}`
  );
  const [books, setBooks] = useState([]);
 
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [displayBooks, setDisplayBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const navigate = useNavigate();
 
  useEffect(() => {
    console.log("Updating Books - useEffect [data]");
    setBooks(data ? transformBooks(data.docs) : []);
  }, [data]);
 
  useEffect(() => {
    if (!books || !books?.length) return;
 
    const fetchSubjectsAndPrepareBooks = async () => {
      const updatedBooks = [];
      for (const singleBook of books) {
        const cover_img = singleBook.cover_id
          ? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg`
          : coverImg;
        const id = singleBook.id.replace("/works/", "");
        let subjectsArray = ["No subjects found"];
        try {
          const response = await fetch(
            `https://openlibrary.org/works/${id}.json`
          );
          if (!response.ok) {
            throw new Error(
              `API request failed with status ${response.status}`
            );
          }
          const data = await response.json();
          subjectsArray = data.subjects
            ? data.subjects.map((subject) => subject.name || subject)
            : ["No subjects found"];
          updatedBooks.push({
            ...singleBook,
            id,
            cover_img,
            subjects: subjectsArray,
          });
        } catch (error) {}
      }
      setDisplayBooks(updatedBooks);
    };
 
    fetchSubjectsAndPrepareBooks();
  }, [books]);
 
  useEffect(() => {
    const filterBooksByGenre = () => {
      if (selectedGenres.length) {
        return displayBooks.filter((book) =>
          book.subjects.some((subject) =>
            selectedGenres.some((genre) => subject.includes(genre))
          )
        );
      } else {
        return displayBooks;
      }
    };
 
    setFilteredBooks(filterBooksByGenre());
  }, [selectedGenres, displayBooks]);
 
  const handleGenreChange = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };
 
  return (
    <section className={styles.root}>
      <div className={styles.filters}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`/book?search=${e.target.search.value}`);
          }}
        >
          <Search defaultValue={resultTitle} />
          <button className="d-none" />
        </form>
        <div className={styles.checkboxes}>
          {popularGenres.map((genre, index) => (
            <BoxField
              key={index}
              title={genre}
              checked={selectedGenres.includes(genre)}
              onChange={() => handleGenreChange(genre)}
            />
          ))}
        </div>
      </div>
      <div className={`${styles.main}`}>
        <h2>{resultTitle}</h2>
        {loading && <Loader />}
        <div className={`${styles.books}`}>
          {filteredBooks.slice(0, 30).map((item, index) => (
            <Book key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};
 
export default BookList;