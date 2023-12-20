import React from "react";
import adminAllBooksStyle from "./adminAllBooks.module.css";
import x from "../../../assets/icons/862px-Delete-button 1.svg";
import update from "../../../assets/icons/Vector (4).svg";

function adminAllCategories({ categories ,handleDeleteCategory}) {
  return (
    <div className={adminAllBooksStyle.allBooks}>
      <div className={adminAllBooksStyle.overflow}>
      <table>
        <thead>
          <tr>
            <th>S.N</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{category.name}</td>
              <td className={adminAllBooksStyle.buttonContainer}>
                <button className={adminAllBooksStyle.updateDelete} >
                  <img src={update} alt="update" />
                </button>
                <button className={adminAllBooksStyle.updateDelete} 
                  onClick={() => {
                        handleDeleteCategory(category._id);
                      }}>
                  <img src={x} alt="delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default adminAllCategories;
