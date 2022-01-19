import React from "react";
import "./homeCard.css";
import rectangle from "../../../img/rectangle.svg";
import circle from "../../../img/circle.svg";
import triangle from "../../../img/triangle.svg";

const HomeCard = () => {
  return (
    <div className="homeCardDiv">
      <div className="homeCardDivCard1">
        <div className="homeCardDivCardBlack">
          <h3 className="homeCardNum">01</h3>
          <h3 className="homeCardName">FIND</h3>
          <h3 className="homeCardName">IT</h3>
          <img className="homeCardImg" src={rectangle} alt="rectangle svg" />
        </div>
        <p className="homeCardP">
          Comfort, Quality, Satisfaction are our priority 
        </p>
      </div>
      <div className="homeCardDivCard1">
        <div className="homeCardDivCardBlack">
          <h3 className="homeCardNum">02</h3>
          <h3 className="homeCardName">LOVE</h3>
          <h3 className="homeCardName">IT</h3>
          <img className="homeCardImg" src={circle} alt="rectangle svg" />
        </div>
        <p className="homeCardP">
         if you can't stop thinking about it, you love it
        </p>
      </div>
      <div className="homeCardDivCard1">
        <div className="homeCardDivCardBlack">
          <h3 className="homeCardNum">03</h3>
          <h3 className="homeCardName">BUY</h3>
          <h3 className="homeCardName">IT</h3>
          <img className="homeCardImg" src={triangle} alt="rectangle svg" />
        </div>
        <p className="homeCardP" >
         Nothing haunts us like the thing we didin't buy
        </p>
      </div>
    </div>
  );
};

export default HomeCard;
