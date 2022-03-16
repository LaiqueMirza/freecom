import React, { useEffect, useState } from "react";
import "./navBar.css";
import logoNav from "../../img/CompanyLogo.jpeg";
import cartLogo from "../../img/cartLogo.svg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { incrementCart, loginUser } from "../redux/action";
import SearchBar from "../searchBar/searchBar";
import { useHistory } from "react-router-dom";
import First from "./first/first";
import Second from "./second/second";

const NavBar = ({defaultOptions}) => {

  return (<>
  <div className="navBarMainDiv">

  <First defaultOptions={defaultOptions}/>
  <Second/>
  </div>
  </>
  );
};

export default NavBar;
