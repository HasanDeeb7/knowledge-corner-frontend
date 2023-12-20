import { useContext, useState } from "react";
import style from "./LoginFrom.module.css";
import axios from "axios";
import { userContext } from "../../App";

function LoginForm() {
  const { user, setUser } = useContext(userContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  async function handleLogin() {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/signin",
        credentials
      );
      if (response) {
        setUser(response.data.user);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className={style.loginWrapper}>
        <div className={style.inputLabelWrapper}>
          <label>Email</label>
          <input
            name="email"
            value={credentials.email}
            className={style.loginInput}
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className={style.inputLabelWrapper}>
          <label>Password</label>
          <input
            name="password"
            value={credentials.password}
            className={style.loginInput}
            type="password"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={style.loginBtnWrapper}>
        <button
          className={style.loginSubmit}
          onClick={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          Sign In
        </button>
      </div>
    </>
  );
}

export default LoginForm;
