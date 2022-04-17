import React, { useEffect, useState } from "react";
import "./mainCart.css";
import Cart from "./cart/cart";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { incrementCart, loginUser } from "../redux/action";
import { message } from "antd";

//i all take the product from his account in the main cart

const MainCart = () => {
  //here i all make the user make an account mandatory*
  // i all put everyting in cart in his account cart and fetch the cart from his account
  const dispatch = useDispatch();
  const [loginCheck, setLoginCheck] = useState(false);
  const [removeRerender, setRemoveRerender] = useState(false);
  useEffect(() => {
    setLoginCheck(JSON.parse(sessionStorage.getItem("login")));
  }, []);

  let cartProducts;

  if (!loginCheck) {
    cartProducts = JSON.parse(localStorage.getItem("theAddedItems"));
  } else {
    let userData = JSON.parse(sessionStorage.getItem("userInfo"));
    cartProducts = userData.userCart.itemsInCart;
  }

  let userData = JSON.parse(sessionStorage.getItem("userInfo"));

  const removeItem = (targetId, targetSize) => {
    userData.userCart.itemsInCart.every((item, index) => {
      if (item._id === targetId && item.selectedSize === targetSize) {
        userData.userCart.itemsInCart.splice(index, 1);
        userData.userCart.countOfCart -= 1;
        return false;
      }
      return true;
    });

    axios
      .post("/users", {
        userData,
      })
      .then((res) => {})
      .catch((err) => message.info("Could Not Delete Item"));

    sessionStorage.setItem("userInfo", JSON.stringify(userData));
    dispatch(incrementCart(userData.userCart.countOfCart));

    setRemoveRerender(!removeRerender);
  };

  let bagTotal = 0;
  let totalAmount = 0;
    cartProducts?.map(
      (product) => (bagTotal = bagTotal + product.totalPrice)
    );
  totalAmount += bagTotal;
  let shippingCharge = 0;
  shippingCharge = bagTotal > 499 ? "FREE" : 30;
  if (typeof shippingCharge === "number") {
    totalAmount += shippingCharge;
  }

  return (
    <div className="mainCartDiv">
      <div className="mainCart-cart-Div">
        {cartProducts && cartProducts[0] ? (
          cartProducts.map((product) => (
            <Cart
              targetProduct={product}
              key={product._id}
              removeItem={removeItem}
              // onClick={(e) => setRecentPic(e.target.currentSrc)}
            />
          ))
        ) : (
          <h2>There is no product added to cart go to shop</h2>
        )}
      </div>

      <div className="price-summary">
        <h3 className="mainCartH3">PRICE SUMMARY</h3>
        <table className="mainCart-table">
          <thead>
            <tr>
              <th>BAG TOTAL</th>
              <th>:</th>
              <th>{bagTotal}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SHIPPING</td>
              <td>:</td>
              <td>{shippingCharge}</td>
            </tr>
          </tbody>

          <thead>
            <tr>
              <th>TOTAL PAYABLE</th>
              <th>:</th>
              <th>{totalAmount} ₹</th>
            </tr>
          </thead>
        </table>
        <hr />
        <p className="shippingFreeP">SHIPPING FREE FOR MORE THAN 500 ₹ SHOPPING</p>
        <hr />
        {cartProducts && cartProducts[0] ? (
          <Link
            to="/address"
            style={{ textDecoration: "none", color: "whitesmoke" }}
          >
            <button className="checkoutButton-mainCart">
              PROCEED TO CHECKOUT
            </button>
          </Link>
        ) : (
          <button
            onClick={() => message.info("Add Products in cart first")}
            className="checkoutButton-mainCart"
          >
            PROCEED TO CHECKOUT
          </button>
        )}
      </div>
    </div>
  );
};

export default MainCart;
