import React from 'react'
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";

import { Outlet } from "react-router-dom";

function Container() {
    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer/>
        </div>
    )
}

export default Container
