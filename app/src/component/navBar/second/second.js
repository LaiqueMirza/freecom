import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Button, message, Space, Tooltip } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { incrementCart } from "../../redux/action";
import { useHistory } from "react-router-dom";
import "./second.css";
import DropDownMenu from "./dropdown.js";

import { searchValue } from '../../redux/action/index';


const Second = () => {

  const history = useHistory();
  const loginAdmin = sessionStorage.getItem("adminAcc");
  const loginState = useSelector((state) => state.loginUser);
  const [loginCheck, setLoginCheck] = useState(false);
  const [clickCheck, setClickCheck] = useState(false);
  const [current, setCurrent] = useState();
  const dispatch = useDispatch();
    const handleMenuClick=(e)=> {
        message.info("click", e.key);
        console.log("click", e.key);
        dispatch(searchValue(e.key.toLowerCase()));
  return history.push("/searchResult")
      }
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


  return (
    <div className="navBarNavSecond">
      <div className="navBarDivSecond">
        <Menu mode="horizontal" className="navBarDivSecondFirst">
          <Menu.Item key="image">
            <Link
              to="/"
              style={{ textDecoration: "none", color: "whitesmoke" }}
            >
              HOME
            </Link>
          </Menu.Item>

          <Menu.Item key="shop">
            <Link
              to="/shop"
              style={{
                textDecoration: "none",
                color: "whitesmoke",
              }}
            >
              SHOP
            </Link>
          </Menu.Item>
          <Menu.Item key="products">
            <Dropdown overlay={(<DropDownMenu handleMenuClick={handleMenuClick}/>)}>
              <span
                style={{
                  textDecoration: "none",
                  color: "whitesmoke",
                  marginRight: "7px",
                }}
              >
                <span
                  style={{
                    marginRight: "7px",
                  }}
                >
                  PRODUCTS
                </span>
                <DownOutlined />
              </span>
            </Dropdown>
          </Menu.Item>

        {
          loginAdmin ?
          (<Menu.Item key="admin">
          <Link
            to="/admin"
            style={{
              textDecoration: "none",
              color: "whitesmoke",
            }}
            >
              ADMIN
          </Link>
        </Menu.Item>)
         : null
        }
        </Menu>
        <Menu mode="horizontal" className="navBarDivSecondSecond">
          <Menu.Item key="login">
            {loginCheck ? (
              <span
              style={{ textDecoration: "none", color: "whitesmoke" }}
                className=""
                onClick={() => {
                  if (window.confirm("Do you want to logout")) {
                    sessionStorage.removeItem("login");
                    sessionStorage.removeItem("userInfo");
                    sessionStorage.removeItem("adminAcc")
                    history.push("/shop");
                    window.location.reload();
                  }
                }}
              >
                LOGOUT
              </span>
            ) : (
              <span
              >
                <Link
                  to="/logIn"
                  onClick={() =>
                    sessionStorage.setItem(
                      "loginPath",
                      JSON.stringify(history.location.pathname)
                    )
                  }
                  style={{ textDecoration: "none", color: "whitesmoke" }}
                >
                  LOGIN
                </Link>
              </span>
            )}
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default Second;
