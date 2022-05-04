import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Card, message } from 'antd';
import "./forgotPassword.css";
const ForgotPassword = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
 const submitForm = () => {
    if(email && email.length > 5 && email.includes(".")){
        axios
        .post("/forgotPassword", {
          email
        })
        .then((res) => {
            sessionStorage.setItem("resetEmail", email);
            history.push("/changePassword");
        }).catch((err) => {
            message.info("Email not found")});
     
    } else {
    message.info("PLease fill right email.")
    }
}
    return (
        <>
    <Card hoverable className="loginFormDiv">
      <h2 className="headlineLoginForm">Password assistance</h2>
      <div className="loginFormInnerDiv">
      <h4 >Enter the email address associated with your Amruttam tattva account.</h4> 
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
          <button type="submit" onClick={submitForm} className="buttonLoginForm">
          Continue
        </button>
          </div>
        </Card>
        </>
    )}
export default ForgotPassword;