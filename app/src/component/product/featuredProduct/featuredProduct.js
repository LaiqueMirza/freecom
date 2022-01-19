
import React from 'react';
import { Link } from "react-router-dom";
import "./featuredProduct.css";


const FeaturedProduct = () => {

  
  return (
    <div className="featuredProductDiv">
      <h2 className="featuredProducth2">PRODUCTS</h2>
      <br/>
      <div className="featuredProductDiv2">
        <div className="featuredProductCard">
        <Link
            to="/shop"
            style={{ textDecoration: "none", color: "black" }}
          >
          <div className="productImageMainDiv">
            <img
              className="productImageMain"
              src="https://img.simplydresses.com/_img/SDPRODUCTS/2212604/1000/navy-dress-SOI-M17756-c.jpg"
              alt="product image"
            />
          </div>
          </Link>
        </div>
        <div className="featuredProductCard">
          <Link
            to="/shop"
            style={{ textDecoration: "none", color: "black" }}
          > 
          
          <div className="productImageMainDiv">
          <img
              className="productImageMain"
              src="https://i.pinimg.com/originals/ec/85/d1/ec85d1aa08a6194d31542066b2e270dc.jpg"
              alt="product image"
            />
          </div>
          </Link>
        </div>
        <div className="featuredProductCard">
          <Link
            to="/shop"
            style={{ textDecoration: "none", color: "black" }}
          >
          <div className="productImageMainDiv">
             <img
              className="productImageMain"
              src="https://i.pinimg.com/564x/bd/3e/30/bd3e300ebf15e44d251f462ee932259d.jpg"
              alt="product image"
            />
            
          </div>
          </Link>
        </div>
      </div>
      <Link
            to="/shop"
            style={{ textDecoration: "none", color: "black" }}
          >
             <button className="featuredProductButton">View All Products</button>
      </Link>
    </div>
  );
};

export default FeaturedProduct;
