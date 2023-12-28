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
  const [libraryBooks, setLibraryBooks] = useState();
  const [allBooks, setAllBooks] = useState();
  const [search, setSearch] = useState();
  const [action, setAction] = useState("editLibrary");

  const id = 1;

  async function getLibraryBooks() {
    try {
      const responseLibraryBooks = await axios.get(
        `${process.env.REACT_APP_PATH}api/books/libraryBooks`,
        { params: { id: 1 } }
      );
      if (responseLibraryBooks) {
        setLibraryBooks(responseLibraryBooks.data);
        try {
          const responseAllBooks = await axios.get(
            `${process.env.REACT_APP_PATH}api/books/`
          );
          if (responseAllBooks) {
            const bookIds = [];
            responseLibraryBooks.data.map((item) => bookIds.push(item.id));
            setAllBooks(
              responseAllBooks.data.filter((item) => !bookIds.includes(item.id))
            );
            setIsLoading(false);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  function getData() {
    if (!isLoading) {
      let result = libraryBooks;
      if (search) {
        result = libraryBooks.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        );
      }

      return result;
    }
  }
  useEffect(() => {
    getLibraryBooks();
  }, []);
  return !isLoading ? (
    action === "editLibrary" ? (
      <div className={style.libraryManagementContainer}>
        <div className={style.optionsContainer}>
          <TextField
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            sx={{ width: 300 }}
            label="Search..."
          />
          <button
            className={style.addBookBtn}
            onClick={() => setAction("addBook")}
          >
            Add Book
          </button>
        </div>
        <DataGrid
          columns={[
            { field: "id", headerName: "ID", width: 100 },
            { field: "title", headerName: "Title", width: 300 },
            {
              field: "actions",
              width: 300,
              renderCell: (params) => {
                return <div className={style.changeStatusBtn}>Remove</div>;
              },
            },
          ]}
          rows={getData().map((item) => {
            return {
              id: item.id,
              title: item.title,
            };
          })}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    ) : (
      <Autocomplete
        
        className={style.autoCompleteText}
        options={allBooks}
        getOptionLabel={(option) => option.title}
        filterSelectedOptions
        renderInput={(params) => <TextField {...params} label="Book" />}
        multiple
      />
    )
  ) : (
    ""
  );
}

export default LibraryManagement;
