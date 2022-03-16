import React, { useEffect, useState } from "react";
import logoNav from "../../../img/CompanyLogo.jpeg";
import cartLogo from "../../../img/cartLogo.svg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { incrementCart } from "../../redux/action";
import SearchBar from "../../searchBar/searchBar";
import { useHistory } from "react-router-dom";
import { Menu, message } from "antd";
import './first.css';
const First = ({ defaultOptions }) => {
  const history = useHistory();
  let counter = useSelector((state) => state.cartCount);
  const loginState = useSelector((state) => state.loginUser);
  const [loginCheck, setLoginCheck] = useState(false);
  const [clickCheck, setClickCheck] = useState(false);
  const [current, setCurrent] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    if (loginState) {
      setLoginCheck(true);
    }
  }, [loginState]);

  useEffect(() => {
    setLoginCheck(JSON.parse(sessionStorage.getItem("login")));
    if (!localStorage.getItem("countOfCart")) {
      let countOfCart = 0;
      countOfCart = JSON.stringify(countOfCart);
      localStorage.setItem("countOfCart", countOfCart);
    } else {
      let countOfCart = JSON.parse(localStorage.getItem("countOfCart"));
      dispatch(incrementCart(countOfCart));
    }
  }, []);
  if (loginCheck) {
    let userData = JSON.parse(sessionStorage.getItem("userInfo"));
    const countOfCart = userData?.userCart?.countOfCart;
    dispatch(incrementCart(countOfCart));
  }

  const loginCartAlert = () => {
    message.info("SignUp or LogIn First");
    sessionStorage.setItem(
      "loginPath",
      JSON.stringify(history.location.pathname)
    );
    history.push("/signUp");
  };

  const handleClick = (e) => {
    console.log("click ", e);
    setCurrent({ current: e.key });
  };

  return (
    <div className="navBarNavFirst">
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        className="navBarDivFirst"
      >
        <Menu.Item key="image">
        <Link
                to="/"
                style={{ textDecoration: "none", color: "whitesmoke" }}
              >
          <img className="navBarImg" src={logoNav} alt="nav-logo" />
          </Link>
        </Menu.Item>
        <Menu.Item key="search" className="navBarFirstSearch">
          <SearchBar defaultOptions={defaultOptions} />
        </Menu.Item>
        <Menu.Item key="cart" className="navBarCartImageDivFirst">
          {loginCheck ? (
            <Link
              to="/cart"
            >
                <img className="navBarCartFirst" src={cartLogo} alt="nav-logo" />
            </Link>
          ) : (
              <img className="navBarCartFirst" src={cartLogo} onClick={loginCartAlert} alt="nav-logo" />
          )}
           <div className="navBarCountsDivFirst">
              <span className="navBarCountsFirst">{counter}</span>
            </div>

        </Menu.Item>
      </Menu>
    </div>
  );
};

export default First;
