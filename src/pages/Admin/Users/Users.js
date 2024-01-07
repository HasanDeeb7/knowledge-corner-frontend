import { DataGrid } from "@mui/x-data-grid";
import style from "./Users.module.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import Modal from "@mui/material/Modal";
// import style from "./Users.module.css";
import { Helmet } from "react-helmet";
import PersonIcon from "@mui/icons-material/Person";
import userIcon from "../../../assets/icons/user.png";
import { userContext } from "../../../App";
import { toast } from "react-toastify";
function Users({ loggedUser }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [user, setuser] = useState([]);
  const [role, setRole] = useState();

  const handleOpen = (data) => {
    setuser(data);
    if (user) {
      setOpen(true);
    }
  };

  const handleRole = (e) => {
    setRole(e.target.value);
  };

  const updateRole = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_PATH}api/user/update`,
        { id: user.id, role: role }
      );
      if (response) {
        handleClose();
        console.log("updated");
      } else {
        console.log("Error updating user role");
      }
    } catch (err) {
      console.log("Error updating user role");
    }
  };

  const handleClose = () => setOpen(false);
  async function getUsers() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PATH}api/user/getAll`
      );
      if (response) {
        console.log(response);
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

  async function deleteUser(id) {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_PATH}api/user/delete`,
        { params: { id: id } }
      );
      if (response) {
        console.log(response);
        getUsers();
      }
    } catch (error) {
      console.log(error);
    }
  }
  const styles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    !isLoading && (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Admin-Users</title>
          <meta name="description" content="all Users" />
          <link rel="icon" href={userIcon} />
        </Helmet>
        <section className={style.allUsersContainer}>
          <DataGrid
            columns={[
              { field: "id", headerName: "ID", width: 100 },
              { field: "name", headerName: "Name", width: 300 },
              { field: "role", headerName: "Role", width: 300 },
              { field: "status", headerName: "Status", width: 250 },
              {
                field: "actions",
                width: 350,
                renderCell: (params) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "7px",
                      }}
                    >
                      <button
                        className={`${style.changeStatusBtn} ${
                          loggedUser.status === "inactive" && style.disabledBtn
                        }`}
                        onClick={() => changeStatus(params.row)}
                        disabled={loggedUser.status === "inactive"}
                      >
                        {params.row.status === "active"
                          ? "Deactivate"
                          : "Activate"}
                      </button>
                      <button
                        className={`${style.changeStatusBtn} ${
                          loggedUser.status === "inactive" && style.disabledBtn
                        }`}
                        disabled={loggedUser.status === "inactive"}
                        onClick={() => handleOpen(params.row)}
                      >
                        update role
                      </button>
                      <div
                        className={`${style.changeStatusBtn} ${
                          loggedUser.status === "inactive" && style.disabledBtn
                        }`}
                        style={{ background: "darkred" }}
                        onClick={() => deleteUser(params.row.id)}
                      >
                        Delete
                      </div>
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
          ></DataGrid>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                border: "2px solid balck",
              }}
              // sx={style}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit User
              </Typography>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "100%" },
                  backgroundColor: "white",
                  width: "500px",
                  padding: "20px 20px  20px 20px ",
                  border: "1px solid black",
                }}
                noValidate
                autoComplete="off"
              >
                <form
                  className={style.formCategory}
                  sx={{ marginTop: "-60px !important " }}
                >
                  <label for="category">Update User Role</label>
                  <input
                    type="text"
                    placeholder="User Name"
                    value={user.name}
                    // onChange={handleCategoryNameChange}
                    required
                    readOnly
                  />

                  <select
                    type="text"
                    placeholder="Roles"
                    defaultValue={user.role}
                    onChange={handleRole}
                    required
                  >
                    <option value="user">User</option>
                    <option value="admin">admin</option>

                    <option value="manager">manager</option>
                    <option value="superAdmin">superAdmin</option>
                  </select>

                  <button className={style.cancelButton} onClick={handleClose}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={style.addButton}
                    onClick={updateRole}
                  >
                    Update
                  </button>
                </form>
              </Box>
            </Box>
          </Modal>
        </section>
      </>
    )
  );
}

export default Users;
