import { DataGrid } from "@mui/x-data-grid";
import style from "./AdminLibraries.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function AdminLibraries({ loggedUser }) {
  const [libraries, setLibraries] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newLibrary, setNewLibrary] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  async function changeStatus(data) {
    try {
      const status = data.status;
      const updatedStatus = status === "active" ? "inactive" : "active";
      const response = await axios.patch(
        `${process.env.REACT_APP_PATH}api/library/status`,
        { id: data.id, status: updatedStatus }
      );
      if (response) {
        console.log(response);
        getLibraries();
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function handleDelete(data) {
    console.log(data);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_PATH}api/library/delete`,
        { params: { id: data.id } }
      );
      if (response) {
        toast.success("Library Has Been Deleted");
        getLibraries();
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function addLibrary() {
    setIsDisabled(true);
    try {
      const res = axios.post(
        `${process.env.REACT_APP_PATH}api/library/create`,
        { name: newLibrary }
      );
      if (res) {
        toast.success("New Library Created");
        getLibraries();
        setNewLibrary("");
        setIsDisabled(false);
      }
    } catch (error) {
      setIsDisabled(false);
      console.log(error);
    }
    getLibraries();
  }

  const getLibraries = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_PATH}api/library`);
      if (res) {
        setLibraries(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLibraries();
  }, []);

  return (
    <div className={style.AdminLibrariesContainer}>
      <button
        className={`${style.addLibraryBtn} ${
          loggedUser.status === "inactive" && style.disabledBtn
        }`}
        disabled={loggedUser.status === "inactive"}
        onClick={() => setIsAdding(!isAdding)}
      >
        Add Library
      </button>
      <DataGrid
        columns={[
          { field: "id", headerName: "ID", width: 100 },
          { field: "name", headerName: "Name", width: 300 },
          { field: "Books", headerName: "Number of Books", width: 200 },
          { field: "status", headerName: "Status", width: 200 },
          {
            field: "actions",
            width: 400,
            renderCell: (params) => {
              return (
                <div className={style.buttonsContainer}>
                  <button
                    className={`${style.changeStatusBtn} ${
                      loggedUser.status === "inactive" && style.disabledBtn
                    }`}
                    disabled={loggedUser.status === "inactive"}
                    onClick={() => changeStatus(params.row)}
                  >
                    {params.row.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    className={`${style.changeStatusBtn} ${
                      loggedUser.status === "inactive" && style.disabledBtn
                    }`}
                    disabled={loggedUser.status === "inactive"}
                    onClick={() => {
                      navigate("/dashboard/libraries", { state: params.row });
                    }}
                  >
                    Edit
                  </button>
                  <div
                    className={`${style.deleteBtn} ${
                      loggedUser.status === "inactive" && style.disabledBtn
                    }`}
                    onClick={() => handleDelete(params.row)}
                  >
                    Delete
                  </div>
                </div>
              );
            },
          },
        ]}
        rows={libraries.map((item) => {
          return {
            id: item.id,
            name: item.name,
            Books: item.Books.length,
            status: item.status,
          };
        })}
      ></DataGrid>
      {isAdding && (
        <div className={style.addLibraryContainer}>
          <label htmlFor="libraryName">Library Name</label>
          <input
            type="text"
            id="libraryName"
            className={style.libraryInput}
            value={newLibrary}
            onChange={(e) => setNewLibrary(e.target.value)}
          />
          <button
            className={style.addLibraryBtn}
            onClick={() => addLibrary()}
            disabled={isDisabled}
          >
            {" "}
            Submit{" "}
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminLibraries;
