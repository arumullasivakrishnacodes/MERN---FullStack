import React from "react";
import '../TopSellers/TopSellers.css';
import new_collections from '../../Assets/Data/new_collections';
import ProductTile from '../ProductTile/ProductTile';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Offers/Offers.css';

function TopSellers () {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1024, // Breakpoint at 1024px
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: false
              }
            },
            {
              breakpoint: 768, // Breakpoint at 768px
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                centerMode: true,
                centerPadding: '60px',
              }
            },
          ]
    };

    return (
      <div className="topsellers-main-component">
        <div className="heading-section">Top Sellers</div>
        <Slider {...settings}>
          {new_collections.map((product) => {
            return <ProductTile product={product} />;
          })}
        </Slider>
      </div>
    );
}

export default TopSellers;