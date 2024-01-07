import React from "react";
import adminAllBooksStyle from "./adminAllBooks.module.css";
import x from "../../../assets/icons/862px-Delete-button 1.svg";
import update from "../../../assets/icons/Vector (4).svg";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import bookss from '../../../assets/icons/books-stack-of-three 2.svg'
import { DataGridPremium } from '@mui/x-data-grid-premium';
import DataGridPremiumDemo from '../../../components/AllbooksTable/Allbooks.js'
import adminNavbarStyle from '../AdminNavbar/adminNavbar.module.css'
function adminAllBooks({ books, authors, categories, handleDeleteBook,handleDeleteAuthor, loggedUser }) {
  

  return (
    <div>
 <Helmet>
        <meta charSet="utf-8" />
        <title>Admin-Books</title>
        <meta name="description" content="Admin dashboard all Books" />
        <link rel="icon" href={bookss} />
      </Helmet>
      <div className={adminAllBooksStyle.allBooks}>
        <div className={adminAllBooksStyle.addButton}>
        <Link
          to={"/dashboard/adminAddBook/Add"}
          className={`${adminNavbarStyle.addMVC}`}
        >
          <button className={adminNavbarStyle.addButton}>Add Book</button>
        </Link>
        </div>
    

        <div className={adminAllBooksStyle.overflow}>
         <DataGridPremiumDemo books={books} handleDeleteBook={handleDeleteBook} type={"book"} loggedUser={loggedUser}/>
        </div>
      </div>
    </div>
  );
}

export default adminAllBooks;

/********************
 * 
 * 
 *  <table>
            <thead>
              <tr>
                <th>S.N</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>ISBN</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books &&
                books.map((book, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{book.title}</td>
                    <td>
                      {
                        authors.find((author) => author._id === book.authorId)
                          ?.firstName
                      }{" "}
                      {
                        authors.find((author) => author._id === book.authorId)
                          ?.lastName
                      }
                    </td>
                    <td>
                      {
                        categories.find(
                          (category) => category._id === book.categoryId
                        )?.name
                      }
                    </td>
                    <td>{book.ISBN}</td>
                    <td>{book.rating}</td>
                    <td className={adminAllBooksStyle.buttonContainer}>
                      <Link
                        to={"/dashboard/adminAddBook/Edit"}
                        state={{ book }}
                      >
                        <button className={adminAllBooksStyle.updateDelete}>
                          <img src={update} alt="update" />
                        </button>
                      </Link>
                      <button
                        className={adminAllBooksStyle.updateDelete}
                        onClick={() => {
                          handleDeleteBook(book.id);
                        }}
                      >
                        <img src={x} alt="delete" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
 */