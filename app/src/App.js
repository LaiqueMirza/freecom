import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import NavBar from "./component/navBar/navBar";
import Home from "./component/home/home";
import SignUp from "./component/Log/signUp/signUp";
import LogIn from "./component/Log/logIn/logIn";
import { message, Spin } from "antd";

import "./App.css";

import { HashRouter, Switch, Route, Link } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [defaultOptions, setDefaultOptions] = useState([]);
  const [loading, setLoading] = useState(true);


  return (
    <HashRouter>
        {/* {
        //   loading ? (
        //   <div className="appSpinDiv">
        //     <Spin size="large"/>
        //   </div>
        //   ) 
        // : 
        // ( */}
          <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/logIn" component={LogIn} />
          <Route path="/signUp" component={SignUp} />
          <Route
            component={() => (
              <h2 style={{ textAlign: "center" }}>
                Page 404, You are lost go to {<Link to="/">Main Page</Link>}{" "}
              </h2>
            )}
          />
        </Switch>
      </div>
    {/* )} */}
    </HashRouter>
  );
}

export default App;
