import { Link } from "react-router-dom";
import styles from "./book.module.scss";
import coverImg from "../../Images/cover_not_found.jpg"; // Fallback image

const Book = ({
  id,
  cover_id,
  title,
  author,
  edition_count,
  first_publish_year,
  cover_img,
}) => {
  // Generate the cover image URL, use fallback if undefined
  const coverImage = cover_id
    ? `https://covers.openlibrary.org/b/id/${cover_id}-L.jpg`
    : coverImg;

  // Split `/works/` from the ID to get the unique book identifier
  const bookId = id.split("/").pop();

  return (
    <Link to={`/book/${bookId}`} className={styles.root}>
      {" "}
      {/* Use bookId in the link */}
      <span className={styles.img}>
        <img src={cover_img} alt={`Cover of ${title}`} />{" "}
        {/* Display the cover */}
      </span>
      <span className={styles.main}>
        <b>{title}</b>
        {author && (
          <span>
            <span>Author: </span>
            <span>{author.join(", ")}</span>
          </span>
        )}
        <span>
          <span>Total Editions: </span>
          <span>{edition_count}</span>
        </span>
        <span>
          <span>First Publish Year: </span>
          <span>{first_publish_year}</span>
        </span>
      </span>
    </Link>
  );
};

export default Book;
