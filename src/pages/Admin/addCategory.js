import React, { useState } from "react";
import addCategoryStyle from "./addCategory.module.css";
import axios from "axios";
import { useParams } from "react-router";
import { Helmet } from "react-helmet";
import bookIcon from '../../assets/icons/category.png'
import { useNavigate } from "react-router-dom";
import {useLocation} from 'react-router-dom'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input'
import Modal from '@mui/material/Modal';

function AddCategory({handleAdd}) {
  const [categoryName, setCategoryName] = useState("");
  const location=useLocation()
  const [open, setOpen] = React.useState(true);
  const [category,setCategory]=useState(location.state)
  const {type}=useParams()


const handleOpen = (data) => {
  setOpen(true);
}

const handleClose = () => setOpen(false);

console.log()
  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const navigate=useNavigate()

  const Back=()=>{
    navigate(-1)
  }
// console.log(type)
const refetchCategory=async()=>{
try{
const res=await axios.get(`${process.env.REACT_APP_PATH}api/categories/one`,{
  params:{id:category.category.id}})
if(res){
  setCategory(res.data)
}
else{
  console.log("Error fetching the category")
}
}
catch(err){
  console.log("Error fetching the category"+err.message)
}
}
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

  const editCategory=(e)=>{
    e.preventDefault();
    axios
      .patch(`${process.env.REACT_APP_PATH}api/categories/${category.category.id}`, { name: categoryName })
      .then((response) => {
        console.log("Category edited");
        // setCategoryName("");
        // setCategory(reps.data)
        // refetchCategory()
        handleAdd()
        navigate(-1)

      })
      .catch((error) => {
        console.log("Error creating category");
      });
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className={addCategoryStyle.addCategoryComponent}>
         <Helmet>
        <meta charSet="utf-8" />
        <title>Add Category</title>
        <meta name="description" content="Admin Dashboard add category" />
        <link rel="icon"  href={bookIcon} sizes="16x16" />
      </Helmet>

      {/* <h1>{type+" Category"} </h1>

      <form className={addCategoryStyle.formCategory} onSubmit={type===`Add`?addCategory:editCategory}>
        <label for="category">Category's name</label>
        <input
          type="text"
          placeholder="Category Name"
          defaultValue={type==='Edit' && category.category.Name}
          onChange={handleCategoryNameChange}
          required
        />

        <button className={addCategoryStyle.cancelButton} onClick={Back}>Cancel</button>
        <button type="submit" className={addCategoryStyle.addButton} >
          {type}
        </button>
      </form> */}
<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
Edit Article
          </Typography>
          <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >


{/* <h1>{type+" Category"} </h1> */}

<form className={addCategoryStyle.formCategory} onSubmit={type===`Add`?addCategory:editCategory}>
  <label for="category">Category's name</label>
  <input
    type="text"
    placeholder="Category Name"
    defaultValue={type==='Edit' && category.category.Name}
    onChange={handleCategoryNameChange}
    required
  />

  <button className={addCategoryStyle.cancelButton} onClick={Back}>Cancel</button>
  <button type="submit" className={addCategoryStyle.addButton} >
    {type}
  </button>
</form>
      </Box>
        </Box>
      </Modal>   
       </div>
  );
}

export default AddCategory;

