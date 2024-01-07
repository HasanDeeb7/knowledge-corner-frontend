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

function AddCategory({handleClick}) {
  const [categoryName, setCategoryName] = useState("");
  const location=useLocation()
  const [open, setOpen] = React.useState(true);
  // const categoryState=location.state.category && []
  console.log(location.state)
  const [category,setCategory]=useState(location.state?location.state.category: [])
  const {type}=useParams()

const handleOpen = (data) => {
  setOpen(true);
}
const handleClose = () => setOpen(false);


const submit=(e)=>{
  e.preventDefault()
  if(type==="Add"){
    addCategory(e)
  }
  else{
    editCategory(e)
  }
}
console.log()
  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
    console.log("cavvsbd"+categoryName)
  };

  const navigate=useNavigate()

  const Back=()=>{
    navigate('/dashboard/adminAllCategories')
  }

   const addCategory = async(e) => {
    e.preventDefault();
    console.log("Creatonggggggggggg");

    try{
      const response=await  axios.post(`${process.env.REACT_APP_PATH}api/categories`, { name: categoryName })
      if(response.status===200){
           console.log("Category created");
        // setCategoryName("");
        handleClick()
        handleClose()
        navigate('/dashboard/adminAllCategories')
      }
      else{
        console.log("no response")
      }
    }
      catch(error) {
        console.log("Error creating category"+error.message);
      };
  };

  const editCategory=(e)=>{
    e.preventDefault();
    axios
      .patch(`${process.env.REACT_APP_PATH}api/categories/${category?.id}`,{ name: categoryName })
      .then((response) => {
        console.log("Category edited");
        // setCategoryName("");
        // setCategory(reps.data)
        // refetchCategory()
        handleClick()
        handleClose()
        navigate('/dashboard/adminAllCategories')

      })
      .catch((error) => {
        console.log("Error creating category"+error.message);
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
        <title>{type+" Category"}</title>
        <meta name="description" content="Admin Dashboard manage  category" />
        <link rel="icon"  href={bookIcon} sizes="16x16" />
      </Helmet>
<Modal
        open={open}
        onClose={Back}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >


<h1>{type+" Category"} </h1>

<div className={addCategoryStyle.formCategory}  >
  <label for="category">Category's name</label>
  <input
    type="text"
    placeholder="Category Name"
    defaultValue={type==='Edit' ? category?.Name:categoryName}
    onChange={handleCategoryNameChange}
    required
  />

  <button className={addCategoryStyle.cancelButton} onClick={Back}>Cancel</button>
  <button type="submit" onClick={(e)=>submit(e)} className={addCategoryStyle.addButton} >
    {type}
  </button>
</div>
      </Box>
        </Box>
      </Modal>   
       </div>
  );
}

export default AddCategory;

