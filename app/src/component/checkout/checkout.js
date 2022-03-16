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
  //here i all make the user make an account mandatory*
  // i all put everyting in cart in his account cart and fetch the cart from his account

  // const cartProducts = JSON.parse(localStorage.getItem("theAddedItems"));
  // const [data, setData] = useState()
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
      (bagTotal = bagTotal + product.price*product.quantity);
    productIds.push(product?._id);
    productNames.push(product?.productName);
    selectedSizes.push(product?.selectedSize);
    quantities.push(product?.quantity);
    prices.push(product?.price);
    });
  totalAmount += bagTotal;
  let shippingCharge = 0;
  shippingCharge = bagTotal > 499 ? "FREE" : 30;
  if (typeof shippingCharge === "number") {
    totalAmount += shippingCharge;
  }

  // RAZORPAY PAYMENT -----------------------------------------------
 
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
    .then((val) => data=val?.data)
    .catch(err=> console.log(err));
// const datas = axios.post("/razorpay")
// .then(res => console.log(res))
// .catch(err=> console.log(err))


console.log(data,"fataaaaaaa");
    if(!data || !data.amount){
      if(data.message){
       message.info("Payment failed, User not Valid, Login Again.");
      }else if (data.error){
      message.info(data.error.error.description);
      }else{
        message.info("Payment Failed");
      }
      return;
    } 
    // else if(data.amount != totalAmount*100){
    //   message.info("Payment Failed, Amount error");
    //   return;
    // }
    
    //the above else if may be not a good practice
    const verifySignature = (response) => {
      axios
        .post(
          "/verifyPayment",
          response
        )
        .then(response => {
          message.info("payment received");
        })
        .catch(err => {
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
    paymentObject.open();
  }
const clearingCart =()=>{
userData.userCart.itemsInCart = [];
userData.userCart.countOfCart = 0;
console.log(userData, "clearing cart userData");
sessionStorage.setItem("userInfo", JSON.stringify(userData));

axios.post("/users",{
  userData, addUserOrder:true
}).then(res =>{
}).catch(err => console.log(err,"error in calling users"));

}
  const createNewOrder =()=>{
    let payload ={
      userPhoneNumber: userData?.userInfo?.phoneNumberMain,
      userName: userData?.userInfo?.userName,
      userId: userData?._id,
      productId: productIds,
      productName: productNames,
      selectedSize: selectedSizes,
      quantity:quantities,
      price: prices,
      onlinePayment: false,
      paymentStatus:"NOT DONE",
      totalAmount:totalAmount,
      deliveryAddress: {
        addressLine1: userData?.userAddress?.selectedAddress?.addressLine1,
        addressLine2: userData?.userAddress?.selectedAddress?.addressLine2,
        city: userData?.userAddress?.selectedAddress?.city,
        pinCode: userData?.userAddress?.selectedAddress?.pinCode.toString(),
        phoneNumberAddress: userData?.userAddress?.selectedAddress?.phoneNumberAddress.toString()
      },
    }
    console.log(payload,"payloaddd");
    // axios.post("/order",{
    //   payload
    // }).then(res =>{
    // }).catch(err =>message.info("Could not create an order"))

    axios
    .post("/order", {
     payload
    })
    .then((res) => {
      console.log(res,"order created");
    })
    .catch((err) => {
      console.log(err,"Could Not Add You, Try Again")
    });
    payload.orderDate = new Date();
    userData.userOrders.orderedItems.push(payload);
    // clear the cart
    clearingCart();
    history.push("/orderSuccess")

  }

console.log(userData,"userData");

return (
    <div className="checkoutMainDiv">
      <div className="checkoutDiv">
        <div className="checkout-cart-Div">
          {cartProducts?.map((product) => (
            <CheckoutCart
              targetProduct={product}
              key={product._id}
              // onClick={(e) => setRecentPic(e.target.currentSrc)}
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
          onClick={createNewOrder}

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
