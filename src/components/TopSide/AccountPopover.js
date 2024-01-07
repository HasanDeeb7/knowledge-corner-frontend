// import { useCallback } from 'react';
// import { useRouter } from 'next/navigation';
import {
  Box,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
// import useApi from "../../hooks/useApi";
import { userContext } from "../../App.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import axios from "axios";
export const AccountPopover = (props) => {
  const { user, setUser } = useContext(userContext);
  const { anchorEl, onClose, open } = props;
  //   const { apiCall } = useApi();
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PATH}api/logout`
      );
      if (response) {
        console.log(response.data);
        toast.success(response.data);
        setUser(null);
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 150 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
          // border:'1px solid red'
        }}
      >
        <Typography variant="overline">
          <Link to="/dashboard/profile">Profile</Link>
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {user?.userName}
        </Typography>
      </Box>
      <Divider sx={{ width: "100%" }} />
      <MenuList
        disablePadding
        dense
        sx={{
          p: "8px",
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem
          sx={{
            color: "red",
          }}
          onClick={handleLogout}
        >
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};
