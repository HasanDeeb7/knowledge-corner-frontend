import React from 'react'
import TextField from '@mui/material/TextField';
import style from "./profile.module.css";
import { useParams, useLocation,Link } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useContext } from 'react';
import { userContext } from "../../App";
// import PersonIcon from '@mui/icons-material/Person';
import PersonIcon from '../../assets/icons/user.png'
export const Profile = () => {
  const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const [editLoading, setEditLoading] = useState(false)

    const fetchUser=async()=>{

        try{
          const res=await axios.get(`${process.env.REACT_APP_PATH}api/user/getUser/5`)
          if(res){
            setUser(res.data)
            console.log(res.data)
            setLoading(false)
          }
          else{
                      console.log('Errorr no response')

            setLoading(false)

          }
    
        }
        catch(err){
          console.log("Error fetching the recents users"+err.message)
          setLoading(false)
    
        }
      }


      const updateProfile = async () => {
        console.log("updatingg...")
        setEditLoading(true)
        const email = document.querySelector('#email').value.trim()
        const password = document.querySelector('#password').value.trim()
        console.log(document.querySelector('#password').value)
        const firstName = document.querySelector('#firstName').value.trim()
        const lastName = document.querySelector('#lastName').value.trim()

        const requestedData = {
          email: email,
          firstName:firstName,
          lastName:lastName,
          id:5
        }
    
        if (password !== '') {
          requestedData.password = password
        }
        
        console.log(requestedData)
        
        try {
          const res = await axios.put(`${process.env.REACT_APP_PATH}api/user/update`, requestedData)
          if (res) {
            console.log('profile updated!!')
            setEditLoading(false)
    
          }
    
        } catch (error) {
          console.log("Error updating Profile:", error);
          setEditLoading(false)
    
        }
    
      }

      useEffect(() => {
        fetchUser();
      }, []);


  return (
    <>
       <Helmet>
        <meta charSet="utf-8" />
        <title>Profile</title>
        <meta name="description" content="Profile" />
        <link rel="icon" href={PersonIcon} />
      </Helmet>
    <div className={style.fromContainer} style={{marginTop:'150px'}}>
      {!loading&&(
        <form className={style.bookform} id="bookForm" >

<h1 className={style.title}>My Profile</h1>
<div className={style.inputContainer}>
  <label className={style.label}>First Name</label>
  <input
    className={style.input}
    type="text"
    placeholder="Enter Your First Name"
    name="title"
    id="firstName"
    defaultValue={user.firstName? user.firstName:""}
    required
  />
</div>
<div className={style.inputContainer}>
  <label className={style.label}>Last Name</label>
  <input
    className={style.input}
    type="text"
    placeholder="Enter  Your Last Name"
    name="lastName"
    id="lastName"
    defaultValue={ user.lastName?user.lastName : ""}
    required
  />
</div>
<div className={style.inputContainer}>
  <label>Email</label>
  <input
    className={style.input}
    type="email"
    placeholder="Enter Your Email"
    name="email"
    id="email"
    defaultValue={ user.email? user.email : ""}
    required
  />
</div>
<div className={style.inputContainer}>
  <label className={style.label}>Password</label>
  <input
    className={style.input}
    type="password"
    placeholder="Enter Your Password"
    name="password"
    id="password"
  />
</div>
<div className={style.buttonContainer}>
  <button className={style.add} onClick={updateProfile} style={{opacity:editLoading?0.8:1,pointer:"none"}}>
    Update My Profile
  </button>
</div>
</form>
      )}
      
    </div>
    </>

  )
}
