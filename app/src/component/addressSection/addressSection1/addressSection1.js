import React, { useEffect } from "react";
import "./addressSection1.css";
import axios from "axios";
import { useHistory } from "react-router";


const AddressSection1 = () => {
  const history = useHistory();

  useEffect(()=>{

    if(!addresses[0]){
      history.push("/addressNew")
    }
  },[])

  const selectedAddressClick= item =>{
    userData.userAddress.selectedAddress = item;

    axios.post("/users",{
      userData
    }).then(res =>{
    }).catch(err =>alert("Could Not Add The Address"))
      sessionStorage.setItem("userInfo", JSON.stringify(userData));
    history.push("/checkout")
  }

  let userData = JSON.parse(sessionStorage.getItem("userInfo"));
  let  addresses = userData.userAddress.addresses;

  return (
    <div className="addressSection1-Div"> 
      <h2 className="addressSection1-h2">Select An Address to deliver.</h2>
      {addresses && addresses[0] ? (
        addresses.map((item, index) => (
          <div key={index} 
          onClick={() => selectedAddressClick(item)}
          className="addressSection1-radioDiv">
            {/* <input
              type="radio"
              className="addressSection1-radio"
              name="selectAddress"
              value="email"
            />
            <label for="selectAddress"> */}
              <p>{item.addressLine1}</p>
              <p>{item.addressLine2}</p>
              <p>{item.pinCode}</p>
              <p>{item?.phoneNumber}</p>
            {/* </label> */}
          </div>
        ))
      ) : (
        <h2>there is no addresses add Your Address </h2>
      )}
      <div className="addressSection1-ButtonDiv">
        {/* <button type="submit" className="addressSection-button">
          Submit
        </button> */}
        <p>
          Click on one address above
        </p>
        <button className="addressSection-button"
        onClick={() => history.push("/addressNew")}
        >Add New Address</button>
      </div>
    </div>
  );
};

export default AddressSection1;
