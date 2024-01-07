import React, { useContext, useEffect, useState } from "react";
// import AdminNavbar from './AdminNavbar/adminNavbar'
import AdminAllBooks from "./AdminRead/adminAllBooks";
import { Route, Routes, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import AddLibrary from "./addLibrary";
import AdminAllAuthors from "./AdminRead/adminAllAuthors";
import AdminAllCategories from "./AdminRead/adminAllCategories";
import AddBookForm from "../AddEditBookForm/AddEditBookForm";
import AddAuthorForm from "../AddEditAutherForm/AddEditAutherForm";
import AddCategoryForm from "./addCategory";
import AdminOutlet from "../../Outlet/AdminOutlet";
import NotFound from "../../components/NotFound/AdminNotFound";
import axios from "axios";

import LibraryManagement from "./LibraryManagement/LibraryManagement";
import SideBar from "../../components/SideBar/SideBar";
import Users from "./Users/Users";
import { Overview } from "../Overview/Overview";
import { Profile } from "../Profile/Profile";
import HiddenLegend from "../../components/Charts/ToChart";
import AdminLibraries from "./AdminLibraries/AdminLibraries";
import ProtectedRoute from "../../routes/ProtectedRoute";
import { userContext } from "../../App";
function Dashboard({ user }) {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [libraries, setLibraries] = useState([]);
  const navigate = useNavigate();
  console.log(user);

  const handleDeleteAlert = () => {
    const message = "The Book is deleted";
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleDeleteBook = (bookId) => {
    axios
      .delete(`${process.env.REACT_APP_PATH}api/books/delete`, {
        params: { id: bookId },
      })
      .then((response) => {
        console.log("Book deleted successfully");
        handleDeleteAlert();

        const updatedBooks = books.filter((book) => book.id !== bookId);
        setBooks(updatedBooks);
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

  const handleDeleteAuthor = (authorId) => {
    axios
      .delete(`${process.env.REACT_APP_PATH}api/authors/${authorId}`)
      .then((response) => {
        console.log("Author deleted successfully");

        const updatedAuthors = authors.filter(
          (author) => author.id !== authorId
        );
        setAuthors(updatedAuthors);
      })
      .catch((error) => {
        console.error("Error deleting author:", error);
      });
  };

  const handleDeleteCategory = (categoryId) => {
    axios
      .delete(`${process.env.REACT_APP_PATH}api/categories/${categoryId}`)
      .then((response) => {
        console.log("Category deleted successfully");

        const updatedCategories = categories.filter(
          (category) => category.id !== categoryId
        );
        setCategories(updatedCategories);
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  const handleClick = async () => {
    try {
      const [
        booksResponse,
        authorsResponse,
        categoriesResponse,
        librariesResponse,
      ] = await Promise.all([
        axios.get(`${process.env.REACT_APP_PATH}api/books`),
        axios.get(`${process.env.REACT_APP_PATH}api/authors`),
        axios.get(`${process.env.REACT_APP_PATH}api/categories`),
        axios.get(`${process.env.REACT_APP_PATH}api/library`),
      ]);

      setBooks(booksResponse.data);
      setAuthors(authorsResponse.data);
      setCategories(categoriesResponse.data);
      setLibraries(librariesResponse.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleClick();
    if (user && user.role === "manager") {
      navigate("/dashboard/adminAllLibraries");
    }
  }, []);

  return (
    <div>
      <SideBar />
      <Routes>
        <Route
          exact
          path="/"
          element={<AdminOutlet handleClick={handleClick} />}
        >
          <Route exact path="/" element={<Overview />}></Route>
          <Route
            element={
              <ProtectedRoute isAllowed={user && user.role === "superAdmin"} />
            }
          >
            <Route
              path="/adminAllBooks"
              element={
                <AdminAllBooks
                  books={books}
                  authors={authors}
                  categories={categories}
                  handleDeleteBook={handleDeleteBook}
                />
              }
            ></Route>
            <Route
              path="/adminAllAuthors"
              element={
                <AdminAllAuthors
                  authors={authors}
                  handleDeleteAuthor={handleDeleteAuthor}
                />
              }
            ></Route>
            {/* /****************************************** */}

            <Route
              path="/adminAllCategories"
              element={
                <AdminAllCategories
                  categories={categories}
                  // handleDeleteCategory={handleDeleteCategory}
                />
              }
            ></Route>
          </Route>

          <Route
            path="/adminAllUsers"
            element={
              <ProtectedRoute isAllowed={user && user.role === "superAdmin"}>
                {" "}
                <Users />{" "}
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/adminAllLibraries"
            element={
              <ProtectedRoute
                isAllowed={
                  user &&
                  (user.role === "manager" || user.role === "superAdmin")
                }
              >
                <AdminLibraries />{" "}
              </ProtectedRoute>
            }
          ></Route>

          <Route path="/adminAddBook/:type" element={<AddBookForm handleClick={handleClick} />}></Route>
          <Route
            path="/adminAddAuthor/:type"
            element={<AddAuthorForm  handleClick={handleClick}/>
          }
          ></Route>
          <Route
            path="/adminAddCategory/:type"
            element={<AddCategoryForm handleClick={handleClick} />}
           
          ></Route>
          {/* /****************************************** */}

          <Route
            path="/adminAddLibrary/:type"
            element={<AddLibrary />}
          ></Route>
          <Route path="/libraries" element={<LibraryManagement />}></Route>
          {/* /****************************************** */}
        </Route>

        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/chart" element={<HiddenLegend />}></Route>

        {/* /****************************************** */}
        <Route path="/*" element={<NotFound />} />
        {/* </ProtectedRoutes> */}
      </Routes>
    </div>
  );
}
export default Dashboard;
