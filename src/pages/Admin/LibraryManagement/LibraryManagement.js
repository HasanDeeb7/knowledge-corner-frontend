import { Autocomplete, Checkbox, TextField } from "@mui/material";
import style from "./LibraryManagement.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { DataGrid } from "@mui/x-data-grid";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function LibraryManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState();
  const [isDisabled, setIsDisabled] = useState(false);
  const [bookList, setBookList] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState();
  async function getBooks() {
    console.log(process.env.REACT_APP_PATH);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PATH}api/books`
      );
      if (response) {
        console.log(response);
        setBooks(response.data);
        setFilteredBooks(
          search.length > 0
            ? response.data.filter((item) => {
                item.title.toLowerCase().includes(search.toLocaleLowerCase);
              })
            : books
        );
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  function getData() {
    if (!isLoading) {
      if (search.length > 0) {
        const result = books.filter((item) => {
          item.title.toLowerCase().includes;
        });
      }
    }
  }
  useEffect(() => {
    getBooks();
  }, [search]);
  return (
    !isLoading && (
      <div>
        <TextField
          onChange={(e) => {
            setSearch(e.target.value);
            console.log(search);
            console.log(filteredBooks);
          }}
          value={search}
        />
        <DataGrid
          columns={[
            { field: "id", headerName: "ID", width: 100 },
            { field: "title", headerName: "Title", width: 300 },
            // { field: "role", headerName: "Role", width: 300 },
            // { field: "status", headerName: "Status", width: 300 },
            {
              field: "actions",
              width: 300,
              renderCell: (params) => {
                return (
                  <div className={style.changeStatusBtn}>
                    {params.row.status === "active" ? "Deactivate" : "Activate"}
                  </div>
                );
              },
            },
          ]}
          rows={
            filteredBooks
              ? filteredBooks.map((item) => {
                  return {
                    id: item.id,
                    title: item.title,
                  };
                })
              : books.map((item) => {
                  return {
                    id: item.id,
                    title: item.title,
                  };
                })
          }
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(ids) => {
            setBookList(ids);
            console.log(ids);
          }}
        />
      </div>
    )
  );
}

export default LibraryManagement;
