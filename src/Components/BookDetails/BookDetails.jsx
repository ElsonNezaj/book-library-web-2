import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Loading from "../Loader/Loader";
import coverImg from "../../Images/cover_not_found.jpg";
import { FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../../AuthContext";
import StarRating from "../StarRating";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { useFavorites } from "../favoritesService";
import styles from "./styles.module.scss";
import commentStyles from "./comment.module.scss";
import Ratings from "./Ratings";
import { toast } from "react-toastify";

const URL = "https://openlibrary.org/works/";

const specialBookIds = [
  "OL19780150W",
  "OL1317211W",
  "OL498556W",
  "OL3140834W",
  "OL796465W",
  "OL262758W",
  "OL102749W",
  "OL26416603W",
  "OL26446888W",
  "OL9170454W",
];

const BookDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState(null);
  const [ratingDistribution, setRatingDistribution] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const favoritesService = useFavorites();

  useEffect(() => {
    const fetchBookAndRatings = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${URL}${id}.json`);
        const data = await response.json();

        if (data) {
          const newBook = {
            description: data.description
              ? data.description.value
              : "No description found",
            title: data.title,
            cover_img: data.covers
              ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
              : coverImg,
            subject_places: data.subject_places
              ? data.subject_places.join(", ")
              : "No subject places found",
            subject_times: data.subject_times
              ? data.subject_times.join(", ")
              : "No subject times found",
            subjects: data.subjects
              ? data.subjects.join(", ")
              : "No subjects found",
          };
          setBook(newBook);
        }

        const db = getFirestore();
        const ratingsRef = collection(db, `books/${id}/ratings`);
        const snapshot = await getDocs(ratingsRef);
        const ratingsCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

        snapshot.forEach((doc) => {
          const rating = doc.data().rating;
          if (ratingsCount.hasOwnProperty(rating)) {
            ratingsCount[rating]++;
          }
        });

        setRatingDistribution(ratingsCount);

        const isFavorite = await favoritesService.isBookFavorite(id);
        setIsFavorite(isFavorite);

        const commentsRef = collection(db, `books/${id}/comments`);
        const commentsSnapshot = await getDocs(commentsRef);
        const commentsData = [];
        commentsSnapshot.forEach((doc) => {
          commentsData.push({ id: doc.id, ...doc.data() });
        });
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching book details or ratings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookAndRatings();
  }, [id]);

  const handleAddFavorite = async () => {
    if (!currentUser) {
      console.error("No authenticated user found");
      return;
    }
    await favoritesService.addFavoriteBook(id, book.cover_img, book.title);
    setIsFavorite(true);
  };

  const handleRemoveFavorite = async () => {
    if (!currentUser) {
      console.error("No authenticated user found");
      return;
    }
    await favoritesService.removeFavoriteBook(id);
    setIsFavorite(false);
  };

  const submitRating = async (rating) => {
    if (!currentUser) {
      toast.error("Please log in to rate this book.");
      return;
    }

    const db = getFirestore();
    const ratingDocRef = doc(db, `books/${id}/ratings/${currentUser.uid}`);
    try {
      await setDoc(ratingDocRef, {
        rating: rating,
        userId: currentUser.uid,
      });
      toast.success("Rating submitted successfully");
      setRatingDistribution((prev) => ({
        ...prev,
        [rating]: prev[rating] + 1,
      }));
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error("Failed to submit rating");
    }
  };

  const handleCommentSubmit = async () => {
    if (!currentUser) {
      toast.error("Please log in to comment.");
      return;
    }

    try {
      const commentRef = collection(getFirestore(), `books/${id}/comments`);
      const newCommentDoc = await addDoc(commentRef, {
        userId: currentUser.uid,
        email: currentUser.email,
        comment,
      });

      setComments((prevComments) => [
        ...prevComments,
        {
          id: newCommentDoc.id,
          userId: currentUser.uid,
          email: currentUser.email,
          comment,
        },
      ]);
      toast.success("Comment submitted successfully.");
      setComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Failed to submit comment.");
    }
  };

  const isSpecialBook = specialBookIds.includes(id);

  if (loading) return <Loading />;

  return (
    <section className={`${styles.root} container`}>
      <button
        type="button"
        className="btn-normal no-spacing"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
        Go Back
      </button>
      <div className={styles.main}>
        <div className={styles.leftSection}>
          <img className={styles.cover} src={book?.cover_img} alt="cover img" />
          <button
            className={`btn-icon ${styles.heartButton}`}
            onClick={isFavorite ? handleRemoveFavorite : handleAddFavorite}
          >
            <span
              className={`material-symbols-outlined ${
                isFavorite ? "fill" : ""
              }`}
            >
              favorite
            </span>
          </button>
        </div>
        <div className={styles.description}>
          <h1>{book?.title}</h1>
          <p className={styles.desc}>{book?.description}</p>
          <div className={styles.subDetails}>
            <b>Subject Places:</b>
            <p>{book?.subject_places}</p>
            <b>Subject Times:</b>
            <p>{book?.subject_times}</p>
            <b>Subjects:</b>
            <p>{book?.subjects}</p>
            <b>Ratings</b>
            <Ratings ratings={ratingDistribution} />
            <b>Rate this book</b>
            <StarRating onRating={submitRating} />
          </div>
          {isSpecialBook ? (
            <div>
              <p>
                <b>Price:</b> 0.00$
              </p>
              <Link
                to={currentUser ? `/bookread` : "#"}
                state={{ id, bookTitle: book.title }}
                className="read-open-library-btn"
                style={{
                  display: "inline-block",
                  backgroundColor: currentUser ? "#007bff" : "gray",
                  color: "white",
                  padding: "10px 20px",
                  marginTop: "10px",
                  marginBottom: "20px",
                  borderRadius: "5px",
                  textDecoration: "none",
                  textAlign: "center",
                  pointerEvents: currentUser ? "auto" : "none",
                }}
                title={!currentUser ? "Log in to Buy" : ""}
              >
                Buy Now
              </Link>
            </div>
          ) : (
            <div>
              <p>
                <b>Price:</b> Price not available
              </p>
              <a
                className="read-open-library-btn"
                style={{
                  display: "inline-block",
                  backgroundColor: "gray",
                  color: "white",
                  padding: "10px 20px",
                  marginTop: "10px",
                  marginBottom: "20px",
                  borderRadius: "5px",
                  textDecoration: "none",
                  textAlign: "center",
                  pointerEvents: currentUser ? "auto" : "none",
                }}
                title={!currentUser ? "Log in for more info" : ""}
              >
                Integrimi me POS - Coming Soon
              </a>
            </div>
          )}
        </div>
      </div>

      <div className={commentStyles.commentSection}>
        <h2>Comments</h2>
        <div className={`${commentStyles.comments} comments`}>
          {comments.map((commentData) => (
            <div
              key={commentData.id}
              className={`${commentStyles.comment} comment`}
            >
              <p>
                <strong>{commentData.email}</strong>
              </p>
              <p>{commentData.comment}</p>
            </div>
          ))}
        </div>
        {currentUser && (
          <div className={`${commentStyles.commentInput} commentInput`}>
            <textarea
              placeholder="Write your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button className="btn-normal" onClick={handleCommentSubmit}>
              Submit Comment
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookDetails;
