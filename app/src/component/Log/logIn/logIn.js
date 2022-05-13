import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../redux/action/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "./logIn.css";
import { Card, message } from 'antd';
const LogIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [login, setLogin] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const eye = <FontAwesomeIcon icon={faEye} />;
  const submitForm = () => {
    if(email && email.length > 5 && email.includes(".") && password){
// work remove credentials from here
    axios
    .post("/login", {
      email,
      password,
    })
    .then((res) => {
      setLogin(true);
    })
    .catch((err) => message.info("wrong details, User Not Found"));
  } else {
    message.info("PLease Fill All Right Details")
  }
};
if (login) {
    sessionStorage.setItem("login", true);
    dispatch(loginUser());
      history.push('/');
  }
  return (
    <div className="outsideDiv">
    <Card hoverable className="loginFormDiv">
      <h2 className="headlineLoginForm">LOGIN FORM</h2>
      <div className="loginFormInnerDiv">
        <i className="fa fa-user userIcon-LoginForm"></i>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          placeholder="E-mail"
          required
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="inputLogInForm"
          />
        <hr />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type={passwordShown ? "text" : "password"}
          placeholder="Password"
          required
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="inputLogInForm"
          />
        <i
          className="eyeIconLogIn"
          onClick={() => setPasswordShown(!passwordShown)}
          >
          {eye}
        </i>
        <hr />
        <button type="submit" onClick={submitForm} className="buttonLoginForm">
          LOG IN
        </button>
        <Link to="/signUp" style={{ textDecoration: "none", color: "black" }}>
          <button type="submit" className="createAccountbuttonLoginForm">
            New Here? Create An Account.
          </button>
        </Link>
      </div>
    </Card>
</div> 
  );
};

export default LogIn;
