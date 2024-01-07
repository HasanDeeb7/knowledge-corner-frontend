import style from "./AddEditBookForm.module.css";
import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Helmet } from "react-helmet";
import bookIcon from "../../assets/icons/open-book.png";
import { useNavigate } from "react-router-dom";

function AddEditBookForm({handleClick}) {
  const handleSuccessAlert = () => {
    const message = type === "Add" ? "The book is added" : "The book is edited";
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  const handleErrorAlert = (errorMessage) => {
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  const showWaitingToast = () => {
    toast("Please wait...", {
      position: "top-right",
      autoClose: 100,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      className: "custom-waiting-toast",
    });
  };
  const [optionCategory, setOptionCategory] = useState(null);
  const [authors, setAuthors] = useState([]);
  const location = useLocation();
  const { type } = useParams();
  const book = location.state && location.state.book;
  const [bookData, setBookData] = useState({
    title: "",
    nbPages: 0,
    publicationDate: "",
    ISBN: "",
    description: "",
    rating: 0,
    authorId: "",
    categoryName: "",
    language: "",
    image: "",
  });

  const[editedBook,setEditedBook]=useState({
    title: book?.title,
    nbPages: book?.nbPages,
    publicationDate: book?.publicationDate,
    ISBN: book?.ISBN,
    description: book?.description,
    rating: book?.rating,
    authorId: book?.authorId,
    categoryName: book?.categoryName,
    language: book?.language,
    image: book?.image,
  })
 
  
  const resetForm = () => {
    const form = document.getElementById("bookForm");
    form.reset();
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = date.toISOString().split("T")[0];

    return formattedDate;
  }
  function handleChange(e) {
    if(type==="Add"){
      setBookData({
        ...bookData,
        [e.target.name]: e.target.value,
      });
    }
    if(type==="Edit"){
      setEditedBook({
        ...editedBook,
        [e.target.name]: e.target.value,
      });
    }
   
  }


  const addBook = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const imageInput = e.target.querySelector("#imageInput");
    if (imageInput.files.length <= 0) {
      // Remove the "image" field if no file is selected
      formData.delete("image");
    }

    if (type === "Add") {
      showWaitingToast();
      axios
        .post(`${process.env.REACT_APP_PATH}api/books/add`, formData)
        .then(() => {
          handleSuccessAlert();
          handleClick()
          resetForm();
        })
        .catch((error) => {
          console.error("Error while making the request:", error);
          handleErrorAlert(error.response.data.error);
        });
    } else if (type === "Edit") {
      showWaitingToast();
      axios
        .patch(`${process.env.REACT_APP_PATH}api/books/update`, {
          ...editedBook,
          id: book.id,
        })
        .then((res) => {
          console.log(formData);
          console.log(bookData);
          handleSuccessAlert();
          navigate(-1)
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
          handleErrorAlert(error.response.data.error);
        });
    }
  };

  async function fetchAuthorData() {
    await axios
      .get(`${process.env.REACT_APP_PATH}api/authors`)
      .then((response) => {
        setAuthors(response.data);
        console.log(response.data);
      })
      .catch(() => {
        handleErrorAlert("Error while getting authors data");
      });
  }

  async function fetchCategoryData() {
   await axios
      .get(`${process.env.REACT_APP_PATH}api/categories`)
      .then((response) => {
        setOptionCategory(response.data);
      })
      .catch(() => {
        handleErrorAlert("Error while getting categories data");
      });
  }
  useEffect(() => {
    fetchAuthorData();
    fetchCategoryData();
  }, []);

  const navigate=useNavigate()

  const Back=()=>{
    navigate(-1)
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{type + " Book"}</title>
        <meta name="description" content="Admin Manage Books" />
        <link rel="icon" href={bookIcon} sizes="16x16" />
      </Helmet>

      <ToastContainer />
      <div className={style.fromContainer}>
        <form className={style.bookform} id="bookForm" onSubmit={addBook}>
          <h1 className={style.title}>
            {type === "Add" ? "Launch Book" : "Edit Book"}
          </h1>
          <div className={style.inputContainer}>
            <label className={style.label}>Title</label>
            <input
              className={style.input}
              type="text"
              placeholder="Enter Title"
              name="title"
              defaultValue={type === "Edit" ? book.title : ""}
              required
              onChange={handleChange}
            />
          </div>
          <div className={style.inputContainer}>
            <label>Pages</label>
            <input
              className={style.input}
              type="number"
              placeholder="Enter the pages"
              name="nbPages"
              defaultValue={type === "Edit" ? book.nbPages : ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.inputContainer}>
            <label className={style.label}>Publication's date</label>
            <input
              className={style.input}
              type="date"
              placeholder="Enter the date"
              name="publicationDate"
              defaultValue={
                type === "Edit" ? formatDate(book.publicationDate) : ""
              }
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.inputContainer}>
            <label className={style.label}>ISBN</label>
            <input
              className={style.input}
              type="string"
              placeholder="Enter the ISBN"
              name="ISBN"
              defaultValue={type === "Edit" ? book.ISBN : ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.inputContainer}>
            <label className={style.label}>Description</label>
            <input
              className={style.input}
              type="text"
              placeholder="Enter the description"
              name="description"
              defaultValue={type === "Edit" ? book.description : ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.inputContainer}>
            <label className={style.label}>rating</label>
            <input
              className={style.input}
              type="number"
              placeholder="Enter the rating"
              name="rating"
              defaultValue={type === "Edit" ? book.rating : ""}
              max={5}
              min={1}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.inputContainer}>
            <label className={style.label}>Select an Author:</label>
            <select
              name="authorId"
              defaultValue={type === "Edit" ? book.authorId: ""}
              required
              onChange={handleChange}

            >
              {authors &&
                authors.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.firstName} {option.lastName}
                  </option>
                ))}
            </select>
          </div>
          <div className={style.inputContainer}>
            <label className={style.label}>Select a Category:</label>
            <select
              name="categoryName"
              defaultValue={type === "Edit" ? book.CategoryId : ""}
              onChange={handleChange}
              required
            >
              {optionCategory &&
                optionCategory.map((option) => (
                  <option key={option.id} value={option.Name}>
                    {option.Name}
                  </option>
                ))}
            </select>
          </div>
          <div className={style.inputContainer}>
            <label className={style.label}>Language</label>
            <select
              name="language"
              defaultValue={type === "Edit" ? book.language : ""}
              onChange={handleChange}
              required
            >
              <option>English</option>
              <option>French</option>
              <option>Arabic</option>
            </select>
          </div>
          <div className={style.inputContainer}>
            <label className={style.label}>Enter an image</label>
            <input
              className={style.input}
              type="file"
              name="image"
              id="imageInput"
              onChange={handleChange}
              required={type === "Add"}
            />
          </div>
          <div className={style.buttonContainer}>
            <Link to={"/dashboard"}>
              <button className={style.cancel} onClick={Back}>Cancel</button>
            </Link>
            <button className={style.add}>
              {type === "Add" ? "Add" : "Edit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default AddEditBookForm;
