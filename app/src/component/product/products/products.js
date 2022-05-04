import React from "react";
import { Link } from "react-router-dom";
import "./products.css";
import { Card, Row, Col } from "antd";


const Products = ({ data }) => {
  return (
    <Card bordered key={data._id} className="productMainCard">
      <Link
        to="/product"
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={() => {
          sessionStorage.setItem("product", JSON.stringify(data));
        }}
      >
        <div className="card-clothing">
          <img
            className="img-clothing"
            src={data.photos[0]}
            alt="product"
        
          />
          <hr/>
              <h4 className="h4-clothing">{data.productName}</h4>
              <p className="productDescription">
                {data.description}
              </p>
              <h5 className="price-clothing">{data.totalPrice} ₹</h5>
          
        </div>
      </Link>
    </Card>
  );
};

export default Products;
