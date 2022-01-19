import React from 'react';
import HomeImageTop from './homeImageTop/homeImageTop'
import HomeFirstBody from './homeFirstBody/homeFirstBody'
import './home.css'
import HomeCard from './homeCard/homeCard';
import FeaturedProduct from '../product/featuredProduct/featuredProduct';
import Footer from '../footer/footer'

const Home = () => {
    return ( 
        <div className="homeDiv">
            <HomeImageTop />
            <HomeFirstBody />
            <HomeCard />
            <FeaturedProduct />
            <Footer />
        </div>
     );
}
 
export default Home;