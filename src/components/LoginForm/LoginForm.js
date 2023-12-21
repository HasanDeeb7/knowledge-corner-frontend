import { useContext, useEffect, useState } from "react";
import style from "./LoginFrom.module.css";
import axios from "axios";
import { userContext } from "../../App";

function LoginForm() {
  const { user, setUser } = useContext(userContext);
  const [message,setMessage]=useState()
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    console.log(credentials)
  }

  async function handleLogin() {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/signin",
        credentials
      );
      if (response) {
        setUser(response.data.user);
        console.log(response.data);
      }
    } catch (error) {
      // console.log(error);
      setMessage(error.response.data.message)

    }
  }
 
  useEffect(()=>{

  },[message])
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
        <div style={{color:"red"}}>{message?message:null}</div>
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
