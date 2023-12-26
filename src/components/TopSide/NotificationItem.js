import React from 'react'
import { Typography, Box,Avatar } from '@mui/material'
import Remove from '@mui/icons-material/Remove'
// import merchant from '../../Assets/Images/maker-mkr-logo.png'
import merchant from '../../assets/images/book1.jpg'

const NotificationItem = ({ notification: { title, message, createdAt } }) => {
  return (
    <Box sx={{ display: 'flex',justifyContent:'space-between',alignItems:'center', paddingTop: 3, paddingBottom:1,px: 3}}>
      <Avatar width={40} height={40 } src={merchant} sx={{borderRadius:5}}>M</Avatar>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: 250 ,marginX:2}}>
        <Typography variant="subtitle2"  >{title}</Typography>
        <Typography variant="body2" color='gray'>{message}</Typography>
      </Box>
 
        <Remove sx={{color: 'red',backgroundColor:'#CACED8',borderRadius:5}} onClick />
    </Box>
  )
}

export default NotificationItem