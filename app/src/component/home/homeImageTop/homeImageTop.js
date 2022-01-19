import React from 'react';
import './homeImageTop.css';
import { Link } from 'react-router-dom';

const HomeImageTop = () => {
    return ( 
        <div className="homeImageTopFirstDiv">    
         {/* <div className="homeImageTopDiv">
            <div className="homeImageTopDivInner">
                <h2 className="homeImageTopH21">
                    SHOPPING WITH
                </h2>
                <h2 className="homeImageTopH2">STYLE</h2>
                <h4 className="homeImageTopH4">
                Whatever you’ve got in mind, we’ve got inside.
                </h4>
                <button className="homeImageTopButton">
                    <Link to="/shop"
                     style={{textDecoration:"none",color:"whitesmoke"}}
                    >
                        Shop Merch                   
                    </Link>
                </button>
            </div>
            </div> */}
            </div>
     );
}
 
export default HomeImageTop;