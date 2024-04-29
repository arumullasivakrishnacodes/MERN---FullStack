import React from "react";
import Offers from "../Components/Offers/Offers";
import TopSellers from "../Components/TopSellers/TopSellers";
import ShopbyGender from "../Components/ShopbyGender/ShopbyGender";
import ShopbyCategory from "../Components/ShopbyCategory/ShopbyCategory";

function Home () {
    return (
        <div className="home-page-main-container">
            <Offers />
            <ShopbyCategory />
            <TopSellers />
            <ShopbyGender />
        </div>
        
    )
}

export default Home;