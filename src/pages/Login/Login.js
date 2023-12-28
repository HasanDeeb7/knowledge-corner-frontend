import { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import style from "./Login.module.css";
import SignUp from "../../components/SignUp/SignUp";

import log from '../../assets/icons/log-in (2).png'
import sign from '../../assets/icons/add-user.png'
import { Helmet } from "react-helmet";
import OAuth from "../../OAuth";


function Login() {
  const [login, setLogin] = useState(true);
  return (
    <div className={style.loginPageContainer}>

      <Helmet>
        <title>Login</title>
        <link rel="shortcut icon"></link>
      </Helmet>


      {login ? (
        <div className={style.loginFormContainer}>
            <Helmet>
        <meta charSet="utf-8" />
        <title>Log In</title>
        <meta name="description" content="Log in" />
        <link rel="icon" href={log} />
      </Helmet>
          <h2>Log In</h2>
          <LoginForm />
          <OAuth />
          <p>
            Don't have an account?
            <span
              onClick={() => setLogin(false)}
              className={style.actionButton}
            >
              Sign Up
            </span>
          </p>
        </div>
      ) : (
        <div className={style.loginFormContainer}>
                 <Helmet>
        <meta charSet="utf-8" />
        <title>Sign Up</title>
        <meta name="description" content="Sign Up Form" />
        <link rel="icon" href={sign} />
      </Helmet>
          <h2>Sign Up</h2>
          <SignUp setLogin={setLogin} />
          <p>
            Already have an account?
            <span onClick={() => setLogin(true)} className={style.actionButton}>
              Login
            </span>
          </p>
        </div>
      )}
      <div className={style.loginHeroSide}>
        <h1>
          “Unlock your world of words with every login. Your stories are waiting
          to be shared.”
        </h1>
      </div>
    </div>
  );
}

export default Login;
