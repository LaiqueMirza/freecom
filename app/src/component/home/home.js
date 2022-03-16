import React from 'react';
import CarouselImages from './carouselImages/CarouselImages';
import ReviewsHome from './ReviewsHome/reviewsHome';
import homeImage from '../../img/aboutFirst.jpg';
import './home.css';
;

const Home = () => {
    return ( 
        <div className="homeDiv">
        <div  className="homeImageTopFirstDiv">    
        <img  className="homeImageTopFirst" src={homeImage} alt="banner img" />
</div>
            <ReviewsHome />
        </div>
     );
}
 
export default Home;