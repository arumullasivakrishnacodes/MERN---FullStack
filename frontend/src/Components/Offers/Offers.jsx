import React from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Offers/Offers.css';
import Menbanner from '../../Assets/Images/banner_mens.png';
import Womenbanner from '../../Assets/Images/banner_women.png';
import Kidsbanner from '../../Assets/Images/banner_kids.png';

function Offers () {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1024, // Breakpoint at 1024px
              settings: {
                slidesToShow: 1,
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
                arrows: false
              }
            },
            {
              breakpoint: 480, // Breakpoint at 480px
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
              }
            }
          ]
    };

    return (
        <div className="offers-main-container">
            <Slider {...settings}>
                <div className="offer-banner">
                    <img src={Menbanner} alt="" />
                </div>
                <div className="offer-banner">
                    <img src={Womenbanner} alt="" />
                </div>
                <div className="offer-banner">
                    <img src={Kidsbanner} alt="" />
                </div>
                {/* Add more slides as needed */}
            </Slider>
        </div>
    )
}

export default Offers;