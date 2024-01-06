import React from 'react'
import AdminNavbar from '../pages/Admin/AdminNavbar/adminNavbar';

import { Outlet } from "react-router-dom";

function AdminOutlet({handleClick}) {
    
    return (
        <div style={{border:'1px solid red',marginTop:'65px',marginLeft:'240px'}}>
            <Outlet />
        </div>
    )
}

export default AdminOutlet