import React from 'react';
import { Link } from 'react-router-dom';
import './products.css';

// brand: "Puma"
// description: "Black solid sporty jacket, has a mock collar, 3 pockets, zip closure, long sleeves, straight hem, unlined lining"
// id: "2"
// isAccessory: false
// name: "Men Black MAMGP T7 Sweat Sporty Jacket"
// photos: Array(3)
// 0: "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/2060340/2017/9/14/11505387708574-Puma-Men-Black-Solid-Sporty-Jacket-371505387708496-1.jpg"
// 1: "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/2060340/2017/9/14/11505387708559-Puma-Men-Black-Solid-Sporty-Jacket-371505387708496-2.jpg"
// 2: "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/2060340/2017/9/14/11505387708542-Puma-Men-Black-Solid-Sporty-Jacket-371505387708496-3.jpg"
// length: 3
// __proto__: Array(0)
// preview: "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/2060340/2017/9/14/11505387708574-Puma-Men-Black-Solid-Sporty-Jacket-371505387708496-1.jpg"
// price: 7999
// size: Array(5)
// 0: 0
// 1: 0
// 2: 0
// 3: 1
// 4: 0
// length: 5

const Products = ({data}) => {
    return (     
    <div key={data._id}>

        <Link
            to="/product"
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={() => {
                sessionStorage.setItem("product", JSON.stringify(data))
            }}
          >
        <div className="card-clothing" >
        <img className="img-clothing" src={data.photos[0]} alt="" width="150px" />
        
        <h4 className="h4-clothing">{data.productName}</h4>
        <h5 className="brand-clothing">{data.brand}</h5>
        <h5 className="price-clothing">Rs {data.price}</h5>
        
        </div>
      </Link>
    </div> );
}
 
export default Products;