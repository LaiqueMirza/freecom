import React from 'react';
import HomeImageTop from './homeImageTop/homeImageTop'
import HomeFirstBody from './homeFirstBody/homeFirstBody'
import './home.css'
import HomeCard from './homeCard/homeCard';
import CarouselImages from './carouselImages/CarouselImages';
import FeaturedProduct from '../product/featuredProduct/featuredProduct';

const Home = () => {
    return ( 
        <div className="homeDiv">
            <HomeImageTop />
            <FeaturedProduct />
            <CarouselImages />
            {/* <HomeFirstBody />
            <HomeCard /> */}
        </div>
     );
}
 
export default Home;