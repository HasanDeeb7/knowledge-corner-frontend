import BookCard from "../../components/BookCard/BookCard";
import style from "./SingleAuthor.module.css";
import Stars from "../../components/Stars/Stars";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// import axios from "axios";
import { Helmet } from "react-helmet";
import authorI from "../../assets/icons/author.png";

function SingleAuther() {
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const author = location.state && location.state.author;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_PATH}api/books/limitedBooks`,
          { params: { pageSize: 5, pageNumber: 1 } }
        );
        setBooks(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData();
  }, []);

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = date.toISOString().split("T")[0];

    return formattedDate;
  }

  return (
    <section className={style.singleAuthorContainer}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {author ? author.firstName + " " + author.lastName : "Single author"}
        </title>
        <meta name="description" content="Single author page" />
        <link rel="icon" href={authorI} />
      </Helmet>
      <div className={style.mainInfoContainer}>
        <article className={style.imgContainer}>
          <img
            className={style.image}
            src={`${process.env.REACT_APP_PATH}/images/${author.image}`}
            alt="AuthorPhoto"
          />
          {author && author.rating ? (
            <div className={style.StarSingleContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Stars key={star} stars={star} rating={author.rating} />
              ))}
            </div>
          ) : null}
        </article>
        <article className={style.infoContainer}>
          <h3 className={style.info}>
            {author
              ? `${author.firstName} ${author.lastName}`
              : "Author Not Found"}
          </h3>
          <p className={style.info}>
            {author ? author.biography : "Biography Not Available"}
          </p>
          {author && author.dob ? (
            <p className={style.info}>
              Birth Date :{" "}
              <span className={style.spantext}>{formatDate(author.dob)}</span>
            </p>
          ) : null}
          {author && author.nationality ? (
            <p className={style.info}>
              Nationality :{" "}
              <span className={style.spantext}>{author.nationality}</span>
            </p>
          ) : null}
          {author && author.twitterLink ? (
            <p className={style.info}>
              Twitter :{" "}
              <span className={style.spantext}>{author.twitterLink}</span>
            </p>
          ) : null}
          {author && author.blogLink ? (
            <p className={style.info}>
              Website :{" "}
              <span className={style.spantext}>{author.blogLink}</span>
            </p>
          ) : null}
          {author && author.linkedinLink ? (
            <p className={style.info}>
              LinkedIn : <span className={style.spantext}></span>
            </p>
          ) : (
            ""
          )}
        </article>
      </div>
      <h4 className={style.suggestedBookTitle}>More books</h4>
      <aside className={style.suggestedBook}>
        {books.map((item, id) => (
          <div key={id}>
            <Link to="/SingleBook" state={{ book: item }}>
              <BookCard isSmall={true} book={item} />
            </Link>
          </div>
        ))}
      </aside>
    </section>
  );
}
export default SingleAuther;
