import React, { useState } from "react";
import "./cart.css";

//here i all make the user make an account mandatory*
// i all put everyting in cart in his account cart and fetch the cart from his account
//i all take the product from his account in the main cart
// then when user adds then i all do the post and update the quantity

const Cart = (props) => {
  const { targetProduct, removeItem } = props;
  return (
        <section className="checkoutCart-main-sectionProduct" id="main-section">
         <div className="checkoutCart-img-divProduct" id="img-div">
    <img className="checkoutCart-img-mainProduct" src={targetProduct?.photos[0]} alt="" />
  </div>
  <div className="checkoutCart-body-partProduct">
      <div className="checkoutCart-name-brand-div">
        <h4 className="checkoutCart-mainheadingProduct">
                {targetProduct?.productName}
        </h4>
      </div>
      <div className="checkoutCart-price-button-div">
      <h4 className="checkoutCart-size">
        SIZE : {targetProduct?.selectedSize}
    </h4>
   
 
    <h4 className="checkoutCart-quantity">
        QTY : 
    </h4>
   
    <h4 className="checkoutCart-quantity-number">
    {targetProduct?.quantity}
    </h4>
  
    </div>
    <h4 className="checkoutCart-price">
   TOTAL PRICE : {targetProduct?.totalPrice} ₹
    </h4>
        <div className="cart-price-remove-div">
          <button
            className="cart-remove-button"
            onClick={() =>
              removeItem(targetProduct?._id, targetProduct?.selectedSize)
            }
          >
            REMOVE
          </button>
        </div>
  </div> 
    </section>
  );
};

export default Cart;
