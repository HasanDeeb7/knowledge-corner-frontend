import { Route , Routes,Navigate, useNavigate } from "react-router";

import React, { useContext } from 'react'
import { userContext } from "../App";

 const ProtectedRoutes = ({children,roles}) => {
    const {user} =useContext(userContext)
    console.log(user.role+"   ldkdoekwe;k;eke;e")
 
   return  (
    !user || !roles.include(user.role)? children:<Navigate to='/notAuth'/>
    )

  
}



export default ProtectedRoutes