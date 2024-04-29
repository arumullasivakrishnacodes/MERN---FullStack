import React from 'react';
import '../Navbar/Navbar.css';
import logo from '../../assets/Images/shop-bag-image.png';
import profile from '../../assets/Images/Login-profile-img.png'
import { Link } from 'react-router-dom';

const Navbar = () => {
  
  return (
    <div className='navbar-main-container'>
        <Link to='/'><div className="logo-container">
            <img src={logo} alt="" />
            <p>SHOP</p>
        </div></Link>
        <div className="profile-container">
            <img src={profile} alt="" />
            <i class="bi bi-chevron-down"></i>
        </div>
    </div>
  )
}

export default Navbar