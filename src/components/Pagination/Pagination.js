import style from "./Pagination.module.css";

function Pagination({ books, setPagination, pagination }) {
  const limits = pagination.pageSize;
  function getTotal() {
    return Math.ceil(books.length / limits);
  }

  function generatePageNumbers() {
    const totalPages = getTotal();
    const currentPage = pagination.pageNumber;
    const pageNumbers = [];

    for (let i = 1; i <= Math.min(totalPages, limits); i++) {
      pageNumbers.push(i);
    }

    if (totalPages > limits) {
      pageNumbers.push("...");

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  }

  return (
    <div className={style.paginationContainer}>
      {generatePageNumbers().map((item, idx) => {
        return item !== "..." ? (
          <li
            className={style.paginationElement}
            value={item}
            key={idx}
            onClick={(e) =>
              setPagination({ ...pagination, pageNumber: e.target.value })
            }
          >
            {item}
          </li>
        ) : (
          item
        );
      })}
    </div>
  );
}

export default Pagination;
