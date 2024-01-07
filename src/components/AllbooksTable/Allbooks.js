
import * as React from 'react';
import { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import axios from 'axios';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
// import styles from '../../Components/Table/TableComponent.module.css'
// import  {useUserContext}  from '../../Auth/UserContext';
import x from "../../assets/icons/862px-Delete-button 1.svg";
import update from "../../assets/icons/Vector (4).svg";
import adminAllBooksStyle from "./adminAllBook.module.css";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input'
import Modal from '@mui/material/Modal';
import style from '../../pages/Profile/profile.module.css'
import { color } from 'framer-motion';
import AddCategory from '../../pages/Admin/addCategory';

export default function ToolbarGrid({ books ,libraries, authors, categories, handleDeleteBook,handleDeleteAuthor,handleDeleteCategory ,type}) {
const [loading,setLoading]=useState(false)

const [open, setOpen] = React.useState(false);
const [library, setLibrary] = React.useState([]);



  const booksColumns = [
    { field: 'image', headerName: 'Image',width:100, renderCell: (params) => {
      return(
        <img src={`${process.env.REACT_APP_PATH}/images/${params.row.image}`}
        style={{width:'45px',height:'45px',borderRadius:'50%'}}
        />

      )
    }},

    { field: 'id', headerName: 'ID',width:100},
    { field: 'ISBN', headerName: 'ISBN' , width:100 },
    { field: 'title', headerName: 'Title' ,width:100},
    { field: 'publicationDate', headerName: 'Publication Date',width:140 },
    { field: 'nbPages', headerName: 'Nb Of Pages' ,width:140},
    { field: 'description', headerName: 'Description' ,width:180 },
    { field: 'rating', headerName: 'Rating',width:100 },
    { field: 'language', headerName: 'Language',width:150},

    { field: 'categoryName', headerName: 'Category',width:130},
    
    { field: 'Actions', headerName: 'Actions',width:220,renderCell:(params)=>{
      return(
        <span className={adminAllBooksStyle.buttonContainer}>
        <Link
          to={"/dashboard/adminAddBook/Edit"}
          state={{book:params.row}}
        >
          <button
className={adminAllBooksStyle.changeStatusBtn}
>
            {/* <img src={update} alt="update" /> */}
            update
          </button>
        </Link>
        <button
className={adminAllBooksStyle.changeStatusBtn}
style={{background:'darkred'}}        
  onClick={() => {
            handleDeleteBook(params.row.id);
          }}
        >
          delete
          {/* <img src={x} alt="delete" /> */}
        </button>
      </span>
      )
  
    }},

  ];


  const authorsColumns=[
    { field: 'image', headerName: 'Image',width:100, renderCell: (params) => {
      return(
        <img src={`${process.env.REACT_APP_PATH}/images/${params.row.image}`}/>

      )
    }},
    { field: 'id', headerName: 'ID' ,width:140},
    { field: 'firstName', headerName: 'first Name' ,width:130 },
    { field: 'lastName', headerName: 'last Name' ,width:130 },
    { field: 'dob', headerName: 'Date of Birth',width:180 ,valueFormatter: (params) => {
      const date = new Date(params.value);
      return date.toISOString().split('T')[0];
    },},
    { field: 'nationality', headerName: 'Nationality',width:150},
      { field: 'rating', headerName: 'Rating',width:120},

    { field: 'Actions', headerName: 'Actions',width:230,renderCell:(params)=>{
      return(
        <span className={adminAllBooksStyle.buttonContainer} style={{display:'flex',flexDirection:'row',gap:'7px'}} >
        <Link
          to={"/dashboard/adminAddAuthor/Edit"}
          state={{author:params.row}}
        >
          <button className={adminAllBooksStyle.changeStatusBtn}>
            {/* <img src={update} alt="update" /> */}
            update
          </button>
        </Link>
        <button
          className={adminAllBooksStyle.changeStatusBtn}
          style={{background:'darkred'}}
          onClick={() => {
            handleDeleteAuthor(params.row.id);
          }}
        >
          delete
        </button>
      </span>
    
      )
  
    }},
  ]

  const categoryColumns=[
    { field: 'id', headerName: 'ID',width:150},
    { field: 'Name', headerName: 'Name' , width:250 },
    { field: 'Actions', headerName: 'Actions',width:270,renderCell:(params)=>{
      return(
        <span className={adminAllBooksStyle.buttonContainer} >
        <Link
          to={"/dashboard/adminAddCategory/Edit"}
          state={{category:params.row}}
        >
          <button
           className={adminAllBooksStyle.changeStatusBtn}
           >
            update
          </button>
        </Link>
        <button
className={adminAllBooksStyle.changeStatusBtn}
style={{background:'darkred'}}        
   onClick={() => {
            handleDeleteCategory(params.row.id);
          }}
        >
          delete
        </button>
      </span>
      )
  
    }},
  ]
  const handleOpen = (data) => {
    setOpen(true);
  setLibrary(data)
}

  const handleClose = () => setOpen(false);

  const libraryColumn=[
    { field: 'id', headerName: 'ID',width:150},
    { field: 'name', headerName: 'Name' , width:250 },
    { field: 'status', headerName: 'Status' , width:250 },

    { field: 'action', headerName: 'Actions',width:200,renderCell:(params)=>{
      const isActive=params.row.status==='active'
      return(
        <span className={adminAllBooksStyle.buttonContainer}>
           <button className={adminAllBooksStyle.updateDelete}>
            <img src={update} alt="update" onClick={()=>handleOpen(params.row)} />
          </button>
      </span>
      )
  
    }},
  ]
  const myCustomData = [
    {
      id: 0, // Use 0 as a special ID for the loading row
      // name: loading ? 'Loading...' : '', 
      age: '',
      BuyerId: '',
    },
    { id: '', name: 'Abdulaziz Doe', age: 25 },

  ];
  
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
  const emptyRow = { id: 'Loading...'};

  return (
    <div style={{  width: '100%', margin: 'auto', height: "100%", marginTop: "3rem" }}>
    <DataGrid
      rows={type==="book"?books:type==="author"?authors:type==="category"?categories:libraries}
      columns={type==="book"?booksColumns:type==="author"?authorsColumns:type==="category"?categoryColumns:libraryColumn}
      pagination
      pageSize={5}
      fontSize={20}
      rowHeight={60}
      rowsPerPageOptions={[5, 10, 20]}
      components={{
        Toolbar: CustomToolbar, 
      }}
      sx={{
        fontSize: "17px",
        border:"none !important",
        
        height:'100%',
        color: 'black',
        '& .MuiDataGrid-root': {
          backgroundColor: 'white',
          fontFamily: "var(--main-font-family)",
          // border:"1px solid red"
          // Background color of the entire grid
        },
        '& .MuiDataGrid-columnHeader': {
          color: 'black',
          backgroundColor: '#F5F5F5',
          fontFamily: "var(--main-font-family)",
        },
        '& .MuiDataGrid-cell': {
          borderBottom: '1px solid rgb(199, 195, 195)', // Border between cells
          color: 'black',
          // borderColor:"#7A7A7A !important",
          fontFamily: "var(--main-font-family)" 
        },
        '& .MuiTablePagination-root': {
          color: 'black',
          fontFamily: "var(--main-font-family)"
        },
        '& .MuiDataGrid-toolbar': {
          backgroundColor: 'black',
          fontFamily: "var(--main-font-family)" 
        },
        '& .MuiDataGrid-toolbarContainer': {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: "var(--main-font-family)"
        },
        '& .MuiButtonBase-root': {
          color: 'grey',
          fontSize: "17px",
          fontFamily: "var(--main-font-family)"// Text color for buttons in the toolbar
        },
        '& .MuiPaginationItem-icon': {
          color: 'black',
          fontFamily: "var(--main-font-family)" // Color of pagination icons
        },
        '& .MuiDataGrid-row:hover': {
          backgroundColor: '#F5F5F5', // Change the background color on hover
        },
      }}
    />
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

<div className={style.inputContainer}>
  <label className={style.label}>Name</label>
  <input
    className={style.input}
    type="text"
    placeholder="Library's Name"
    name="name"
    id="name"
    defaultValue={ library.name?library.name : ""}
    required
  />
</div>
<div className={style.inputContainer}>
  <label>Status</label>
  <select
   className={style.input}
   type="status"
   placeholder="Library Status"
   name="status"
   id="status"
   >
    <option value={library.status==="active"?'Active':'inActive'}></option>
    <option value={library.status==="active"?'inActive':'Active'}></option>

  </select>
</div>

<div className={style.buttonContainer}>
  <button className={style.add}  style={{opacity:1}}>

    Update Library
  </button>
</div>
      </Box>
        </Box>
      </Modal>
      {/* <AddCategory open={open} handleAdd={handleAdd} handleClose={handleClose} data={}/> */}
  </div>
  
  
  );
}
const CustomToolbar = () => {
  return (
    <GridToolbar>
      {/* Add any custom elements or styling here */}
    </GridToolbar>
  );
};


