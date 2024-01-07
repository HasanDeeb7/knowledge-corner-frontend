import React, { useState, useEffect } from "react";
import AllBooksStyle from "../AllBooks/AllBooks.module.css";
import author from '../../assets/icons/writer.png'
import axios from "axios";
import magnifire from "../../assets/icons/magnifire.jpeg";
import TemAuthorCard from "./TemAuthorCard";
import {Helmet} from 'react-helmet'
import { Link } from "react-router-dom";

const AllAuthors = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PATH}api/authors`)
      .then((res) => {
        setAuthors(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const filterAuthorsByName = (authorsToFilter, searchInput) => {
    if (searchInput) {
      return authorsToFilter.filter(
        (author) =>
          author.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
          author.lastName.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    return authorsToFilter;
  };
  const authorsFiltred = filterAuthorsByName(authors, searchInput);
  return (
    <div>
         <Helmet>
        <meta charSet="utf-8" />
        <title>All Authors</title>
        <meta name="description" content="all authors" />
        <link rel="icon" href={author} />
      </Helmet>
      <h1 className={AllBooksStyle.titleh1}>Authors List</h1>
      <form className={AllBooksStyle.bookSearch}>
        <input
          id="search"
          className={AllBooksStyle.inputSearch}
          type="text"
          placeholder="Search For Author Name"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <button type="button" className={AllBooksStyle.searchButton}>
          <img src={magnifire} alt="search img" width="25" height="20" />
        </button>
      </form>

      <div>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className={AllBooksStyle.booksList}>
              {authorsFiltred.map((author) => {
                return (
                  <Link to={`/SingleAuthor/${author.slug}`} state={{ author: author }}>
                    <TemAuthorCard
                      authorName={`${author.firstName} ${author.lastName} `}
                      image={author.image}
                      rating={author.rating}
                    />
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllAuthors;
