import React from "react";
import { Route, Routes } from "react-router-dom";
import AllAuthors from "../components/AllAuthors/AllAuthors";
import AllBooks from "../components/AllBooks/AllBooks";
import SingleBook from "../pages/SingleBook/SingleBook";
import Landing from "../pages/Landing/Landing";
import Dashboard from "../pages/Admin/dashboard";
import UserOutlet from "../Outlet/userOutlet";
import NotFound from "../components/NotFound/WebsiteNotFound";
import AboutUs from "../pages/AboutUs/AboutUs";
import SingleAuther from "../pages/SingleAuther/SingleAuther";
import Login from "../pages/Login/Login";
import { Libraries } from '../pages/Libraries/Libraries';
import NotAuthorised from '../components/NotFound/notauthorised.js'
import ProtectedRoutes from './protectedRoutes.js'
import SideBar from "../components/SideBar/SideBar";
import AdminBarchart from '../components/Charts/AdminBarchart.js'
import BasicColor from "../components/Charts/BookCurve";
import Users from "../pages/Admin/Users/Users.js";
function AppRoutes() {
  return (
    <Routes>

      <Route exact path="/" element={<UserOutlet />}>
        <Route exact path="/" element={<Landing />}> </Route>
        <Route path="/AllBooks" element={<AllBooks />}></Route>
        <Route path="/AllAuthors" element={<AllAuthors />}></Route>
        <Route path="/SingleBook/:slug" element={<SingleBook />}></Route>
        <Route path='/AboutUs' element={<AboutUs />}></Route>
        <Route path='/SingleAuthor/:slug' element={<SingleAuther />}></Route>
        <Route path='/Libraries' element={<Libraries />}></Route>
        <Route path='/chart' element={<BasicColor />}></Route>
        
      </Route>
      <Route path="/login" element={<Login />}></Route>
      <Route
        path="/dashboard/*"
        element={
            <Dashboard />
        }
      ></Route>
      <Route path="/*" element={<NotFound />}></Route>
      <Route path='/notAuth' element={<NotAuthorised />}></Route>
    </Routes>
  );
}

export default AppRoutes;