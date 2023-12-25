import React from "react";
import adminNavbarStyle from "./adminNavbar.module.css";
import books from "../../../assets/icons/download 1.svg";
import authors from "../../../assets/icons/4649486-200 1.svg";
import categories from "../../../assets/icons/Category.svg";
import libraries from '../../../assets/icons/books-stack-of-three 2.svg'
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Libraries } from "../../Libraries/Libraries";


 function AdminNavbar({ handleClick }) {
  const location=useLocation()
  const currentLocation=location.pathname
  let locationTitle=currentLocation.slice(16)
  if(locationTitle===""){ locationTitle="All Books"}
  else{
    locationTitle=locationTitle.slice(0,3)+" "+locationTitle.slice(3).split('/')[0]
  }
  return (
  
    <div className={adminNavbarStyle.navbarComponent}>
      <h1 className={adminNavbarStyle.dashboardtitle}>
        Dashboard - {locationTitle}
        </h1>
      <div className={adminNavbarStyle.outerDiv}>
        {/* <div onClick={handleClick}> */}
          <Link
            to={"/dashboard/adminAllBooks"} 
            className={`${adminNavbarStyle.innerDiv} ${currentLocation==="/dashboard"|| currentLocation==="/dashboard/adminAllBooks"?adminNavbarStyle.innerDivActive:null} `}
          >
            <img src={books} alt="books" />
            <p className={adminNavbarStyle.threeButton}>Books</p>
          </Link>
        {/* </div> */}
{/* /****************************************** */ }
        <Link
            to={"/dashboard/adminAllLibraries"} 
            className={`${adminNavbarStyle.innerDiv} ${currentLocation==="/dashboard/adminAllLibraries"?adminNavbarStyle.innerDivActive:null} `}
          >
            <img src={libraries} alt="libraries" />
            <p className={adminNavbarStyle.threeButton}>Libraries</p>
          </Link>
 {/* /************************************* */ }


        <Link
          to={"/dashboard/adminAllAuthors"} 
          className={`${adminNavbarStyle.innerDiv} ${currentLocation==="/dashboard/adminAllAuthors"?adminNavbarStyle.innerDivActive:null}`}
          >
          <img src={authors} alt="authors" />
          <p className={adminNavbarStyle.threeButton}>Authors</p>
        </Link>

        <Link
          to={"/dashboard/adminAllCategories"} 
          className={`${adminNavbarStyle.innerDiv} ${currentLocation==="/dashboard/adminAllCategories"?adminNavbarStyle.innerDivActive:null}`}
        >
          <img src={categories} alt="categories" />
          <p className={adminNavbarStyle.threeButton}>Categories</p>
        </Link>
      </div>

      <div className={adminNavbarStyle.addContainer}>
        
        <Link
          to={"/dashboard/adminAddBook/Add"}
          className={adminNavbarStyle.addMVC}
        >
          <button className={adminNavbarStyle.addButton}>Add Book</button>
        </Link>

        <Link
          to={"/dashboard/adminAddLibrary/Add"}
          className={adminNavbarStyle.addMVC}
        >
          <button className={adminNavbarStyle.addButton}>Add Library</button>
        </Link>

        <Link
          to={"/dashboard/adminAddAuthor/Add"}
          className={adminNavbarStyle.addMVC}
        >
          <button className={adminNavbarStyle.addButton}>Add Author</button>
        </Link>

        <Link
          to={"/dashboard/adminAddCategory/Add"}
          className={adminNavbarStyle.addMVC}
        >
          <button className={adminNavbarStyle.addButton}>Add Category</button>
        </Link>
      </div>
    </div>
  );
}

export default AdminNavbar;
