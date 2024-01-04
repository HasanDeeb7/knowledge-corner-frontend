import React from "react";
import adminAllBooksStyle from "./adminAllBooks.module.css";
import x from "../../../assets/icons/862px-Delete-button 1.svg";
import update from "../../../assets/icons/Vector (4).svg";
import { Link } from "react-router-dom";
import DataGridPremiumDemo from '../../../components/AllbooksTable/Allbooks.js'

import authorIcon from '../../../assets/icons/author.png'
import { Helmet } from "react-helmet";
function adminAllAuthors({ authors, handleDeleteAuthor }) {
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = date.toISOString().split("T")[0];

    return formattedDate;
  }

  return (
    <div className={adminAllBooksStyle.allBooks}>
        <Helmet>
        <meta charSet="utf-8" />
        <title>Admin-Authors</title>
        <meta name="description" content="Admin Dashboard Authors" />
        <link rel="icon"  href={authorIcon} sizes="16x16" />
      </Helmet>
      <div className={adminAllBooksStyle.overflow}>
      <DataGridPremiumDemo authors={authors} handleDeleteAuthor={handleDeleteAuthor} type={"author"}/>

      </div>
    </div>
  );
}

export default adminAllAuthors;

/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 *      <table>
          <thead>
            <tr>
              <th>S.N</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Birth Date</th>
              <th>Nationality</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{author.firstName}</td>
                <td>{author.lastName}</td>
                <td>{formatDate(author.dob)}</td>
                <td>{author.nationality}</td>
                <td>{author.rating}</td>
                <td className={adminAllBooksStyle.buttonContainer}>
                  <Link
                    to={"/dashboard/adminAddAuthor/Edit"}
                    state={{ author }}
                  >
                    <button className={adminAllBooksStyle.updateDelete}>
                      <img src={update} alt="update" />
                    </button>
                  </Link>
                  <button className={adminAllBooksStyle.updateDelete}>
                    <img src={x} alt="delete" />
                
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
 */