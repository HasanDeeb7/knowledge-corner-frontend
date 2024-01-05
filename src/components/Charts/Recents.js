import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useState,useEffect } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor:'#03151e',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme,index }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // backgroundColor: index % 2 === 0 ?  theme.palette.action.hover:undefined,

  // hide last border
  '&:last-child td, &:last-child th': {
    border: 'none',
  
  },
}));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }



// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];





export default function CustomizedTables() {

  const [books,setBooks]=useState(null)
  const [loading,setLoading]=useState(true)



  const fetchBooks=async()=>{

    try{

      const res=await axios.get(`${process.env.REACT_APP_PATH}/api/books/recents`)
      if(res){
        setBooks(res.data)
        console.log(res.data)
        setLoading(false)
      }
      console.log('Errorr no response')
      setLoading(false)

    }
    catch(err){
      console.log("Error fetching the recents books"+err.message)
      setLoading(false)

    }
  }
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <TableContainer component={Paper} style={{width:'800px',padding:'7px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add a box shadow
    borderRadius: '8px',}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ISBN</StyledTableCell>
            <StyledTableCell align="right">Title</StyledTableCell>
            <StyledTableCell align="right">Author Name</StyledTableCell>
            <StyledTableCell align="right">Language</StyledTableCell>
            <StyledTableCell align="right">Rating</StyledTableCell>
    
          </TableRow>
        </TableHead>
        <TableBody>
          {books?.map((row,index) => (
            <StyledTableRow key={row.id} index={index} >
              <StyledTableCell  scope="row">
                {row.ISBN}
              </StyledTableCell>
              <StyledTableCell align="right">{row.title}</StyledTableCell>
              <StyledTableCell align="right">{row.authorName}</StyledTableCell>
              <StyledTableCell align="right">{row.language}</StyledTableCell>
              <StyledTableCell align="right">{row.rating}</StyledTableCell>
  
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}