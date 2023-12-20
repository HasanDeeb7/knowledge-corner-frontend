import { useState } from "react";
import style from "./SignUp.module.css";
function SignUp() {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  function handleChange(e) {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  }
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
      <div className={style.signUpBtnWrapper}>
        <button
          className={style.signUpSubmit}
          onClick={(e) => {
            e.preventDefault();
            console.log("Button");
          }}
        >
          Sign Up
        </button>
      </div>
    </>
  );
}

export default SignUp;
