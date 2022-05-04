import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import NavBar from "./component/navBar/navBar";
import Home from "./component/home/home";
import blog from "./component/blog/blog";
import SignUp from "./component/Log/signUp/signUp";
import LogIn from "./component/Log/logIn/logIn";
import ForgotPassword from "./component/Log/forgotPassword/forgotPassword";
import ChangePassword from "./component/Log/changePassword/changePassword";
import Shop from "./component/shop/shop";
import MainCart from "./component/mainCart/mainCart";
import Checkout from "./component/checkout/checkout";
import Product from "./component/product/product/product";
import AddressSection1 from "./component/addressSection/addressSection1/addressSection1";
import SelectAddress from "./component/addressSection/selectAddress/selectAddress";
import Footer from "./component/footer/footer";
import RenderSearchResult from "./component/renderSearchResult/renderSearchResult";
import ProtectedRoute from "./component/protectedRoute";
import AdminMain from  "./component/admin/Admin";
import OrderSuccess from  "./component/orderSuccess/orderSuccess";
import { message } from "antd";

import axios from "axios";
import "./App.css";

import { HashRouter, Switch, Route, Link } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [defaultOptions, setDefaultOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => {
        setProducts(res.data.result);
      })
      .catch((err) => {
        message.info('Error, refresh the page');
    setLoading(false);
  });
    setLoading(false);
  }, []);
  useEffect(() => {
    if (products && products[0]) {
      let optionsArray = [];
      products.map((product) =>
        optionsArray.push(product.productName.toLowerCase())
      );
      setDefaultOptions(optionsArray);
    }
  }, [products]);

  return (
    <HashRouter>
      <div className="App">
        <NavBar defaultOptions={defaultOptions} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/blog" component={blog} />
          <Route
            path="/shop"
            component={() => (
              <Shop
                products={products}
                loading={loading}
              />
            )}
          />
          <Route path="/logIn" component={LogIn} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/product" component={Product} />
          <Route path="/forgotPassword" component={ForgotPassword} />
          <Route path="/changePassword" component={ChangePassword} />
          <Route
            path="/searchResult"
            component={() => <RenderSearchResult products={products} />}
          />
                <ProtectedRoute path="/cart" component={MainCart} />
                <ProtectedRoute path="/checkout" component={Checkout} />
                <ProtectedRoute path="/address" component={AddressSection1} />
                <ProtectedRoute path="/addressNew" component={SelectAddress} />
                <ProtectedRoute path="/admin" component={AdminMain} />
                <ProtectedRoute path="/orderSuccess" component={OrderSuccess} />
          <Route
            component={() => (
              <h2 style={{ textAlign: "center" }}>
                Page 404, You are lost go to {<Link to="/shop">SHOP</Link>}{" "}
              </h2>
            )}
          />
        </Switch>
          <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
