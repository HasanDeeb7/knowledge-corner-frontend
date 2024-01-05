import { DataGrid } from "@mui/x-data-grid";
import style from "./AdminLibraries.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function AdminLibraries() {
  const [libraries, setLibraries] = useState([]);
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
      <DataGrid
        columns={[
          { field: "id", headerName: "ID", width: 100 },
          { field: "name", headerName: "Name", width: 300 },
          { field: "Books", headerName: "Number of Books", width: 300 },
          { field: "status", headerName: "Status", width: 300 },
          {
            field: "actions",
            width: 300,
            renderCell: (params) => {
              return (
                <div className={style.buttonsContainer}>
                  <div
                    className={style.changeStatusBtn}
                    onClick={() => changeStatus(params.row)}
                  >
                    {params.row.status === "active" ? "Deactivate" : "Activate"}
                  </div>
                  <div
                    className={`${style.changeStatusBtn} ${
                      params.row.status === "inactive" && style.disabledBtn
                    }`}
                    onClick={() => {
                      navigate("/dashboard/libraries", { state: params.row });
                    }}
                  >
                    Edit
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
    </div>
  );
}

export default AdminLibraries;
