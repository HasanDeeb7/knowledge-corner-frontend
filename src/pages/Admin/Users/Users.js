import { DataGrid } from "@mui/x-data-grid";
import style from "./Users.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  async function getUsers() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PATH}api/user/getAll`
      );
      if (response) {
        setUsers(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function changeStatus(data) {
    try {
      const status = data.status;
      const updatedStatus = status === "active" ? "inactive" : "active";
      const response = await axios.patch(
        `${process.env.REACT_APP_PATH}api/user/status`,
        { id: data.id, status: updatedStatus }
      );
      if (response) {
        console.log(response);
        getUsers();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    !isLoading && (
      <section className={style.allUsersContainer}>
        <DataGrid
          columns={[
            { field: "id", headerName: "ID", width: 100 },
            { field: "name", headerName: "Name", width: 300 },
            { field: "role", headerName: "Role", width: 300 },
            { field: "status", headerName: "Status", width: 300 },
            {
              field: "actions",
              width: 300,
              renderCell: (params) => {
                return (
                  <div
                    className={style.changeStatusBtn}
                    onClick={() => changeStatus(params.row)}
                  >
                    {params.row.status === "active" ? "Deactivate" : "Activate"}
                  </div>
                );
              },
            },
          ]}
          rows={users.map((item) => {
            return {
              id: item.id,
              name: `${item.firstName} ${item.lastName}`,
              role: item.role,
              status: item.status,
            };
          })}
          //   rows={users}
        ></DataGrid>
      </section>
    )
  );
}

export default Users;
