import React, { useEffect, useState } from 'react'
// import AdminNavbar from './AdminNavbar/adminNavbar'
import AdminAllBooks from "./AdminRead/adminAllBooks";
import { Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import AdminAllAuthors from './AdminRead/adminAllAuthors'
import AdminAllCategories from './AdminRead/adminAllCategories';
import AddBookForm from '../AddEditBookForm/AddEditBookForm'
import AddAuthorForm from '../AddEditAutherForm/AddEditAutherForm'
import AddCategoryForm from './addCategory'
import AdminOutlet from '../../Outlet/AdminOutlet';
import NotFound from '../../components/NotFound/AdminNotFound'
import axios from 'axios';
import ProtectedRoutes from '../../routes/protectedRoutes';
import SideBar from '../../components/SideBar/SideBar';
import AdminBarchart from '../../components/Charts/AdminBarchart';
import BookCurve from '../../components/Charts/BookCurve'
function Dashboard() {

  const [books, setBooks] = useState([])
  const [authors, setAuthors] = useState([])
  const [categories, setCategories] = useState([])


  const handleDeleteAlert = () => {
    const message = "The Book is deleted";
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }



  const handleDeleteBook = (bookId) => {
    axios.delete(`${process.env.REACT_APP_PATH}/api/books/${bookId}`)
      .then((response) => {
        console.log('Book deleted successfully')
        handleDeleteAlert();

        const updatedBooks = books.filter((book) => book.id !== bookId);
        setBooks(updatedBooks);
      })
      .catch((error) => {
        console.error('Error deleting book:', error)
      })
  }

  const handleDeleteAuthor = (authorId) => {
    axios.delete(`${process.env.REACT_APP_PATH}/api/authors/${authorId}`)
      .then((response) => {
        console.log('Author deleted successfully')

        const updatedAuthors = authors.filter((author) => author.id !== authorId);
        setAuthors(updatedAuthors);
      })
      .catch((error) => {
        console.error('Error deleting author:', error)
      })
  }

  const handleDeleteCategory = (categoryId) => {
    axios.delete(`${process.env.REACT_APP_PATH}/api/categories/${categoryId}`)
      .then((response) => {
        console.log("Category deleted successfully")

        // const updatedCategories = categories.filter((category) => category.id !== categoryId);
        // setCategories(updatedCategories)
        handleClick()
      })
      .catch((error) => {
        console.error('Error deleting category:', error)
      })
  }


  const handleClick = async () => {
    try {
      const [booksResponse, authorsResponse, categoriesResponse] = await Promise.all([
        axios.get(`${process.env.REACT_APP_PATH}/api/books`),
        axios.get(`${process.env.REACT_APP_PATH}/api/authors`),
        axios.get(`${process.env.REACT_APP_PATH}/api/categories`)
      ]);

      setBooks(booksResponse.data);
      setAuthors(authorsResponse.data);
      setCategories(categoriesResponse.data);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const handleFetch=async()=>{
  //   handleClick()
  // }
  useEffect(() => {
    handleClick()
  }, [])

  return (
    <div>

      <ToastContainer />
      <Routes>
        {/* <ProtectedRoutes roles={['admin','superadmin','manager']}> */}
        <Route exact path='/' element={<AdminOutlet handleClick={handleClick} />}>
          <Route exact path='/' element={<AdminAllBooks books={books} authors={authors} categories={categories} handleDeleteBook={handleDeleteBook} />}></Route>
          <Route path='/adminAllBooks'  element={<AdminAllBooks books={books} authors={authors} categories={categories} handleDeleteBook={handleDeleteBook} />}></Route>
          <Route path='/adminAllAuthors' element={<AdminAllAuthors authors={authors} handleDeleteAuthor={handleDeleteAuthor} />}></Route>
          {/* /****************************************** */}
          <Route path='/adminAllLibraries' element={<AdminAllAuthors authors={authors} handleDeleteAuthor={handleDeleteAuthor} />}></Route>
          {/* /****************************************** */}
          <Route path='/adminAllCategories' element={<AdminAllCategories categories={categories} handleDeleteCategory={handleDeleteCategory} />}></Route>
          <Route path='/adminAddBook/:type' element={<AddBookForm />} ></Route>
          <Route path='/adminAddAuthor/:type' element={<AddAuthorForm />}></Route>
          <Route path='/adminAddCategory/:type' element={<AddCategoryForm />} handleAdd={handleClick}></Route>
          {/* /****************************************** */}
          <Route path='/adminAddLibrary/:type' element={<AddCategoryForm />}></Route>
          <Route path="/side" element={<AdminBarchart />}></Route>

          {/* /****************************************** */}
        </Route>

        <Route path="/*" element={<NotFound />} />
        {/* </ProtectedRoutes> */}
      </Routes>
    </div>
  );
}

export default Dashboard
