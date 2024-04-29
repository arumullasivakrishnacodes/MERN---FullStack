import React from 'react';
import '../ShopbyGender/ShopbyGender.css';
import MenImg from '../../Assets/Images/men-image.jpg';
import WomenImg from '../../Assets/Images/women-image.jpg';
import KidsImg from '../../Assets/Images/kids-image.jpg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const ShopbyGender = () => {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1024, // Breakpoint at 1024px
              settings: {
                slidesToShow: 2,
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
    <div className='shopbygender-main-container'>
        <div className="heading-section">Shopby Gender</div>
        <Slider {...settings}>
            <Link to='/men'><img src={MenImg} alt="" /></Link>
            <Link to='/women'><img src={WomenImg} alt="" /></Link>
            <Link to='/kids'><img src={KidsImg} alt="" /></Link>
        </Slider>
    </div>
  )
}

export default ShopbyGender