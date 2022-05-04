import React, { useEffect, useState } from "react";
import "./product.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { incrementCart, selectedSize } from "../../redux/action/index";
import { useHistory } from "react-router-dom";
import { Button, message } from "antd";

const Product = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const [targetProduct, setTargetProduct] = useState(
    JSON.parse(sessionStorage.getItem("product"))
  );
  const [checkSelectedSize, setCheckSelectedSize] = useState(
    targetProduct?.selectedSize
  );
  const [selectedproductPrice, setselectedproductPrice] = useState(targetProduct?.totalPrice);
  const [realproductPrice, setrealproductPrice] = useState(targetProduct?.totalPrice);
  const [quantity, setQuantity] = useState(targetProduct?.quantity);
  const [recentPic, setRecentPic] = useState(targetProduct?.photos[0]);
  const history = useHistory();

  const incrementQuantity = () => {
    if (quantity >= 30) {
      message.info("You can't add more than 30");
      return;
    }

    setQuantity(quantity + 1);
    const valsTotalPrice=selectedproductPrice *(quantity + 1);
    setrealproductPrice(valsTotalPrice);
    setTargetProduct({ ...targetProduct,totalPrice:valsTotalPrice });
  };
  const decrementQuantity = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity(quantity - 1);
    const valTotalPrice=selectedproductPrice *(quantity - 1);
    setrealproductPrice(valTotalPrice);
    setTargetProduct({ ...targetProduct,totalPrice:valTotalPrice });

  };
  if (quantity) {
    targetProduct.quantity = quantity;
  }
  const dispatch = useDispatch();
  useEffect(() => {
    setLoginCheck(JSON.parse(sessionStorage?.getItem("login")));
  }, []);

  const handleSizeClick = (index) => {
    const totalPrice=targetProduct?.price[index]*(quantity);
    setTargetProduct({ ...targetProduct, selectedSize: targetProduct?.size[index],totalPrice:totalPrice });
    setCheckSelectedSize(targetProduct?.size[index]);
    setselectedproductPrice(targetProduct?.price[index]);
    setrealproductPrice(totalPrice);
  };

  function incrementingTheCartCount() {
    if (!loginCheck) {
      message.info("SignUp or LogIn First");
      sessionStorage.setItem(
        "loginPath",
        JSON.stringify(history.location.pathname)
      );
      history.push("/signUp");
    } else {
      let userData = JSON.parse(sessionStorage.getItem("userInfo"));

      if (userData.countOfCart === 0) {
        // let userModified =
        userData.userCart.itemsInCart.push(targetProduct);
        userData.userCart.countOfCart += 1;
        let countOfCart = userData?.userCart?.countOfCart;
        dispatch(incrementCart(countOfCart));

        // adding the data on the mongodb data base through post request
        axios
          .post("/users", {
            userData,
          })
          .then(() => {message.info("Added to cart")})
          .catch((err) => message.info("Could Not Add To Cart"));

        sessionStorage.setItem("userInfo", JSON.stringify(userData));
      } else {
        let itemsInCart = userData.userCart.itemsInCart;
        let thereInCart = false;
        for (let i = 0; i < itemsInCart.length; i++) {
          if (
            itemsInCart[i]?._id === targetProduct?._id &&
            itemsInCart[i]?.selectedSize === checkSelectedSize
          ) {
            message.info("Same product is already there in cart");

            thereInCart = true;
          }
        }
        if (!thereInCart) {
          userData?.userCart?.itemsInCart?.push(targetProduct);
          userData.userCart.countOfCart += 1;
          let countOfCart = userData.userCart.countOfCart;
          dispatch(incrementCart(countOfCart));

          // adding the data on the mongodb data base through post request
          axios
            .post("/users", {
              userData,
            })
            .then(() => {message.info("Added to cart")})
            .catch((err) => message.info("Could Not Add To Cart"));

          sessionStorage.setItem("userInfo", JSON.stringify(userData));
        }
        sessionStorage.setItem("userInfo", JSON.stringify(userData));
      }

   
    }
  }

  const buyNowClick = () => {
    if (!loginCheck) {
      message.info("SignUp or LogIn First");
      sessionStorage.setItem(
        "loginPath",
        JSON.stringify(history.location.pathname)
      );
      history.push("/signUp");
    } else {
      incrementingTheCartCount();
      history.push("/cart");
    }
  };
  return (
    <>
      <section className="main-sectionProduct" id="main-section" key={targetProduct?._id}>
        <div className="img-divProduct" id="img-div">
          <img
            className="img-mainProduct"
            src={recentPic}
            alt="first medicine"
          />
        </div>
        <div className="body-partProduct">
          <h2 className="mainheadingProduct">{targetProduct?.productName}</h2>
          <h3>Price: {realproductPrice} ₹</h3>

          <div className="sizeProduct">
            <h4 className="headSizeProduct">Size</h4>
            {targetProduct?.size?.map(
              (size,index) => (
                // <div className="divSpanSizeProduct">
                <Button className="spanSizeProduct" onClick={() =>handleSizeClick(index)}>
                  {size}
                </Button>
              )
              // </div>
            )}
          </div>
          <h4>
            Selected Size{" "}
            <span className="selectedSizeDisplayed">{checkSelectedSize}</span>
          </h4>
          <div className="product-price-button-div">
            <h4 className="product-quantity">Qty :</h4>
            <div className="theDivWithButtonAndQuantity">
              <Button
                className="product-operatingQuantity"
                onClick={decrementQuantity}
              >
                -
              </Button>
              <span className="product-quantity-number">{quantity}</span>
              <Button
                className="product-operatingQuantity"
                onClick={incrementQuantity}
              >
                +
              </Button>
            </div>
          </div>

          <h4>Product Preview</h4>
          <div className="img-previewsProduct" id="img-preview">
            {targetProduct?.photos?.map((pic) => (
              <img
                className="img-preProduct"
                src={pic}
                onClick={(e) => setRecentPic(e.target.currentSrc)}
                alt="medicines"
              />
            ))}
          </div>
          <button
            className="add-buttonProduct"
            id="add-to-cart"
            onClick={buyNowClick}
          >
            BUY NOW
          </button>
          <button
            className="add-buttonProduct"
            id="add-to-cart"
            onClick={incrementingTheCartCount}
          >
            ADD TO CART
          </button>
          <h3 className="h3ProductInfo">Product ingredients</h3>
          <ol>
            {targetProduct?.productIngredients?.map((ingredients) => (
              <li>{ingredients}</li>
            ))}
          </ol>
          <h3 className="h3ProductInfo">Description</h3>
          <p className="descriptionProduct">{targetProduct?.description}</p>
          <h3 className="h3ProductInfo">Additional info</h3>
          <p className="descriptionProduct">{targetProduct?.additionalInfo}</p>
          <h3 className="h3ProductInfo">Direction for use</h3>
          <p className="descriptionProduct">{targetProduct?.directionForUse}</p>
        </div>
      </section>
    </>
  );
};

export default Product;
