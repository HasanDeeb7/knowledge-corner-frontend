import React from 'react'
import AdminNavbar from '../pages/Admin/AdminNavbar/adminNavbar';

import { Outlet } from "react-router-dom";

function AdminOutlet({handleClick}) {
    
    return (
        <div style={{border:'1px solid red',marginTop:'80px',marginLeft:'66px'}}>
            <Outlet />
        </div>
    )
}

export default AdminOutlet