import React from 'react'
import AdminNavbar from '../pages/Admin/AdminNavbar/adminNavbar';

import { Outlet } from "react-router-dom";

function AdminOutlet({handleClick}) {
    
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default AdminOutlet