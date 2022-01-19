import React, { useState } from "react";
import "./checkout.css";
import axios from "axios";
import CheckoutCart from "./checkoutCart/checkoutCart";
import Cookies from "js-cookie";

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
  let userData = JSON.parse(sessionStorage.getItem("userInfo"));
const cartProducts = userData.userCart.itemsInCart;
  let bagTotal = 0;
  let totalAmount = 0;
  {
    cartProducts?.map((product) => (bagTotal = bagTotal + product.price*product.quantity));
  }
  totalAmount += bagTotal;
  let shippingCharge = 0;
  shippingCharge = bagTotal > 20000 ? "FREE" : 50;
  if (typeof shippingCharge === "number") {
    totalAmount += shippingCharge;
  }

  // RAZORPAY PAYMENT -----------------------------------------------
 
  async function displayRazorpay() {
    alert("The online payment is integrated with razorpay. It is in test mode, so it won't charge you for real")
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Payment Failed");
      return;
    }

    const data = await fetch("/razorpay", {
      method: "POST",
    }).then((t) => t.json()).catch(err=> console.log(err));
// const datas = axios.post("/razorpay")
// .then(res => console.log(res))
// .catch(err=> console.log(err))
    if(!data || !data.amount){
      if(data.message){
       alert("Payment failed, User not Valid, Login Again.");
      }else if (data.error){
      alert(data.error.error.description);
      }else{
        alert("Payment Failed");
      }
      return;
    } else if(data.amount != totalAmount*100){
      alert("Payment Failed, Amount error");
      return;
    }
    
    //the above else if may be not a good practice
    const verifySignature = (response) => {
      axios
        .post(
          "/verifyPayment",
          response
        )
        .then(response => {
          alert("payment received");
        })
        .catch(err => {
        });
    }
  
    const options = {
      key: data.key,
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Mirza",
      description: "Thank you for shopping from us",
      // image: 'http://localhost:1337/logo.svg',
      handler: response => {
        verifySignature(response);
      },
      theme: {
        color: "indianred" // Set your website theme color
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
              <tr>
                <td>TAX & CHARGES</td>
                <td>:</td>
                <td>NO</td>
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
          onClick={() =>{
            alert("Thanks for making it till here, If you have any amazing functionality in mind do let me know through mail mirzalaique2ey@gmail.com.")
          }}
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
