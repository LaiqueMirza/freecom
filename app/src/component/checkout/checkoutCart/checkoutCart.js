import React, { useState } from 'react';
import './checkoutCart.css'
// import { useSelector, useDispatch } from 'react-redux';
// import { incrementCart, selectedSize } from '../../redux/action/index';
// import { set } from 'mongoose';

//here i all make the user make an account mandatory*
// i all put everyting in cart in his account cart and fetch the cart from his account 
//i all take the product from his account in the main cart
// then when user adds then i all do the post and update the quantity



const CheckoutCart = (props) => {
  const {targetProduct} = props;
    return ( 
        <section className="checkoutCart-main-sectionProduct" id="main-section">
         <div className="checkoutCart-img-divProduct" id="img-div">
    <img className="checkoutCart-img-mainProduct" src={targetProduct.photos[0]} alt="" />
  </div>
  <div className="checkoutCart-body-partProduct">
      <div className="checkoutCart-name-brand-div">
        <h4 className="checkoutCart-mainheadingProduct">
                {targetProduct.productName}
        </h4>
        <h4 className="checkoutCart-brandProduct">
        {targetProduct.brand}
        </h4>
      </div>
      <div className="checkoutCart-price-button-div">
      <h4 className="checkoutCart-size">
        Size : {targetProduct.selectedSize}
    </h4>
   
 
    <h4 className="checkoutCart-quantity">
        Qty : 
    </h4>
   
    <h4 className="checkoutCart-quantity-number">
    {targetProduct.quantity}
    </h4>
  
    </div>
    <h4 className="checkoutCart-price">
    ₹  {targetProduct.price}
    </h4>
  </div> 

  </section>

     );
}
 
export default CheckoutCart;