// import { useCallback } from 'react';
// import { useRouter } from 'next/navigation';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
// import useApi from "../../hooks/useApi";
import { userContext } from '../../App.js';

import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useContext } from 'react';
export const AccountPopover = (props) => {
  const {user, setUser} = useContext(userContext)
  const { anchorEl, onClose, open } = props;
//   const { apiCall } = useApi();
  const navigate = useNavigate();
// const handlelogOut = async () =>{
//   try {
//      await apiCall({
//      url: "/api/users/logout",
//      method: "post",
//    });
//    setUser(null)
//    toast.success("Logged out Successfully!")
//    navigate('/')

//  } catch (error) {
//    console.log(error);


//  }
// }

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Account
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {user?.userName}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem sx={{
          color:"red",
        }} 
        // onClick={handlelogOut}
        >
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};