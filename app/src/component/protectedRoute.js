import React from 'react';
import { Route, Redirect, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import Home from "./home/home";

const ProtectedRoute =({component, path}) => {
  const history = useHistory();
  const loginAdmin = sessionStorage.getItem("adminAcc");
  const loginUser = sessionStorage.getItem("login");
console.log(loginAdmin,"loginAfdmin", loginUser,"l;logoinUSer");
  if (loginAdmin && loginUser){
    return <Route path={path} component={component} />
      } else if(loginUser && component !== "AdminMain"){
    return <Route path={path} component={component} />
      }else {
  history.push("/shop")
      }
  }

export default ProtectedRoute;
