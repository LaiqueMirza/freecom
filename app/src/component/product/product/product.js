import React, { useEffect, useState } from 'react';
import './product.css'
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { incrementCart, selectedSize } from '../../redux/action/index';
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom'

const Product = () => {

  const [loginCheck, setLoginCheck] = useState(false);

  const [checkSelectedSize,setCheckSelectedSize] = useState("")
  const[targetProduct, setTargetProduct] = useState(JSON.parse(sessionStorage.getItem("product")))
  const [quantity, setQuantity] = useState(targetProduct?.quantity);
  const history = useHistory();

  const incrementQuantity =() => {
    if(quantity >= 10) {
      alert("You can't add more than 10");
      return;
    }
    
    setQuantity(quantity + 1);
  }
  const decrementQuantity =() => {
    if(quantity <= 1) {
      return;
    }
    setQuantity(quantity - 1);
  }
  if(quantity){
    targetProduct.quantity = quantity;
  }
  const dispatch= useDispatch();
  useEffect(() => {
    setLoginCheck(JSON.parse(sessionStorage?.getItem("login")));
  },[])


    const handleSizeClick =(e) => {
      let selectSize = e.target.innerHTML
      setTargetProduct({...targetProduct, selectedSize: selectSize});
      setCheckSelectedSize(selectSize);

    }
    
    const [recentPic, setRecentPic] = useState(targetProduct?.photos[1])

      function incrementingTheCartCount() {
        if(!loginCheck){

          alert("SignUp or LogIn First");
  sessionStorage.setItem("loginPath", JSON.stringify(history.location.pathname));

          history.push("/signUp")

  //      let countOfCart = JSON.parse(localStorage.getItem("countOfCart"));
       
        
    
  //   // ---------------------------
    
  //   // making the local storage if it is not there
  //   // console.log(localStorage.getItem("theAddedItems"))
  //   if(!localStorage.getItem("theAddedItems")) {
  //   let theAddedItems = [];
  //     theAddedItems.push(targetProduct);
  //     countOfCart = countOfCart + 1;
  //     countOfCart = JSON.stringify(countOfCart)
  //     localStorage.setItem("countOfCart", countOfCart);
  //     countOfCart = JSON.parse(localStorage.getItem("countOfCart"));
  //     dispatch(incrementCart(countOfCart));
     
  //       console.log("Setting the local Storage Cart",targetProduct)
  //       console.log(theAddedItems,targetProduct)
  //     theAddedItems = JSON.stringify(theAddedItems);
  //   localStorage.setItem("theAddedItems", theAddedItems) ;
    
  //   } else{
  //   //parsing the local storage if the item is not there thanupadting
  //   let theAddedItems = JSON.parse(localStorage.getItem("theAddedItems"))
  //   // console.log(theAddedItems[0].id,"id")
  //   const lengthOfItemsInCart = theAddedItems.length;
  //   let thereInCart = false
  //   for(let i = 0; i< lengthOfItemsInCart; i++){
  //     if(theAddedItems[i]._id === targetProduct?._id && theAddedItems[i].selectedSize === checkSelectedSize){
  //       console.log("Product Is already there in cart");
  //       alert("Same Item is already There in Cart")

  //       // console.log(checkSelectedSize)
  //       // console.log(theAddedItems[i].selectedSize)
  //       // console.log(theAddedItems[i].id)
  //       // console.log(targetProduct?.id)
  //       thereInCart = true;
  //     }
  //   }
  //   if(!thereInCart){
  //     theAddedItems.push(targetProduct);
  //     console.log("Product Added  as it was not there in cart")
   
  //     countOfCart = countOfCart + 1;
  //     countOfCart = JSON.stringify(countOfCart)
  //     localStorage.setItem("countOfCart", countOfCart);
  //     countOfCart = JSON.parse(localStorage.getItem("countOfCart"));
  //     dispatch(incrementCart(countOfCart));
  //     console.log(countOfCart)
  //   }
  //   theAddedItems = JSON.stringify(theAddedItems);
  //   localStorage.setItem("theAddedItems", theAddedItems) 
    
  //       console.log(theAddedItems)
  // }
        
} else {

let userData = JSON.parse(sessionStorage.getItem("userInfo"))  

if(userData.countOfCart === 0) {
  // let userModified = 
  userData.userCart.itemsInCart.push(targetProduct);
  userData.userCart.countOfCart+=1;
  let countOfCart = userData?.userCart?.countOfCart;
  dispatch(incrementCart(countOfCart));

  // adding the data on the mongodb data base through post request
axios.post("/users",{
  userData
}).then(()=>{}).catch(err =>alert("Could Not Add To Cart"))

  sessionStorage.setItem("userInfo", JSON.stringify(userData));
} else{
  let itemsInCart =  userData.userCart.itemsInCart;
  let thereInCart = false
    for(let i = 0; i< itemsInCart.length; i++){
  
      if(itemsInCart[i]?._id === targetProduct?._id && itemsInCart[i]?.selectedSize === checkSelectedSize){
        alert("Same product is already there in cart")
     
        thereInCart = true;
      }
    }
    if(!thereInCart){
      userData?.userCart?.itemsInCart?.push(targetProduct);
  userData.userCart.countOfCart+=1;
  let countOfCart = userData.userCart.countOfCart;
  dispatch(incrementCart(countOfCart));

  // adding the data on the mongodb data base through post request
  axios.post("/users",{
    userData
}).then(() =>{}).catch(err =>alert("Could Not Add To Cart"))


  sessionStorage.setItem("userInfo", JSON.stringify(userData));

    }
  sessionStorage.setItem("userInfo", JSON.stringify(userData));

}

//   let countOfCart = JSON.parse(localStorage.getItem("countOfCart"));

//   // ---------------------------
  
//   // making the local storage if it is not there
//   // console.log(localStorage.getItem("theAddedItems"))
//   if(!localStorage.getItem("theAddedItems")) {
//   let theAddedItems = [];
//     theAddedItems.push(targetProduct);
//     countOfCart = countOfCart + 1;
//     countOfCart = JSON.stringify(countOfCart)
//     localStorage.setItem("countOfCart", countOfCart);
//     countOfCart = JSON.parse(localStorage.getItem("countOfCart"));
//     dispatch(incrementCart(countOfCart));
   
//       console.log("Setting the local Storage Cart",targetProduct)
//       console.log(theAddedItems,targetProduct)
//     theAddedItems = JSON.stringify(theAddedItems);
//   localStorage.setItem("theAddedItems", theAddedItems) ;
  
//   } else{
//   //parsing the local storage if the item is not there thanupadting
//   let theAddedItems = JSON.parse(localStorage.getItem("theAddedItems"))
//   // console.log(theAddedItems[0].id,"id")
//   const lengthOfItemsInCart = theAddedItems.length;
//   let thereInCart = false
//   for(let i = 0; i< lengthOfItemsInCart; i++){
//     if(theAddedItems[i]._id === targetProduct?._id && theAddedItems[i].selectedSize === checkSelectedSize){
//       console.log("Product Is already there in cart")
//       console.log(checkSelectedSize)
//       console.log(theAddedItems[i].selectedSize)
//       thereInCart = true;
//     }
//   }
//   if(!thereInCart){
//     theAddedItems.push(targetProduct);
//     console.log("Product Added  as it was not there in cart")
 
//     countOfCart = countOfCart + 1;
//     countOfCart = JSON.stringify(countOfCart)
//     localStorage.setItem("countOfCart", countOfCart);
//     countOfCart = JSON.parse(localStorage.getItem("countOfCart"));
//     dispatch(incrementCart(countOfCart));
//     console.log(countOfCart)
//   }
//   theAddedItems = JSON.stringify(theAddedItems);
//   localStorage.setItem("theAddedItems", theAddedItems) 
  
//       console.log(theAddedItems)
// }
     
}
      }
    //   cart inner html will be count of cart

   const buyNowClick =() => {
    if(!loginCheck){

      alert("SignUp or LogIn First");
  sessionStorage.setItem("loginPath", JSON.stringify(history.location.pathname));
      history.push("/signUp")
    }else{
    incrementingTheCartCount();
    history.push("/cart")
    }
   }
return (<>
    <section className="main-sectionProduct" id="main-section">
         <div className="img-divProduct" id="img-div">
    <img className="img-mainProduct" src={recentPic} alt="" />
  </div>
  <div className="body-partProduct">
    <h2 className="mainheadingProduct">
            {targetProduct?.productName}
    </h2>
    <h4 className="brandProduct">
    {targetProduct?.brand}
    </h4>
    <h4>
        Price: Rs {targetProduct?.price}
    </h4>
    
    <h4>
        Product Preview
    </h4>
    <div className="img-previewsProduct" id="img-preview">
        {targetProduct?.photos?.map((pic) =>
            
        <img 
        className="img-preProduct" 
        src={pic}
        onClick={(e) => setRecentPic(e.target.currentSrc)}
        />
        
            )}
    </div>
    <div className="sizeProduct">
      <h4  className="headSizeProduct">
        Size 
        </h4>
          {targetProduct?.size?.map(size => 
        // <div className="divSpanSizeProduct">
          <h4 className="spanSizeProduct"
          onClick={handleSizeClick}
          >
            {size}
         </h4>
        // </div>
        )}
    </div>
    { checkSelectedSize ? <h4>Selected Size 
      <span className="selectedSizeDisplayed" >{checkSelectedSize}</span></h4> : <h4>Select Size First</h4>}
    <div className="product-price-button-div">
   
    <h4 className="product-quantity">
        Qty : 
    </h4>
   
    <button 
    className="product-operatingQuantity"
    onClick={decrementQuantity}
    >
        -
    </button>
    <h4 className="product-quantity-number">
    {quantity}
    </h4>
    <button 
    className="product-operatingQuantity" 
    onClick={incrementQuantity}

    >
       +
    </button>
    </div>

    { checkSelectedSize ? 
    <button 
       
    className="add-buttonProduct" 
    id="add-to-cart"
    onClick={buyNowClick}
    >
        BUY NOW
    </button>
    :
    <button 
    disabled
    className="add-buttonDisabledProduct" 
    >
        BUY NOW
    </button>
    }
    { checkSelectedSize ? 
    <button 
       
    className="add-buttonProduct" 
    id="add-to-cart"
    onClick={incrementingTheCartCount}
    >
        ADD TO CART
    </button>
    :
    <button 
    disabled
    className="add-buttonDisabledProduct" 
    >
        ADD TO CART
    </button>
    }
    <h4>
        Description
    </h4>
    <p className="descriptionProduct">
        {targetProduct?.description}
    </p>
  </div> 

  </section>



  </>);

}
 
export default Product;