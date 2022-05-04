import React, { useState } from "react";
import "./checkout.css";
import axios from "axios";
import CheckoutCart from "./checkoutCart/checkoutCart";
import Cookies from "js-cookie";
import {useHistory} from "react-router-dom";
import logoImage from '../../img/CompanyLogo.jpeg';
import { message } from "antd";

//i all take the product from his account in the main cart

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const Checkout = () => {
 
  const getCookie = Cookies.get();
const history = useHistory();

  let userData = JSON.parse(sessionStorage.getItem("userInfo"));
const cartProducts = userData.userCart.itemsInCart;
  let bagTotal = 0;
  let totalAmount = 0;
  let productIds=[];
  let productNames=[];
  let selectedSizes=[];
  let quantities=[];
  let prices=[];
    cartProducts?.map((product) => {
      (bagTotal = bagTotal + product.totalPrice);
    productIds.push(product?._id);
    productNames.push(product?.productName);
    selectedSizes.push(product?.selectedSize);
    quantities.push(product?.quantity);
    prices.push(product?.totalPrice);
    });
  totalAmount += bagTotal;
  let shippingCharge = 0;
  shippingCharge = bagTotal > 499 ? "FREE" : 30;
  if (typeof shippingCharge === "number") {
    totalAmount += shippingCharge;
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      message.info("Payment Failed");
      return;
    }

    let data;
     await axios.post("/razorpay", {
      totalAmount: totalAmount,
    })
    .then((val) => {
      data=val?.data
    })
    .catch(err=> {
      message.error("Error in performing online payment")
    });



    if(!data){
      if(data?.message){
       message.info("User not valid, login again.");
      }
        message.info("Payment Failed");
      return;
    } 
   
    const verifySignature = (response) => {
      axios
        .post(
          "/verifyPayment",
          response
        )
        .then(response => {
          const paymentId = JSON.parse(response.config.data).razorpay_payment_id;
          message.info("payment received");
          createNewOrder(paymentId);
        })
        .catch(err => {
        message.info("Payment Failed");
        return;
        });
    }
  
    const options = {
      key: data.key,
      currency: "INR",
      amount: totalAmount.toString(),
      order_id: data.id,
      name: "AMRUTTAM TATTVA",
      description: "Thank you for shopping from us",
       image: logoImage,
      handler: response => {
        verifySignature(response);
      },
      theme: {
        color: "#61CA59" // Set your website theme color
      },
      prefill: {
        name: userData.userInfo.userName,
        email:userData.userInfo.email,
        contact:userData.userInfo.phoneNumberMain,
      },
    };
    const paymentObject = new window.Razorpay(options);
   
    paymentObject.on('payment.failed', function(res) {
      message.info("Payment Failed");
    });
    paymentObject.open();
  }
const clearingCart =(order_id)=>{
userData.userCart.itemsInCart = [];
userData.userCart.countOfCart = 0;
let arrOrder = userData.userOrders;
arrOrder.push(order_id);
userData.userOrders = arrOrder;
// userData.userOrders.push(order_id);
sessionStorage.setItem("userInfo", JSON.stringify(userData));

axios.post("/users",{
  userData, addUserOrder:true
}).then(res =>{
}).catch(err => message.error("Error in updating user"));

}
  const createNewOrder = async (onlinePayment_Id)=>{
    let payload ={
      userPhoneNumber: userData?.userInfo?.phoneNumberMain,
      userName: userData?.userInfo?.userName,
      userEmail: userData?.userInfo?.email,
      userId: userData?._id,
      productId: productIds,
      productName: productNames,
      selectedSize: selectedSizes,
      quantity:quantities,
      price: prices,
      onlinePayment_Id: onlinePayment_Id,
      paymentStatus: onlinePayment_Id?"DONE":"NOT DONE",
      totalAmount:totalAmount,
      deliveryAddress: {
        addressLine1: userData?.userAddress?.selectedAddress?.addressLine1,
        addressLine2: userData?.userAddress?.selectedAddress?.addressLine2,
        city: userData?.userAddress?.selectedAddress?.city,
        pinCode: userData?.userAddress?.selectedAddress?.pinCode.toString(),
        phoneNumberAddress: userData?.userAddress?.selectedAddress?.phoneNumberAddress.toString()
      },
    }
let order_id;
    axios
    .post("/order", {
     payload
    })
    .then(async (res) => {
      await res.data._id;
      order_id = res.data._id;
      await clearingCart(order_id);
      history.push("/orderSuccess");
      window.location.reload();
    })
    .catch((err) => {
      message.error(err,"Could Not Add You, Try Again")
    });
    

  }


return (
    <div className="checkoutMainDiv">
      <div className="checkoutDiv">
        <div className="checkout-cart-Div">
          {cartProducts?.map((product) => (
            <CheckoutCart
              targetProduct={product}
              key={product._id}
            />
          )) || <h2>There is no product added to cart go to shop</h2>}
        </div>

        <div className="checkouprice-summary">
          <h3 className="checkoutH3">PRICE SUMMARY</h3>
          <table className="checkout-table">
            <thead>
              <tr>
                <th>BAG TOTAL</th>
                <th>:</th>
                <th>{bagTotal}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SHIPPING CHARGES</td>
                <td>:</td>
                <td>{shippingCharge}</td>
              </tr>
             
            </tbody>
            <thead>
              <tr>
                <th>TOTAL PAYABLE</th>
                <th>:</th>
                <th>{totalAmount}</th>
              </tr>
            </thead>
          </table>
          <button
            onClick={displayRazorpay}
            className="checkoutButton-checkout-pay"
          >
            PAY ONLINE
          </button>
          <button className="checkoutButton-checkout-cod"
          onClick={() => createNewOrder("")}

          >
            CASH ON DELIVERY
          </button>
          <hr/>
          <div className="mainCart-selectedAddress">
            <h3>Delivery Address</h3>
            <p>{userData.userAddress.selectedAddress.addressLine1}</p>
            <p>{userData.userAddress.selectedAddress.addressLine2}</p>
            <p>{userData.userAddress.selectedAddress.pinCode}</p>
            <p>{userData.userAddress.selectedAddress?.phoneNumber}</p>
      </div>
        </div>
        
      </div>
    </div>
  );
};

export default Checkout;
