import React, { useState, useEffect } from "react";
import AllBooksStyle from "./AllBooks.module.css";
import filter from "../../assets/icons/filter.png";
import axios from "axios";
import magnifire from "../../assets/icons/magnifire.jpeg";
import TempBookCard from "../BookCard/tempBookCard";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import bookss from "../../assets/icons/books-stack-of-three 2.svg";
import Pagination from "../Pagination/Pagination";

const AllBooks = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [checkboxes, setCheckboxes] = useState({});
  const [categoriesMap, setCategoriesMap] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [totalBooks, setTotalBooks] = useState([]);
  const [pagination, setPagination] = useState({ pageNumber: 1, pageSize: 2 });

  // This function handles the click event for showing/hiding the category filter.
  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  // Fetch categories and books on component load.
  async function getTotalBooks() {
    const res = await axios.get(`${process.env.REACT_APP_PATH}api/books`);
    if (res) {
      console.log(res.data);
      setTotalBooks(res.data);
    }
  }
  async function getLimitedBooks() {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_PATH}api/books/limitedBooks`,
        {
          params: {
            pageNumber: pagination.pageNumber,
            pageSize: pagination.pageSize,
          },
        }
      );
      if (res) {
        setBooks(res.data);
        setIsLoading(false);
        const authorIds = res.data.map((book) => book.AuthorId);
        fetchAuthors(authorIds);
        console.log(res.data);

        const categIds = res.data.map((book) => book.CategoryId);
        fetchCategories(categIds);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PATH}api/categories`)
      .then((response) => {
        setCategories(response.data);
        console.log(response.data);
        setIsLoading(false);
        const initialCheckboxes = {};
        response.data.forEach((category) => {
          initialCheckboxes[category.id] = false;
        });
        setCheckboxes(initialCheckboxes);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
    getTotalBooks();
  }, []);
  useEffect(() => {
    getLimitedBooks();
  }, [pagination]);

  // Fetch the name of the authors based on authorID in books.
  const fetchAuthors = (authorIds) => {
    axios
      .get(`${process.env.REACT_APP_PATH}api/authors`, {
        params: { authorIds: authorIds },
      })
      .then((res) => {
        const authorMap = {};

        res.data.forEach((author) => {
          authorMap[author.id] = `${author.firstName} ${author.lastName}`;
        });
        setAuthors(authorMap);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  // Fetch the category name based on categoryID in books.
  const fetchCategories = (categIds) => {
    axios
      .get(`${process.env.REACT_APP_PATH}api/categories`, {
        params: { categIds: categIds },
      })
      .then((res) => {
        const categMap = {};

        res.data.forEach((category) => {
          categMap[category.id] = category.name;
        });
        setCategoriesMap(categMap);
      })
      .catch((err) => console.log(err));
  };

  // Handles changes in the category filter checkboxes.
  const handleOnChange = (e) => {
    const categoryId = Number(e.target.value);
    const isChecked = e.target.checked;
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [categoryId]: isChecked,
    }));

    if (isChecked) {
      setSelectedCategories((prevSelected) => [...prevSelected, categoryId]);
    } else {
      setSelectedCategories((prevSelected) =>
        prevSelected.filter((id) => id !== categoryId)
      );
    }
  };

  // Filters books based on selected categories.
  const filterBooksByCategories = (booksToFilter, selectedCategories) => {
    if (selectedCategories.length === 0) {
      return booksToFilter;
    }
    return totalBooks.filter((book) =>
      selectedCategories.includes(book.CategoryId)
    );
  };

  const filteredByCategories = filterBooksByCategories(
    books,
    selectedCategories
  );

  // Handles changes in the search input.
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Filters books by name based on the search input.
  const filterBooksByName = (booksToFilter, searchInput) => {
    if (searchInput) {
      return totalBooks.filter((book) =>
        book.title.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    return booksToFilter;
  };

  const filteredBooks = filterBooksByName(filteredByCategories, searchInput);

  return (
    <div className={AllBooksStyle.allBooksContainer}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Books</title>
        <meta name="description" content="all Books" />
        <link rel="icon" href={bookss} />
      </Helmet>

      <h1 className={AllBooksStyle.titleh1}>Books Collection</h1>
      <form className={AllBooksStyle.bookSearch}>
        <input
          id="search"
          className={AllBooksStyle.inputSearch}
          type="text"
          placeholder="Search For Book Name"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <button type="button" className={AllBooksStyle.searchButton}>
          <img src={magnifire} alt="search img" width="25" height="20" />
        </button>
      </form>

      <div className={AllBooksStyle.filterCategories}>
        <input
          type="text"
          id="Categories"
          name="Categories"
          value="Search for Categories"
        />
        <button htmlFor="#Categories" onClick={handleClick}>
          <img src={filter} alt="filter" />
        </button>
      </div>

      <div className={AllBooksStyle.booksContainer}>
        <div
          className={`${AllBooksStyle.booksCategory} ${
            menuOpen ? AllBooksStyle.open : ""
          }`}
        >
          <h2>Categories</h2>
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <>
              {categories.map((category, index) => (
                <div className={AllBooksStyle.bookCheckbox} key={index}>
                  <input
                    type="checkbox"
                    id={category.id}
                    name={category.Name}
                    value={category.id}
                    checked={checkboxes[category.id] || false}
                    onChange={handleOnChange}
                  />
                  <label htmlFor={category.id}>{category.Name}</label>
                  <br />
                </div>
              ))}
            </>
          )}
        </div>

        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className={AllBooksStyle.booksList} key={books.id}>
              {filteredBooks.map((book) => (
                <Link to={`/SingleBook/${book.slug}`} state={{ book: book }}>
                  <TempBookCard
                    image={book.image}
                    author={authors[book.authorId]}
                    bookTitle={book.title}
                    rating={book.rating}
                    category={categoriesMap[book.categoryId]}
                  />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
      {isLoading ? (
        "Preparing pages"
      ) : (
        <Pagination
          books={totalBooks}
          setPagination={setPagination}
          pagination={pagination}
        />
      )}
    </div>
  );
};

export default AllBooks;
