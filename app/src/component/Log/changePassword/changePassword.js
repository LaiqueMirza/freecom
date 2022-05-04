import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, loginAdmin, incrementCart } from "../../redux/action/index";
import axios from "axios";
import { Card, message } from 'antd';
import "./changePassword.css";
const ChangePassword = () => {
  useEffect(() => {
  setEmail(sessionStorage.getItem("resetEmail"));
  },[]);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loginData, setLoginData] = useState();
  const [login, setLogin] = useState(false);
  const [password, setpassword] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [reEnterPassword, setreEnterpassword] = useState("");
 const submitForm = () => {
    if(otp && password.length > 7 && password == reEnterPassword){
        axios
        .post("/changePassword", {
          email,
          password,
          otp
        })
        .then((res) => {
            message.info("Password Changed Successfully");
            setLoginData(res.data);
            setLogin(true);
            // history.push("/resetPassword");
        })
        .catch((err) => {
          message.info("OTP not valid");
        });
     
    } else {
    message.info("The password should match.")
    }
}
if (login) {
  sessionStorage.setItem("login", true);
  sessionStorage.setItem("userInfo", JSON.stringify(loginData));
  dispatch(loginUser());
  let countOfCart = loginData?.userCart?.countOfCart;
  dispatch(incrementCart(countOfCart));
  history.push("/shop");
}
    return (
        <>
    <Card hoverable className="loginFormDiv">
      <h2 className="headlineLoginForm">Verification required</h2>
      <div className="loginFormInnerDiv">
      <h4 >To continue, complete this verification step. We've sent a One Time Password (OTP) to the {email} mirzalaique2eye@gmail.com. Please enter it below.
Enter OTP</h4> 
<label htmlFor="email">Enter OTP</label>
        <input
          name="Otp"
          type="text"
          placeholder="Otp"
          required
          autoComplete="off"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="inputLogInForm"
          />
        <hr />
<label htmlFor="email">Password</label>
        <input
          name="password"
          type="text"
          placeholder="Password"
          required
          autoComplete="off"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          className="inputLogInForm"
          />
        <hr />
        <label htmlFor="email">Re-enter password</label>
        <input
          name="reEnterpassword"
          type="text"
          placeholder="Re-enter password"
          required
          autoComplete="off"
          value={reEnterPassword}
          onChange={(e) => setreEnterpassword(e.target.value)}
          className="inputLogInForm"
          />
        <hr />
          <button type="submit" onClick={submitForm} className="buttonLoginForm">
          Change password & sign in
        </button>
          </div>
        </Card>
        </>
    )}
export default ChangePassword;