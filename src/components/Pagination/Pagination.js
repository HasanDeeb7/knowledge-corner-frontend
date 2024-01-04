import style from "./Pagination.module.css";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import { useState } from "react";

function Pagination({ books, setPagination, pagination }) {
  const limits = pagination.pageSize;
  const [error, setError] = useState();
  function getTotal() {
    return Math.ceil(books.length / limits);
  }
  // const handleChange = (event) => {
  //   setMessage(event.target.value);
  // };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (event.target.value <= getTotal()) {
        setPagination({ ...pagination, pageNumber: event.target.value });
      } else {
        setError(`Last Page is ${getTotal()}`);
      }
    }
  };

  return (
    <div className={style.paginationContainer}>
      <div className={style.paginationControlContainer}>
        <li
          className={`${style.paginationElement} ${
            pagination.pageNumber <= 1 && style.disabledPaginationArrow
          }`}
        >
          <ChevronLeftRoundedIcon
            className={`${style.paginaitonArrow} ${
              pagination.pageNumber <= 1 && style.disabledPaginationArrow
            }`}
            disabled={pagination.pageNumber <= 1}
            onClick={() =>
              setPagination({
                ...pagination,
                pageNumber: pagination.pageNumber - 1,
              })
            }
          />
        </li>
        <li className={style.paginationElement}>{pagination.pageNumber}</li>
        <li
          className={`${style.paginationElement} ${
            pagination.pageNumber >= getTotal() && style.disabledPaginationArrow
          }`}
        >
          <ChevronRightRoundedIcon
            className={style.paginaitonArrow}
            disabled={pagination.pageNumber >= getTotal()}
            onClick={() =>
              setPagination({
                ...pagination,
                pageNumber: pagination.pageNumber + 1,
              })
            }
          />
        </li>
      </div>
      <div className={style.jumpToPageContainer}>
        <label htmlFor="gotoPage">Jump To</label>
        <input
          type="number"
          name="gotoPage"
          id="gotoPage"
          min={0}
          max={getTotal()}
          className={style.jumpToPageInput}
          onKeyDown={handleKeyDown}
        />
        {error && <span className={style.errorSpan}> {error}</span>}
      </div>
    </div>
  );
}

export default Pagination;
