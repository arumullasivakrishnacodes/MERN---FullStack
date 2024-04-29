import React from 'react';
import '../ShopbyCategory/ShopbyCategory.css';
import tshirts from '../../Assets/Images/shopbycategory/t-shirts.jpg';
import footwear from '../../Assets/Images/shopbycategory/footwear.jpg';
import sarees from '../../Assets/Images/shopbycategory/sarees.jpg';
import modernwear from '../../Assets/Images/shopbycategory/modernwear.jpg';
import Accessories from '../../Assets/Images/shopbycategory/Accessories.jpg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ShopbyCategory = () => {
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
    <div className='shopbycategory-main-container'>
      <div className="heading-section">Shopby Category</div>
      <Slider {...settings}>
        <div className="shopbycategory-item">
          <img src={tshirts} alt="" />
          <p>T-shirts</p>
        </div>
        <div className="shopbycategory-item">
          <img src={sarees} alt="" />
          <p>Sarees</p>
        </div>
        <div className="shopbycategory-item">
          <img src={modernwear} alt="" />
          <p>Modern Wear</p>
        </div>
        <div className="shopbycategory-item">
          <img src={footwear} alt="" />
          <p>Foot Wear</p>
        </div>
        <div className="shopbycategory-item">
          <img src={Accessories} alt="" />
          <p>Accessories</p>
        </div>
      </Slider>
      
    </div>
  )
}

export default ShopbyCategory