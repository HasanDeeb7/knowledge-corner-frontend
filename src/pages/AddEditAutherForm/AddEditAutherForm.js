import style from "./AddEditAuthor.module.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link,useParams,useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import authorIcon from '../../assets/icons/author.png'

function AddEditAutherForm({handleClick}) {
  const { type } = useParams();
  const location = useLocation();
  const author = location.state && location.state.author;
  const resetForm = () => {
    const form = document.getElementById("AuthorForm");
    form.reset();
  };

  const handleSuccessAlert = () => {
    const message =
      type === "Add" ? "The author is added" : "The author is edited";
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

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = date.toISOString().split("T")[0];

    return formattedDate;
  }

  const AddEditAuther = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newFormData = new FormData();
    const imageInput = e.target.querySelector("#imageInput");
    if (imageInput.files.length <= 0) {
      // Remove the "image" field if no file is selected
      formData.delete("image");
    }
    for (const pair of formData.entries()) {
      const [key, value] = pair;
      if (value !== "") {
        newFormData.append(key, value);
      }
    }
    if (type === "Add") {
      showWaitingToast();
      axios
        .post(`${process.env.REACT_APP_PATH}api/authors`, newFormData)
        .then(() => {
          handleSuccessAlert();
          resetForm();
        })
        .catch((error) => {
          handleErrorAlert(error.response.data.error);
        });
    } else if (type === "Edit") {
      showWaitingToast();
      axios
        .patch(`${process.env.REACT_APP_PATH}api/authors/${author.id}`, newFormData)
        .then(() => {
          handleSuccessAlert();
          handleClick()
          navigate(`/dashboard/adminAllAuthors`)
        })
        .catch((error) => {
          handleErrorAlert(error.response.data.error);
        });
    }
  };


  const navigate=useNavigate()

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{type+" Author"}</title>
        <meta name="description" content="Admin dashboard manage authors" />
        <link rel="icon"  href={authorIcon} sizes="16x16" />
      </Helmet>
      <ToastContainer />
      <div className={style.fromContainer}>
        <form
          className={style.authorForm}
          id="AuthorForm"
          onSubmit={AddEditAuther}
        >
          <h1 className={style.title}>
            {type === "Add" ? "Add an author" : "Edit an author"}
          </h1>
          <div className={style.inputContainer}>
            <label className={style.label}>First Name</label>
            <input
              className={style.input}
              type="text"
              required
              placeholder="Enter First Name"
              name="firstName"
              defaultValue={type === "Edit" ? author.firstName : ""}
            />
          </div>
          <div className={style.inputContainer}>
            <label className={style.label}>Last Name</label>
            <input
              className={style.input}
              type="text"
              required
              placeholder="Enter Last Name"
              name="lastName"
              defaultValue={type === "Edit" ? author.lastName : ""}
            />
          </div>
          <div className={style.inputContainer}>
            <label className={style.label}>DOB</label>
            <input
              className={style.input}
              type="date"

              defaultValue={type === "Edit" && author.dob ? formatDate(author.dob) : ""}
              placeholder="Enter the date of birth"
              name="dob"
            />
          </div>
          <div className={style.inputContainer}>
            <label className={style.label}>nationality</label>
            <input
              className={style.input}
              type="text"
              placeholder="Enter the nationality"
              name="nationality"
              defaultValue={type === "Edit" ? author.nationality : ""}
            />
          </div>
          <div className={style.inputContainer}>
            <label className={style.label} required>
              biography
            </label>
            <input
              className={style.input}
              type="text"
              placeholder="Enter the biography"
              name="biography"
              defaultValue={type === "Edit" ? author.biography : ""}
            />
          </div>
          <div className={style.inputContainer}>
            <label className={style.label}>LinkedIn Link</label>
            <input
              className={style.input}
              type="text"
              placeholder="Enter LinkedIn Link"
              name="linkedinLink"
              defaultValue={type === "Edit" ? author.linkedinLink : ""}
            />
          </div>
          <div className={style.inputContainer}>
            <label className={style.label}>Blog Link</label>
            <input
              className={style.input}
              type="text"
              placeholder="Enter Blog Link"
              name="blogLink"
              defaultValue={type === "Edit" ? author.blogLink : ""}
            />
          </div>
          <div className={style.inputContainer}>
            <label className={style.label}>twitter Link</label>
            <input
              className={style.input}
              type="text"
              placeholder="Enter twitter Link"
              name="twitterLink"
              defaultValue={type === "Edit" ? author.twitterLink : ""}
            />
          </div>
          <div className={style.inputContainer}>
            <label className={style.label}>Enter an image of the Author</label>
            <input
              className={style.input}
              type="file"
              name="image"
              id="imageInput"
            />
          </div>
          <div className={style.inputContainer}>
            <label className={style.label}>rating</label>
            <input
              className={style.input}
              type="number"
              max={5}
              min={0}
              placeholder="Enter the rating"
              name="rating"
              defaultValue={type === "Edit" ? author.rating : ""}
            />
          </div>
          <div className={style.buttonContainer}>
          <Link to={'/dashboard/adminAllAuthors'}><button className={style.cancel}  >Cancel</button></Link>
            <button className={style.add}>
              {type === "Add" ? "Add" : "Edit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default AddEditAutherForm;
