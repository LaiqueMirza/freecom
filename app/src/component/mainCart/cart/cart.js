import React, { useState } from 'react';
import './cart.css'
import { useSelector, useDispatch } from 'react-redux';
import { incrementCart, selectedSize } from '../../redux/action/index';
import { set } from 'mongoose';

//here i all make the user make an account mandatory*
// i all put everyting in cart in his account cart and fetch the cart from his account 
//i all take the product from his account in the main cart
// then when user adds then i all do the post and update the quantity



const Cart = (props) => {
  const {targetProduct, removeItem} = props;
 
//     const removeItem=()=> {
// let userData = JSON.parse(sessionStorage.getItem("userInfo"));

//     }
    let shortBrand;
if(targetProduct.brand.length > 9){
  shortBrand = targetProduct.brand.substring(0,9)+"..";
} else{
  shortBrand = targetProduct.brand;
}
    return ( 
        <section className="cart-main-sectionProduct" id="main-section">
         <div className="cart-img-divProduct" id="img-div">
    <img className="cart-img-mainProduct" src={targetProduct.photos[0]} alt="" />
  </div>
  <div className="cart-body-partProduct">
      {/* <div className="cart-name-brand-div"> */}
        <h4 className="cart-mainheadingProduct">
                {targetProduct.productName}
        </h4>
      {/* </div> */}
      <div className="cart-size-button-div">
       <h4 className="cart-brandProduct">
        {shortBrand}
      </h4> 
      <h4 className="cart-size">
        Size : {targetProduct.selectedSize}
    </h4>
   
 
    <h4 className="cart-quantity">
        Qty : {targetProduct.quantity}
    </h4>
  
    </div>
    <div className="cart-price-remove-div">
      <h4 className="cart-price">
      ₹  {targetProduct.price}
      </h4>
      <button 
      className="cart-remove-button"
      onClick={() => removeItem(targetProduct._id, targetProduct.selectedSize)}
      >
        REMOVE
      </button>
    </div>
  </div> 

  </section>

     );
}
 
export default Cart;