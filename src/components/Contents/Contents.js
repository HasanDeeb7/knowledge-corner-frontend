import React, { useState, useEffect, lazy } from "react";
import contentsStyle from "../Contents/contents.module.css";

import axios from "axios";
import { Link } from "react-router-dom";

const Services = lazy(() => import("./Services"));

function Contents() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_PATH}api/books/limitedBooks?limit=6`
        );

        setBook(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={contentsStyle.contentsComponent}>
      <h2>Millions of Books Available for you , Anytime & Anywhere</h2>
      <section className={contentsStyle.imageContainer}>
        {book.map((item, id) => (
          <div key={id} className={contentsStyle.bookContainer}>
            <Link to="/SingleBook" state={{ book: item }}>
              <button className={contentsStyle.imageButton}>
                <img
                  src={`${process.env.REACT_APP_PATH}/images/${item.image}`}
                  alt={item.image}
                  className={contentsStyle.imageBook}
                />
                <h4 className={contentsStyle.titleBook}>{item.title}</h4>
              </button>
            </Link>
          </div>
        ))}
      </section>

      <h2>Services</h2>
      <Services />
    </div>
  );
}

export default Contents;
