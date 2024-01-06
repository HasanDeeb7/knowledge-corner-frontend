import React, { useState } from "react";
import addCategoryStyle from "./addCategory.module.css";
import axios from "axios";
import { useParams } from "react-router";
import { Helmet } from "react-helmet";
import libraryIcon from '../../assets/icons/library.png'
import { useNavigate } from "react-router-dom";


function AddLibrary({handleAdd}) {
  const [libraryName, setLibraryName] = useState("");
const {type}=useParams()
  const handleCategoryNameChange = (e) => {
    setLibraryName(e.target.value);
  };

  const navigate=useNavigate()

  const Back=()=>{
    navigate(-1)
  } 

  const addCategory = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_PATH}api/library/create`, { name: libraryName })
      .then((response) => {
        console.log("Library created");
        setLibraryName("");
        handleAdd()

      })
      .catch((error) => {
        console.log("Error creating library");
      });
  };

  return (
    <div className={addCategoryStyle.addCategoryComponent}>
         <Helmet>
        <meta charSet="utf-8" />
        <title>Add Library</title>
        <meta name="description" content="Admin Dashboard add Library" />
        <link rel="icon"  href={libraryIcon} sizes="16x16" />
      </Helmet>

      <h1>Add a Library</h1>

      <form className={addCategoryStyle.formCategory} onSubmit={addCategory}>
        <label for="category">Library's name</label>
        <input
          type="text"
          placeholder="Library Name"
          value={libraryName}
          onChange={handleCategoryNameChange}
          required
        />

        <button className={addCategoryStyle.cancelButton} onClick={Back}>Cancel</button>
        <button type="submit" className={addCategoryStyle.addButton} >
          Add
        </button>
      </form>
    </div>
  );
}

export default AddLibrary;
