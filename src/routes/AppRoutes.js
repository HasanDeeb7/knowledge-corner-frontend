import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AllAuthors from "../components/AllAuthors/AllAuthors";
import AllBooks from "../components/AllBooks/AllBooks";
import SingleBook from "../pages/SingleBook/SingleBook";
import Landing from "../pages/Landing/Landing";
import UserOutlet from "../Outlet/userOutlet";
import NotFound from "../components/NotFound/WebsiteNotFound";
import AboutUs from "../pages/AboutUs/AboutUs";
import SingleAuther from "../pages/SingleAuther/SingleAuther";
import Login from "../pages/Login/Login";

import { Libraries } from "../pages/Libraries/Libraries";
import NotAuthorised from "../components/NotFound/notauthorised.js";
import SideBar from "../components/SideBar/SideBar";
import { userContext } from "../App.js";
import Dashboard from "../pages/Admin/dashboard.js";
import ProtectedRoute from "./ProtectedRoute.js";

function AppRoutes() {
  const { user } = useContext(userContext);
  console.log(user);
  return (
    <Routes>
      <Route exact path="/" element={<UserOutlet />}>
        <Route exact path="/" element={<Landing />}>
          {" "}
        </Route>
        <Route path="/Libraries" element={<Libraries />}></Route>
        <Route path="/side" element={<SideBar />}></Route>

        <Route path="/AllBooks" element={<AllBooks />}></Route>
        <Route path="/AllAuthors" element={<AllAuthors />}></Route>

        <Route path="/SingleBook/:slug" element={<SingleBook />}></Route>
        <Route path="/AboutUs" element={<AboutUs />}></Route>
        <Route path="/SingleAuthor/:slug" element={<SingleAuther />}></Route>
        <Route path="/Libraries" element={<Libraries />}></Route>
      </Route>
      <Route path="/login" element={<Login />}></Route>
      {user && (
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute isAllowed={user}>
              <Dashboard user={user} /> 
            </ProtectedRoute>
          }
        ></Route>
      )}
      <Route path="/*" element={<NotFound />}></Route>
      <Route path="/notAuth" element={<NotAuthorised />}></Route>
    </Routes>
  );
}

export default AppRoutes;
