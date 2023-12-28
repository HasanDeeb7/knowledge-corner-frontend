import BookCard from "../../components/BookCard/BookCard";
import BookCover from "../../assets/images/bookcover.jpg";
import style from "./SingleBook.module.css";
import Stars from "../../components/Stars/Stars";
import { useEffect, useState } from "react";
import { useLocation, Link } from 'react-router-dom';
import axios from "axios";
import { Helmet } from "react-helmet";
import bookIcon from '../../assets/icons/open-book.png'

function SingleBook() {

  const location = useLocation();
  const book = location.state && location.state.book;
  const [books, setBooks] = useState([]);
  const [author, setAuthor] = useState({})
  const [category, setCategory] = useState({})

  function fetchAuthorData() {
    axios
      .get(`${process.env.REACT_APP_PATH}/api/authors/${book.authorId}`)
      .then((response) => {
        setAuthor(response.data);
      })
      .catch((error) => {
        console.error("Error in fetching:", error);
      });
  }

  function fetchCategoryData() {
    axios
      .get(`${process.env.REACT_APP_PATH}/api/categories/${book.categoryId}`)
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.error("Error in fetching:", error);
      });
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_PATH}/api/books/limitedBooks?limit=6`
        );
        setBooks(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData()
    fetchAuthorData()
    fetchCategoryData()
  }, [book]);

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = date.toISOString().split("T")[0];

    return formattedDate;
  }

  return (
    
    <section className={style.singleBookContainer}>
         <Helmet>
        <meta charSet="utf-8" />
        <title>{book.title?book.title:"Single Book"}</title>
        <meta name="description" content="Single Book" />
        <link rel="icon" href={bookIcon} />
      </Helmet>
      <div className={style.mainInfoContainer}>
        <article className={style.imgContainer}>
  
          <img className={style.image} src={`${process.env.REACT_APP_PATH}/images/${book.image}`} alt="Book cover" />
          <div className={style.StarSingleContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Stars key={star} stars={star} rating={book.rating} />
            ))}
          </div>
        </article>
        <article className={style.infoContainer}>
          <h3 className={`${style.info} ${style.bookTitle}`}>
            {book.title}
          </h3>
          <h4 className={style.info}>{author.firstName} {author.lastName}</h4>
          <p className={style.info}>
            Genre:<span className={style.spantext}>{category.name}</span>
          </p>
          <p className={style.info}>
            Language :<span className={style.spantext}>{book.language}</span>{" "}
          </p>
          <p className={style.info}>
            Published Date :
            <span className={style.spantext}>{formatDate(book.publicationDate)}</span>
          </p>
          <p className={style.info}>
            Pages :<span className={style.spantext}>{book.nbPages}</span>
          </p>
          <p className={style.info}>
            ISBN :<span className={style.spantext}>{book.ISBN}</span>
          </p>
          <p className={style.info}>
            {book.description}
          </p>
        </article>
      </div>
      <div className={style.suggestedBookHolder}>
 <h4 className={style.suggestedBookTitle}>Readers also enjoyed</h4>
      <aside className={style.suggestedBook}>
      {books.map((item, id) => (
          <div key={id}>
            <Link
              to="/SingleBook"
              state= {{ book: item }}
            >
              <BookCard isSmall={true} book={item}/>
            </Link>
          </div>
        ))}
      </aside>
      </div>
     
    </section>
  );
}
export default SingleBook;
