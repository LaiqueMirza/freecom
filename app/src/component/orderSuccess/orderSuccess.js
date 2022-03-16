import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./orderSuccess.css";
import { Button } from "antd";

const OrderSuccess=()=> {
  useEffect(() => {
    const emailVal = JSON.parse(sessionStorage.getItem("userInfo"))
    setemailState(emailVal?.userInfo?.email);
  }, []);

  const [emailState, setemailState] = useState("");
  return (
    <div className='orderSuccessDiv'>
      <h1>THANK YOU!!</h1>
      <h3>Your order has been placed successfully</h3>
      <h3> We have mailed the details on <b>{emailState}</b></h3>
      <h3>go back to 
        <Link to="/" style={{marginLeft:"10px",
        
        cursor:"pointer", color: "black" }}>
       <Button>
       HOME
       </Button>
      </Link></h3>
    </div>
  )
}

export default OrderSuccess;