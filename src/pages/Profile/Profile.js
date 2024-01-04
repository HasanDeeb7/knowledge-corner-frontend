import React from 'react'
import TextField from '@mui/material/TextField';
import style from "./profile.module.css";
import { useParams, useLocation,Link } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';

export const Profile = () => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const [editLoading, setEditLoading] = useState(false)

    const fetchUser=async()=>{

        try{
          const res=await axios.get(`${process.env.REACT_APP_PATH}/api/user/getUser/5`)
          if(res){
            setUser(res.data)
            console.log(res.data)
            setLoading(false)
          }
          console.log('Errorr no response')
          setLoading(false)
    
        }
        catch(err){
          console.log("Error fetching the recents users"+err.message)
          setLoading(false)
    
        }
      }


      const updateProfile = async () => {
        console.log("updatingg...")
        setEditLoading(true)
        // const username = document.querySelector('#username').value.trim()
        // const email = document.querySelector('#email').value.trim()
        const password = document.querySelector('#password').value.trim()
        const name = document.querySelector('#name').value.trim()
    
        // console.log(username)
        // console.log(email)
    
        const requestedData = {
          // username: username,
          // email: email,
          name: name
        }
    
        if (password !== '') {
          requestedData.password = password
        }
        
        console.log(requestedData)
        
        try {
        //   const res = await axios.put(`${process.env.REACT_APP_PATH}/user/update/${user.id}`, requestedData)
        //   if (res) {
        //     console.log('profile updated!!')
        //     // await fetchusers()
        //     setEditLoading(false)
    
        //   }
    
        } catch (error) {
          console.error("Error updating Profile:", error);
          setEditLoading(false)
    
        }
    
      }

      useEffect(() => {
        fetchUser();
      }, []);


  return (
    <div className={style.fromContainer}>
      {/* <form className={style.bookform} id="bookForm" onSubmit={addBook}> */}
      <form className={style.bookform} id="bookForm" >

        <h1 className={style.title}>
          {/* {type === "Add" ? "Launch Book" : "Edit Book"} */}
        </h1>
        <div className={style.inputContainer}>
          <label className={style.label}>First Name</label>
          <input
            className={style.input}
            type="text"
            placeholder="Enter Your First Name"
            name="title"
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
            name="title"
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
            
            required
          />
        </div>
        <div className={style.buttonContainer}>
          {/* <Link to={'/dashboard'}><button className={style.cancel}>Cancel</button></Link> */}
          <button className={style.add}>
            Update My Profile
            {/* {type === "Add" ? "Add" : "Edit"} */}
          </button>
        </div>
      </form>
    </div>
  )
}
