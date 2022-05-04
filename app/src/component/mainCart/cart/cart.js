import React, { useState } from "react";
import "./cart.css";


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
