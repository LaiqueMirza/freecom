import React, { useEffect, useState } from "react";
import "./navBar.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { loginUser } from "../redux/action/index";

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loginCheck, setLoginCheck] = useState(false);
  const loginState = useSelector((state) => state.loginUser);
  const logoutClickHandler =() =>{ 
    sessionStorage.setItem("login", false);
    dispatch(loginUser());
    history.push('/');
    window.location.reload(false);
  }
  useEffect(() => {
    if (loginState) {
      setLoginCheck(true);
    }
  }, [loginState]);
  return (<>
    <div className="navBarMainDiv">
      <div className="navBarNav">
        <div className="navBarDiv">

          <Link
            to="/"
            style={{ textDecoration: "none", color: "whitesmoke" }}
          >
            Home
          </Link>
          <div className="loginDivSecond">
      {!loginCheck ? (
        
        <>
      <Link
        to="/logIn"
                  style={{ textDecoration: "none", color: "whitesmoke", marginRight: "15px" }}

        >
        Log in
      </Link>
      <Link
        style={{ textDecoration: "none", color: "whitesmoke" }}
        to="/signUp"
        >
        Sign up
      </Link>
        </>)
        : (
          <Button
          onClick={logoutClickHandler}
                  style={{ textDecoration: "none", color: "whitesmoke", backgroundColor: "black" }}

         >
            Log out
          </Button>
          )
        }
        </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default NavBar;
