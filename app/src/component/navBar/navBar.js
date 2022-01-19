import React, { useEffect, useState } from "react";
import "./navBar.css";
import logoNav from "../../img/logoNav.svg";
import cartLogo from "../../img/cartLogo.svg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { incrementCart, loginUser } from "../redux/action";
import SearchBar from "../searchBar/searchBar";
import { useHistory } from "react-router-dom";

const NavBar = ({defaultOptions}) => {
  const history = useHistory();
  let counter = useSelector((state) => state.cartCount);
  // setLoginState] = useState(false);
  // setLoginState(
  const loginState =useSelector(state => state.loginUser);
  const [loginCheck, setLoginCheck] = useState(false);
  const [clickCheck, setClickCheck] = useState(false);

  const dispatch = useDispatch();
  useEffect(() =>{
    if(loginState){
      setLoginCheck(true)
    }
      },[loginState])

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
  if(loginCheck){
  let userData = JSON.parse(sessionStorage.getItem("userInfo"))  
  const countOfCart = userData.userCart.countOfCart;
    dispatch(incrementCart(countOfCart));

  }

  const hamburgerClicked = () => {
    let element = document.querySelector("#navBarHamburgerDisplay");
    setClickCheck(!clickCheck);
    clickCheck
      ? element.classList.add("navBarActive")
      : element.classList.remove("navBarActive");
    // classList.add("navBarActive")
  };
const loginCartAlert =()=>{
  
  alert("SignUp or LogIn First");
  sessionStorage.setItem("loginPath", JSON.stringify(history.location.pathname));
  history.push("/signUp")

  
}
  return (
    <div className="navBar">
      <nav className="navBarNav">
        <div className="navBarDiv">
          <div className="navBarImgDiv navBarItems">
            <img className="navBarImg" src={logoNav} alt="nav-logo" />
          </div>
          <div className="searchBarDiv">
            <SearchBar defaultOptions={defaultOptions} />
          </div>
          <div className="navBarTextDiv">
            <span className="navBarItems ">
              <Link
                to="/"
                style={{ textDecoration: "none", color: "whitesmoke" }}
              >
                Home
              </Link>
            </span>
            <span className="navBarItems ">
              <Link
                to="/blog"
                style={{ textDecoration: "none", color: "whitesmoke" }}
              >
                Blog
              </Link>
            </span>
            <span className="navBarItems ">
              <Link
                to="/shop"
                style={{ textDecoration: "none", color: "whitesmoke" }}
              >
                Shop
              </Link>
            </span>
            <span className="navBarItems ">
              {loginCheck ? (
                <span
                  className=""
                  onClick={() => {
                    // dispatch(loginUser())
                    // dispatch(incrementCart(0))
                    if(window.confirm("Do you want to logout")){
                    sessionStorage.removeItem("login");
                    sessionStorage.removeItem("userInfo");
                    // setLoginCheck(false);
                    history.push("/shop");
                    window.location.reload();
                  }
                  }}
                >
                    LogOut
                </span>
              ) : (
                <span>
                  <Link
                    to="/logIn"
                    onClick={() => sessionStorage.setItem("loginPath", JSON.stringify(history.location.pathname))}
                    style={{ textDecoration: "none", color: "whitesmoke" }}
                  >
                    LogIn
                  </Link>
                </span>
              )}
            </span>
            {/* <span className="navBarItems ">
              <Link
                to="/contact"
                style={{ textDecoration: "none", color: "whitesmoke" }}
              >
                Contact
              </Link>
            </span> */}
            {
              loginCheck ? 
              <Link
              to="/cart"
              style={{ textDecoration: "none", color: "whitesmoke" }}
            >
              <div className="navBarCartImageDiv">
                <img className="navBarCart" src={cartLogo} alt="nav-logo" />
              </div>
            </Link>
              :
              
              <div className="navBarCartImageDiv"
              onClick={loginCartAlert}
              >
                <img className="navBarCart" src={cartLogo} alt="nav-logo" />
              </div>
  
            }
            

            <div className="navBarCountsDiv">
              <span className="navBarCounts">{counter}</span>
            </div>

            <div
              onClick={() => hamburgerClicked()}
              className="navBarHamburgerDiv"
              id="menuToggle"
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </nav>

      <div
        className="navBarHamburgerOpen navBarActive"
        id="navBarHamburgerDisplay"
      >
        <h4 onClick={() => hamburgerClicked()} className="navBarHamburgerItems">
          <Link to="/" style={{ textDecoration: "none", color: "whitesmoke" }}>
            Home
          </Link>
        </h4>
        <h4 onClick={() => hamburgerClicked()} className="navBarHamburgerItems">
          <Link
            to="/blog"
            style={{ textDecoration: "none", color: "whitesmoke" }}
          >
            Blog
          </Link>
        </h4>
        <h4 onClick={() => hamburgerClicked()} className="navBarHamburgerItems">
          <Link
            to="/shop"
            style={{ textDecoration: "none", color: "whitesmoke" }}
          >
            Shop
          </Link>
        </h4>
        <h4 onClick={() => hamburgerClicked()} className="navBarHamburgerItems">
        {loginCheck ? (
                <span
                  className=""
                  onClick={() => {
                    // dispatch(loginUser())
                    // dispatch(incrementCart(0))
                    sessionStorage.removeItem("login");
                    sessionStorage.removeItem("userInfo");
                    // setLoginCheck(false);
                    history.push("/shop");
                    window.location.reload();
                  }}
                >
                    LogOut
                </span>
              ) : (
                <span
                  className=""
                  onClick={() => {
                    // setLoginCheck(true);
                    //  history.push("/shop")
                  }}
                >
                  <Link
                    to="/logIn"
                    style={{ textDecoration: "none", color: "whitesmoke" }}
                  >
                    LogIn
                  </Link>
                </span>
              )}
        </h4>
        {/* <h4 onClick={() => hamburgerClicked()} className="navBarHamburgerItems">
          <Link
            to="/contact"
            style={{ textDecoration: "none", color: "whitesmoke" }}
          >
            Contact
          </Link>
        </h4> */}
        <div
          onClick={() => hamburgerClicked()}
          className="navBarHamburgerItems navBarImgDiv"
        >
          <img className="navBarImg" src={logoNav} alt="nav-logo" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
