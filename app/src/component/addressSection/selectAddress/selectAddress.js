import React, { useEffect, useState } from 'react';
import {useHistory} from "react-router-dom";
import axios from "axios";
import "./selectAddress.css";

const SelectAddress = () => {

const [onlineAddress, setOnlineAddress] = useState({});
const [addressLine1, setAddressLine1] = useState();
const [addressLine2, setAddressLine2] = useState();
const [city, setCity] = useState();
const [pinCode, setPinCode] = useState();
const [phoneNumber, setPhoneNumber] = useState();
useEffect(() =>{
  if(onlineAddress.length >= 1){
    setPinCode(onlineAddress[0].components.postcode);
    setCity(onlineAddress[0].components.county);
    setAddressLine2(onlineAddress[0].formatted);
  
  }
}, [onlineAddress])

const history = useHistory();

    const gettingCurrrentLocation =() =>{
        const succesfulLookup = position => {
            const { latitude, longitude } = position.coords;
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=7883e0b9b4c847018220014fa43a972c`)
            .then(res => res.json())
            .then(res => setOnlineAddress(res.results))
        }
        window.navigator.geolocation.getCurrentPosition(succesfulLookup,console.log)
    }

  const addressSubmit =(e) => {
    if(addressLine1 && addressLine2 && pinCode && city){
      let addressObject = {
        addressLine1,
        addressLine2,
        city,
        pinCode,
        phoneNumberAddress:phoneNumber,
      }
      let userData = JSON.parse(sessionStorage.getItem("userInfo"))  
      userData.userAddress.selectedAddress = addressObject;
      userData.userAddress.addresses.push(addressObject);
      axios.post("/users",{
        userData
      }).then(res =>{
      }).catch(err =>alert("Could Not Add The Address"))
      
        sessionStorage.setItem("userInfo", JSON.stringify(userData));
      history.push("/checkout")
    } else{
    alert("Fill All The Details Correctly")
  }
  }
    return ( <div className="addressDiv">
        <h2>Fill The Delivery Address</h2>
         <div 
         className="address-form"
        >
         <label className="address-label" htmlFor="addressLine1">Address Line 1*</label>
        <br></br>
        <input
          type="text"
          name="addressLine1"
          className="addressAddressLine1"
          required
          placeholder="Flat No., Building Name , Colony Name"
          value={addressLine1}
          onChange={(e) => setAddressLine1(e.target.value)}
        />
        <br></br>
        <label className="address-label" htmlFor="addressLine2">Address Line 2*</label>
        <br></br>
        <input
          type="text"
          name="addressLine2"
          className="addressAddressLine1"
          required
          placeholder="Nearby Area , Locality, City"
          value={addressLine2}
          onChange={(e) => setAddressLine2(e.target.value)}
        />
        <br></br>
       <label className="address-label" htmlFor="city">City*</label>
        <br></br>
        <input
          type="text"
          name="city"
          className="addressAddressLine1"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <br></br>
        <label className="address-label" htmlFor="pinCode">PinCode*</label>
        <br></br>
        <input
          type="number"
          name="pinCode"
          className="addressAddressLine1"
          required
          placeholder="400612"
          value={pinCode}
          onChange={(e) => setPinCode(parseInt(e.target.value))}
        />
        <br></br>
        <label className="address-label" htmlFor="phoneNumber">Phone Number (10 digit)</label>
        <br></br>
        <input
          type="number"
          name="phoneNumber"
          className="addressAddressLine1"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(parseInt(e.target.value))}
        />
        <br></br>
      
        <br></br>
        
        <input
        className="address-submitButton" 
        type="submit" 
        value="Submit"
        onClick={addressSubmit}
        />
    
      </div>
      <button
        className="address-getLocation" 

        onClick={gettingCurrrentLocation}
        >
            Get Location
        </button>
      {/* <Link
                to="/checkout"
                style={{ textDecoration: "none", color: "whitesmoke" }}
              >
        <button className="checkoutButton-address"
>PROCEED TO CHECKOUT
        </button>
              </Link> */}
    </div> );
}
 
export default SelectAddress;