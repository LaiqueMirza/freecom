import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser, incrementCart } from "../../redux/action/index";
import { Link } from "react-router-dom";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "../logIn/logIn.css";
import { Card, message } from 'antd';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [loginData, setLoginData] = useState();
  const [gender, setGender] = useState();
  const [passwordShown, setPasswordShown] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const eye = <FontAwesomeIcon icon={faEye} />;

  const submitForm = () => {
    if(email && email.length > 5 && email.includes(".")){
      if(password && password.length > 7){
        if(phoneNumber && phoneNumber.toString().length == 10){
          if(name && gender){
          
    axios
      .post("/signUp", {
        name,
        email,
        password,
        phoneNumber,
        gender
      })
      .then((res) => {
        if(res.status == 206){
         return message.info(res.data)
          // Email or Phone Number is already there. Go Login
        }
        setLoginData(res.data);
        setLogin(true);
      })
      .catch((err) => {
        message.info("Could Not Add You, Try Again")
      });
   
          }else {
            message.info("Name Or Gender Is Not Provided")
          }
        }else {
          message.info("Phone Number Is Not Right, It Should Have 10 digits")
        }
      }else {
        message.info("Password should be atleast 8 characters")
      }
    } else {
      message.info("Email Is Not Right")
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
        <h2 className="headlineLoginForm">SIGN UP FORM</h2>
        <p>Sign up to get access to exciting offers and promotions</p>

        <div className="loginFormInnerDiv">
          <i className="fa fa-user userIcon-LoginForm"></i>
          <label htmlFor="name">Name <b>*</b></label>
          <input
            name="name"
            type="text"
            placeholder="Name"
            required
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="inputLogInForm"
          />
          <br />
          <label htmlFor="email">Email <b>*</b></label>
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
          <br />
          <label htmlFor="password">Password <b>*</b></label>
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
          <label htmlFor="phoneNumber">Phone Number <b>*</b></label>
          <input
            name="phoneNumber"
            type="number"
            placeholder="Phone Number"
            required
            autoComplete="off"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(parseInt(e.target.value))}
            className="inputLogInForm"
          />
          <br />
          <label htmlFor="gender">Gender <b>*</b></label>
          <div className="genderInputSignUp">

          <input
            type="radio"
            name="gender"
            value="male"
            onClick={() => setGender("Male")}
          />
          <label id="genderLabel" htmlFor="male">Male </label>
          <input
            type="radio"
            name="gender"
            value="female"
            onClick={() => setGender("Female")}
          />
          <label id="genderLabel" htmlFor="female">Female</label>
          <input
            type="radio"
            name="gender"
            value="other"
            onClick={() => setGender("Others")}
          />
          <label id="genderLabel" htmlFor="other">Other</label>
          </div>
          <br />
          <button
            type="submit"
            onClick={submitForm}
            className="buttonLoginForm"
          >
            SIGN UP
          </button>
          <Link to="/logIn" style={{ textDecoration: "none", color: "black" }}>
            <button type="submit" className="createAccountbuttonLoginForm">
              Already have an account ? Log In.
            </button>
          </Link>
        </div>
        </Card>
    </div>
  );
};

export default SignUp;
