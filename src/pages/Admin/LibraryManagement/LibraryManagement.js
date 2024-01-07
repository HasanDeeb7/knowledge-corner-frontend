import { Autocomplete, Checkbox, TextField } from "@mui/material";
import style from "./LibraryManagement.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function LibraryManagement() {
  const libraryData = useLocation().state;
  const [isLoading, setIsLoading] = useState(true);
  const [libraryBooks, setLibraryBooks] = useState();
  const [allBooks, setAllBooks] = useState();
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [search, setSearch] = useState();
  const [editing, setEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [newLibraryName, setNewLibraryName] = useState(libraryData.name);
  const navigate = useNavigate();

  const id = libraryData.id;
  console.log(id);
  async function handleConfirmLibraryName() {
    if (newLibraryName === libraryData.name) {
      return setEditing(false);
    }
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_PATH}api/library/update`,
        { id: libraryData.id, name: newLibraryName }
      );
      if (res) {
        console.log(res.data);
        toast.success("New Name is Set");
        navigate("/dashboard/adminAllLibraries");
      }
    } catch (error) {
      console.log(error);
    }
  }

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
        setModalOpen(false);
        getLibraryBooks();
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
        getLibraryBooks();
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
        { params: { id: id } }
      );
      if (responseLibraryBooks) {
        setLibraryBooks(responseLibraryBooks.data);
        console.log(responseLibraryBooks.data);
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
    <div className={style.libraryManagementContainer}>
      <div className={style.optionsContainer}>
        <TextField
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          sx={{ width: 300 }}
          label="Search..."
        />
        <div>
          <input
            type="text"
            value={newLibraryName}
            className={editing ? style.editingName : style.libraryName}
            onChange={(e) => setNewLibraryName(e.target.value)}
            disabled={!editing}
          />
          {editing ? (
            <CheckIcon
              className={style.editLibraryNameBtn}
              onClick={() => handleConfirmLibraryName()}
            />
          ) : (
            <EditIcon
              className={style.editLibraryNameBtn}
              onClick={() => setEditing(true)}
            />
          )}
        </div>
        <button className={style.addBookBtn} onClick={() => setModalOpen(true)}>
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

      <>
        {modalOpen && (
          <div className={style.addBookModalContainer}>
            <div className={style.addBookModal}>
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
              <div className={style.btnContainer}>
                <button className={style.submitBtn} onClick={handleSubmit}>
                  Submit
                </button>
                <button
                  className={style.cancelBtn}
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  ) : (
    ""
  );
}

export default LibraryManagement;
