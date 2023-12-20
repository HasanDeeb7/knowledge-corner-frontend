import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Icon from "../../assets/icons/books-stack-of-three 2.svg";
import Icone from "../../assets/icons/Group.svg";
import navBarStyle from "./navbar.module.css";

const NavBar = () => {
  const [menuOpenn, setMenuOpenn] = useState(false);
  const [isActive, setActive] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ]);
  const navigate = useNavigate();
  const [isResponsive, setIsResponsive] = useState(window.innerWidth <= 480);

  const handleSearch = () => {
    setMenuOpenn(!menuOpenn);
    console.log("clicked"); // Toggle the menuOpen state
  };

  useEffect(() => {
    // Check the window width and set the isResponsive state when the component mounts
    const handleResize = () => {
      setIsResponsive(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={navBarStyle.navContainer}>
      <nav className={navBarStyle.navBar}>
        <div className={navBarStyle.logoContainer}>
          <NavLink
            onClick={() => {
              setActive([true, false, false, false, false, false]);
            }}
            to={"./"}
          >
            <img
              className={navBarStyle.navImg}
              src={isResponsive ? Icone : Icon}
              alt="logo"
            />
          </NavLink>
          <h1 className={navBarStyle.navTitle}>Sapiens</h1>
        </div>
        <div
          className={navBarStyle.navMenu}
          onClick={handleSearch} // Use handleClick function here
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul
          className={`${navBarStyle.navUl} ${
            menuOpenn ? navBarStyle.open : ""
          }`}
        >
          <li>
            <NavLink
              onClick={() => {
                setActive([true, false, false, false, false, false]);
              }}
              className={`${navBarStyle.navLi} ${
                isActive[0] ? navBarStyle.active : ""
              }`}
              to={"./"}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => {
                setActive([false, true, false, false, false, false]);
              }}
              className={`${navBarStyle.navLi} ${
                isActive[1] ? navBarStyle.active : ""
              }`}
              to={"./Librairies"}
            >
              Librairies
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => {
                setActive([false, false,true, false, false, false]);
              }}
              className={`${navBarStyle.navLi} ${
                isActive[2] ? navBarStyle.active : ""
              }`}
              to={"./AllBooks"}
            >
              All Books
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => {
                setActive([false, false,false, true, false, false, false]);
              }}
              className={`${navBarStyle.navLi} ${
                isActive[3] ? navBarStyle.active : ""
              }`}
              to={"./AllAuthors"}
            >
              All Authors
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => {
                setActive([false,false, false, false, true, false, false]);
              }}
              className={`${navBarStyle.navLi} ${
                isActive[4] ? navBarStyle.active : ""
              }`}
              to={"./AboutUs"}
            >
              About Us
            </NavLink>
          </li>
        </ul>
        <div
          className={navBarStyle.loginBtn}
          onClick={() => navigate('/login')}
        >
          Login
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
