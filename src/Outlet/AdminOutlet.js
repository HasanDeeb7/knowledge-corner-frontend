import React from 'react'
import AdminNavbar from '../pages/Admin/AdminNavbar/adminNavbar';

import { Outlet } from "react-router-dom";

function AdminOutlet({handleClick}) {
    
    return (
        <div style={{height:'80vh',marginTop:'65px',marginLeft:'240px',padding:'30px'}}>
            <Outlet />
        </div>
    )
}

export default AdminOutlet