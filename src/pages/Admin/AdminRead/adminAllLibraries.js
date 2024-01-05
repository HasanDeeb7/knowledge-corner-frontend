import React from "react";
import adminAllBooksStyle from "./adminAllBooks.module.css";
import x from "../../../assets/icons/862px-Delete-button 1.svg";
import update from "../../../assets/icons/Vector (4).svg";
import { Link } from "react-router-dom";
import DataGridPremiumDemo from '../../../components/AllbooksTable/Allbooks.js'

import authorIcon from '../../../assets/icons/author.png'
import library from '../../../assets/icons/library.png'
import { Helmet } from "react-helmet";

function adminAllLibraries({ libraries}) {
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = date.toISOString().split("T")[0];

    return formattedDate;
  }

  return (
    <div className={adminAllBooksStyle.allBooks}>
        <Helmet>
        <meta charSet="utf-8" />
        <title>Admin-Libraries</title>
        <meta name="description" content="Admin Dashboard Libraries" />
        <link rel="icon"  href={library} sizes="16x16" />
      </Helmet>
      <div className={adminAllBooksStyle.overflow}>
      <DataGridPremiumDemo libraries={libraries}  type={"library"}/>

      </div>
    </div>
  );
}

export default adminAllLibraries;
