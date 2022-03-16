import React from "react";
import { Link } from "react-router-dom";
import "./products.css";
import { Card, Row, Col } from "antd";
// {
//   productName:"ACIGONE CAPSULE",
//   productImage:
// "https://i.postimg.cc/W40sdf9J/ACIGONE-CAP.png",
//   photos: [
// "https://i.postimg.cc/W40sdf9J/ACIGONE-CAP.png",
//     "https://i.postimg.cc/QVLvpjYg/Guduchi-Satva.jpg",
//     "https://i.postimg.cc/PfmGjwC2/Abhrak-Bhasma-removebg-preview.png"
//   ],

//   description: "Hyperacidity, Dyspepsia, Flatulence,Heartburn,Improves appetite. Offers relief from hyperacidity. Relieves from gaseous distension. Relieves the symptoms of indigestion and improves appetite. Free from dryness of mouth by lowering acidity.",
//   size: ["30 Cap"],
//   types: "Capsules",
//   selectedSize:String,
//   price: 180,
//   productIngredients:["GUDUCHI SATVA :- It rectify in constipation and indigestion",
//   "ABHRAK BHASMA :- Improves digestion due to its Deepan (appetizer) and Pachan (digestive)"],
//   directionForUse:"Please consult your physician to prescribe the dosage that best suits the condition.",
//   additionalInfo:"Indications :- 1) Hyperacidity 2) Dyspepsia 3) Flatulence 4) Heartburn",
//   // manufacturedBy:String,

//   date: {
//     type: Date,
//     default: Date.now
//   }
// }

const Products = ({ data }) => {
  return (
    <Card bordered key={data._id}>
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
            alt=""
            width="150px"
            height="350px"
          />
          <hr/>
              <h4 className="h4-clothing">{data.productName}</h4>
              <p>
                {data.description}
              </p>
              <h5 className="price-clothing">{data.price} ₹</h5>
          {/* <Row className="productRow" justify="space-between">
            <Col>
            </Col>
            <Col>
            </Col>
          </Row> */}
        </div>
      </Link>
    </Card>
  );
};

export default Products;
