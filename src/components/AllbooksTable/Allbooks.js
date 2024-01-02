
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

export default function ToolbarGrid({ books , authors, categories, handleDeleteBook,handleDeleteAuthor,handleDeleteCategory ,type}) {
// const [books,setBooks]=useState(null)
const [loading,setLoading]=useState(false)
//   const fetchBooks= async()=>{
//     try {
//       const allResults =await axios.get(`${process.env.REACT_APP_PATH}/api/books`)
      
//       if(allResults){
//         setBooks(allResults.data)
//         console.log("Books fetched successfully:", allResults.data);
//         setLoading(false)
//       }
//       console.log('no data')
//       setLoading(false)


//     } catch (error) {
//       console.log('error fetching'+error.message)
//       setLoading(false)

//     }
//   }

  const booksColumns = [
    { field: 'image', headerName: 'Image',width:100, renderCell: (params) => {
      return(
        <img src={`${process.env.REACT_APP_PATH}/images/${params.row.image}`}/>

      )
    }},

    { field: 'id', headerName: 'ID',width:100},
    { field: 'ISBN', headerName: 'ISBN' , width:100 },
    { field: 'title', headerName: 'Title' ,width:100},
    { field: 'publicationDate', headerName: 'Publication Date',width:140 },
    { field: 'nbPages', headerName: 'Nb Of Pages' ,width:140},
    { field: 'description', headerName: 'Description' ,width:180 },
    { field: 'rating', headerName: 'Rating',width:180 },
    { field: 'language', headerName: 'Language',width:150},

    { field: 'categoryName', headerName: 'Category',width:150},
    
    { field: 'Actions', headerName: 'Actions',width:150,renderCell:(params)=>{
      return(
        <span className={adminAllBooksStyle.buttonContainer}>
        <Link
          to={"/dashboard/adminAddBook/Edit"}
          state={{book:params.row}}
        >
          <button className={adminAllBooksStyle.updateDelete}>
            <img src={update} alt="update" />
          </button>
        </Link>
        <button
          className={adminAllBooksStyle.updateDelete}
          onClick={() => {
            handleDeleteBook(params.row.id);
          }}
        >
          <img src={x} alt="delete" />
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
    { field: 'description', headerName: 'Description' ,width:180 },
    { field: 'dob', headerName: 'Date of Birth',width:180 },
    { field: 'nationality', headerName: 'Nationality',width:150},
      { field: 'rating', headerName: 'Rating',width:150},

    { field: 'Actions', headerName: 'Actions',width:150,renderCell:(params)=>{
      return(
        <span className={adminAllBooksStyle.buttonContainer}>
        <Link
          to={"/dashboard/adminAddAuthor/Edit"}
          state={{book:params.row}}
        >
          <button className={adminAllBooksStyle.updateDelete}>
            <img src={update} alt="update" />
          </button>
        </Link>
        <button
          className={adminAllBooksStyle.updateDelete}
          onClick={() => {
            handleDeleteAuthor(params.row.id);
          }}
        >
          <img src={x} alt="delete" />
        </button>
      </span>
      )
  
    }},
  ]
  // let columns = role === 'merchant' ? commonColumns.filter(column => column.field !== 'SellerId') : commonColumns;

  const categoryColumns=[
    { field: 'id', headerName: 'ID',width:150},
    { field: 'Name', headerName: 'Name' , width:250 },
    { field: 'Actions', headerName: 'Actions',width:200,renderCell:(params)=>{
      return(
        <span className={adminAllBooksStyle.buttonContainer}>
        <Link
          to={"/dashboard/adminAddCategory/Edit"}
          state={{book:params.row}}
        >
          <button className={adminAllBooksStyle.updateDelete}>
            <img src={update} alt="update" />
          </button>
        </Link>
        <button
          className={adminAllBooksStyle.updateDelete}
          onClick={() => {
            handleDeleteCategory(params.row.id);
          }}
        >
          <img src={x} alt="delete" />
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
  

  const emptyRow = { id: 'Loading...'};

  // const rowsWithEmptyRow = loading ? emptyRow : books;

// React.useEffect(()=>{
//   fetchBooks()
// },[])

  return (
    <div style={{  width: '100%', margin: 'auto', height: "100%", marginTop: "3rem" }}>
    <DataGrid
      rows={type==="book"?books:type==="author"?authors:type==="category"?categories:null}
      columns={type==="book"?booksColumns:type==="author"?authorsColumns:categoryColumns}
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
        // gap:"rem",
        // border:'1px solid black',
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












// import * as React from 'react';
// import Box from '@mui/material/Box';
// import {
//   DataGridPremium,
//   GridToolbar,
//   useGridApiRef,
//   useKeepGroupedColumnsHidden,
// } from '@mui/x-data-grid-premium';
// import { useDemoData } from '@mui/x-data-grid-generator';

// export default function DataGridPremiumDemo() {
//   const { data, loading } = useDemoData({
//     dataSet: 'Commodity',
//     rowLength: 100,
//     editable: true,
//     visibleFields: [
//       'commodity',
//       'quantity',
//       'filledQuantity',
//       'status',
//       'isFilled',
//       'unitPrice',
//       'unitPriceCurrency',
//       'subTotal',
//       'feeRate',
//       'feeAmount',
//       'incoTerm',
//     ],
//   });
//   const apiRef = useGridApiRef();

//   const initialState = useKeepGroupedColumnsHidden({
//     apiRef,
//     initialState: {
//       ...data.initialState,
//       rowGrouping: {
//         ...data.initialState?.rowGrouping,
//         model: ['commodity'],
//       },
//       sorting: {
//         sortModel: [{ field: '__row_group_by_columns_group__', sort: 'asc' }],
//       },
//       aggregation: {
//         model: {
//           quantity: 'sum',
//         },
//       },
//     },
//   });

//   return (
//     <Box sx={{ height: 520, width: '100%' }}>
//       <DataGridPremium
//         {...data}
//         apiRef={apiRef}
//         loading={loading}
//         disableRowSelectionOnClick
//         initialState={initialState}
//         slots={{ toolbar: GridToolbar }}
//       />
//     </Box>
//   );
// }