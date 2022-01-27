import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser, incrementCart } from "../../redux/action/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "./logIn.css";
import { Card } from 'antd';
const LogIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [login, setLogin] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [loginData, setLoginData] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const eye = <FontAwesomeIcon icon={faEye} />;

  const submitForm = () => {
    if(email && email.length > 5 && email.includes(".") && password){

    
    axios
      .post("/login", {
        email,
        password,
      })
      .then((res) => {
        setLoginData(res.data);
        setLogin(true);
      })
      .catch((err) => alert("wrong details, User Not Found"));
    } else {
      alert("PLease Fill All Right Details")
    }
  };

  if (login) {
    sessionStorage.setItem("login", true);
    sessionStorage.setItem("userInfo", JSON.stringify(loginData));
    dispatch(loginUser());
    let countOfCart = loginData.userCart.countOfCart;
    dispatch(incrementCart(countOfCart));
    const loginPath = JSON.parse(sessionStorage.getItem("loginPath"));
    console.log(loginPath);
    if(!loginPath || loginPath == "/logIn" || loginPath=="/signUp"){
    history.push("/shop");
    } else {
      history.push(loginPath);
    }
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

// function Form ({ option }) {
  //     return (
    //         <form className='account-form' onSubmit={(evt) => evt.preventDefault()}>
    //             <div className={'account-form-fields ' + (option === 1 ? 'sign-in' : (option === 2 ? 'sign-up' : 'forgot')) }>
    //                 <input id='email' name='email' type='email' placeholder='E-mail' required />
    //                 <input id='password' name='password' type='password' placeholder='Password' required={option === 1 || option === 2 ? true : false} disabled={option === 3 ? true : false} />
    //                 <input id='repeat-password' name='repeat-password' type='password' placeholder='Repeat password' required={option === 2 ? true : false} disabled={option === 1 || option === 3 ? true : false} />
    //             </div>
    //             <button className='btn-submit-form' type='submit'>
//                 { option === 1 ? 'Sign in' : (option === 2 ? 'Sign up' : 'Reset password') }
//             </button>
//         </form>
//     )
// }

// const LogIn = () => {
//     const [option, setOption] = React.useState(1)

//     return (
//         <div className='container'>
//             <header>
//                 <div className={'header-headings ' + (option === 1 ? 'sign-in' : (option === 2 ? 'sign-up' : 'forgot')) }>
//                     <span>Sign in to your account</span>
//                     <span>Create an account</span>
//                     <span>Reset your password</span>
//                 </div>
//             </header>
//             <ul className='options'>
//                 <li className={option === 1 ? 'active' : ''} onClick={() => setOption(1)}>Sign in</li>
//                 <li className={option === 2 ? 'active' : ''} onClick={() => setOption(2)}>Sign up</li>
//                 <li className={option === 3 ? 'active' : ''} onClick={() => setOption(3)}>Forgot</li>
//             </ul>
//             <Form option={option} />
//             <footer>
//                 <a href='https://dribbble.com/shots/5041581-Zenbu-Sign-in-up-forgot-page' target='_blank'>Original design with animations by Zenbu</a>
//             </footer>
//         </div>
//     )
// }

export default LogIn;
