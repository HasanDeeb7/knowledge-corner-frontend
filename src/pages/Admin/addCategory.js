import React, { useState } from "react";
import addCategoryStyle from "./addCategory.module.css";
import axios from "axios";
import { useParams } from "react-router";
import { Helmet } from "react-helmet";
import bookIcon from '../../assets/icons/category.png'


function AddCategory({handleAdd}) {
  const [categoryName, setCategoryName] = useState("");
const {type}=useParams()
  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const addCategory = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_PATH}api/categories`, { name: categoryName })
      .then((response) => {
        console.log("Category created");
        setCategoryName("");
        handleAdd()

      })
      .catch((error) => {
        console.log("Error creating category");
      });
  };

  return (
    <div className={addCategoryStyle.addCategoryComponent}>
         <Helmet>
        <meta charSet="utf-8" />
        <title>Add Category</title>
        <meta name="description" content="Admin Dashboard add category" />
        <link rel="icon"  href={bookIcon} sizes="16x16" />
      </Helmet>

      <h1>Add</h1>

      <form className={addCategoryStyle.formCategory} onSubmit={addCategory}>
        <label for="category">Category's name</label>
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={handleCategoryNameChange}
          required
        />

        <button className={addCategoryStyle.cancelButton}>Cancel</button>
        <button type="submit" className={addCategoryStyle.addButton} >
          Add
        </button>
      </form>
    </div>
  );
}

export default AddCategory;
