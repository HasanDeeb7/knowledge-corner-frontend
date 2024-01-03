import { Autocomplete, Checkbox, TextField } from "@mui/material";
import style from "./LibraryManagement.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function LibraryManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [libraryBooks, setLibraryBooks] = useState();
  const [allBooks, setAllBooks] = useState();

  const [selectedBooks, setSelectedBooks] = useState([]);
  const [search, setSearch] = useState();
  const [action, setAction] = useState("editLibrary");

  const id = 1;


  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const res = await axios.post(
        `${process.env.REACT_APP_PATH}api/books/addtolibrary`,
        { libraryId: id, bookList: selectedBooks }
      );
      if (res) {
        console.log(res.data);
        toast.success("Books has Been Added to the Library");
        setAction('e')
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function removeFromLibrary(bookId) {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_PATH}api/books/removefromlibrary`,
        { bookId: bookId, libraryId: id }
      );
      if (res) {
        toast.success(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleAutocompleteChange = (event, values) => {
    const selectedIds = values.map((option) => option.id);
    setSelectedBooks(selectedIds);
    console.log(selectedIds);
  };

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

                return (
                  <button
                    onClick={() => removeFromLibrary(params.id)}
                    className={style.submitBtn}
                  >
                    Remove
                  </button>
                );

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
      <div style={{ marginTop: 30 }}>
        <Autocomplete
          className={style.autoCompleteText}
          limitTags={1}
          options={allBooks}
          disableClearable
          getOptionLabel={(option) => option.title}
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} label="Book" />}
          multiple
          onChange={handleAutocompleteChange}
        />
        <button className={style.submitBtn} onClick={handleSubmit}>
          Submit
        </button>
      </div>

    )
  ) : (
    ""
  );
}

export default LibraryManagement;
