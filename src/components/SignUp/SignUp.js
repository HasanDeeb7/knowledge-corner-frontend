import { useState } from "react";
import style from "./SignUp.module.css";
import OAuth from "../../OAuth";
import axios from "axios";
function SignUp({ setLogin }) {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const [message, setMessage] = useState();
  const [emailMessage, setEmailMessage] = useState();

  function handleChange(e) {
    // e.preventDefault()
    setEmailMessage();
    setMessage();
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  }

  const signUp = async () => {
    setEmailMessage();
    if (Object.values(newUser).some((item) => item === "")) {
      return setMessage("All Fields are required");
    } else if (!isValidEmail(newUser.email)) {
      return setEmailMessage("Invalid email address");
    } else if (newUser.password !== confirmPassword) {
      return setMessage("Password confirmed incorrectly");
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_PATH}/api/user/signup`,
        newUser
      );
      if (res) {
        setLogin(true);
      } else {
        console.log(res);
        setMessage(res.data.message);
      }
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.message);
    }
  };

  return (
    <>
      <div className={style.signUpWrapper}>
        <div className={style.inputLabelWrapper}>
          <label>First Name</label>
          <input
            name="firstName"
            value={newUser.firstName}
            className={style.signUpInput}
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className={style.inputLabelWrapper}>
          <label>Last Name</label>
          <input
            name="lastName"
            value={newUser.lastName}
            className={style.signUpInput}
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className={style.inputLabelWrapper}>
          <label>Email</label>
          <input
            name="email"
            value={newUser.email}
            className={style.signUpInput}
            type="text"
            onChange={handleChange}
          />
        </div>
        <div style={{ color: "red", display: emailMessage ? "block" : "none" }}>
          {emailMessage ? emailMessage : ""}
        </div>

        <div className={style.inputLabelWrapper}>
          <label>Password</label>
          <input
            name="password"
            value={newUser.password}
            className={style.signUpInput}
            type="password"
            onChange={handleChange}
          />
        </div>
        <div className={style.inputLabelWrapper}>
          <label>Confirm Password</label>
          <input
            name="confirmPassword"
            className={style.signUpInput}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      <div style={{ color: "red" }}>{message ? message : ""}</div>
      <div className={style.signUpBtnWrapper}>
        <button
          className={style.signUpSubmit}
          onClick={(e) => {
            // e.preventDefault();
            signUp();
            console.log("Button");
          }}
        >
          Sign Up
        </button>
      </div>
      <OAuth />
    </>
  );
}

export default SignUp;
