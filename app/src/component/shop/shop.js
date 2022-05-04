import React, { useEffect, useState } from "react";
import "./shop.css";
import Products from "../product/products/products";
import { Space } from 'antd'

const Shop = ({
  products,loading,fetchProducts,hasMore
}) => {


  return (
    <div className="shopDiv">
<section className="clothing-section">

<h3 className="header-clothing" style={{textAlign: 'center'}}>MEDICINES</h3>
      <Space direction="horizontal" wrap>
        
          {products?.map((product) => (
            <Products
            data={product} 
            />
            ))}
            </Space>
    

</section>
      
    </div>
  );
};

export default Shop;
