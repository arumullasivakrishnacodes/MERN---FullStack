import React, { useContext, useEffect, useState } from "react";
import '../Navbar/Navbar.css';
import { NavLink, Link } from 'react-router-dom'
import cartIcon from '../../Assets/Images/cart-icon.png';
import wishlistIcon from '../../Assets/Images/wishlist-icon.png'
import profileIcon from '../../Assets/Images/profile-icon.png';
import searchIcon from '../../Assets/Images/search-icon.png';
import MicImg from '../../Assets/Images/mic-image.png'
import { ShopContext } from "../../Context/ShopContext";
import BagIcon from '../../Assets/Images/shop-bag-image.png';
import TopSellers from '../TopSellers/TopSellers'
import ProductTile from "../ProductTile/ProductTile";

function Navbar () {
    const {ProductsData} = useContext(ShopContext)
    const {cartItemsCount, wishlistItemsCount} = useContext(ShopContext);
    const [searchenabled, setSearchEnabled] = useState(false);
    const [searchinpvalue, setSearchinpValue] = useState('');
    const [hamburgerOpen, setHamburhetOpen] = useState(false);
    const [searchResults, setSearchResults] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const handleSearchEnable = () => {
        setSearchEnabled(!searchenabled);
    }

    const handleSearchKeywords = (e) => {
        setSearchinpValue(e.target.value);
    }

    const handleHamburger = () => {
        setHamburhetOpen(!hamburgerOpen)
    }

    const searchCategoryClick = () => {
        setSearchEnabled(!searchenabled)
    }

    useEffect(() => {
        if (searchinpvalue.length < 3) {
            setSearchResults(false);
        } else {
            setSearchResults(true);
            // Introducing a delay before filtering products
            setTimeout(() => {
                const enteredKeyword = searchinpvalue.toLowerCase();
                const searchRelatedProducts = ProductsData.filter(product => product.name.toLowerCase().includes(enteredKeyword));
                setFilteredProducts(searchRelatedProducts);
            }, 1000); // Adjust the delay time as needed
        }
    }, [searchinpvalue, ProductsData]);

    return (
        <>
        <div className="navbar-main-container row d-none d-lg-flex">
            <NavLink to="/"><div className="logo-container col-3"><span><img src={BagIcon} alt="" /></span>SHOP</div></NavLink>
            <div className="navbar-category-container col-4">
                <NavLink to='/men'><div className="category">Men</div></NavLink>
                <NavLink to='/women'><div className="category">Women</div></NavLink>
                <NavLink to='/kids'><div className="category">Kids</div></NavLink>
            </div>
            <div className="nav-icons-container col-5">
                <img src={searchIcon} onClick={handleSearchEnable} alt="" />
                <NavLink to="/profile"><img src={profileIcon} alt="profile" /></NavLink>
                <NavLink to="/wishlist"><img src={wishlistIcon} alt="wishlist" /><span className="wishlist-count">{wishlistItemsCount}</span></NavLink>
                <NavLink to="/cart"><img src={cartIcon} alt="cart" /><span className="cart-count">{cartItemsCount}</span></NavLink>
            </div>
        </div>

        
        <div className={`search-popup-container ${searchenabled ? '' : 'd-none'}`}>
            <div className="search-engine-components">
                <div className="popupclose" onClick={handleSearchEnable}><i class="bi bi-x"></i></div>
                <div>
                    <input className="main-search-input" type="text" placeholder="Search for products ..." value={searchinpvalue}  onChange={handleSearchKeywords}/>
                    <img className="mic-image" src={MicImg} alt="" />
                </div>
                <div className={`search-top-sellers-container ${!searchResults ? '': 'd-none'}`}>
                    <div className="category-section-main">
                        <div className="heading">Categories</div>
                        <div className="category-section">
                            <Link to='/men' onClick={searchCategoryClick}><div className="category">Men</div></Link>
                            <Link to='/women' onClick={searchCategoryClick}><div className="category">Women</div></Link>
                            <Link to='/kids' onClick={searchCategoryClick}><div className="category">Kids</div></Link>
                        </div>
                    </div>
                    <TopSellers />
                </div>
                <div className={`search-top-sellers-container ${searchResults ? '': 'd-none'}`}>
                    <div className="category-section-main">
                        <div className="heading">Categories</div>
                        <div className="category-section">
                            <Link to='/men' onClick={searchCategoryClick}><div className="category">Men</div></Link>
                            <Link to='/women' onClick={searchCategoryClick}><div className="category">Women</div></Link>
                            <Link to='/kids' onClick={searchCategoryClick}><div className="category">Kids</div></Link>
                        </div>
                    </div>
                    <div className={`search-related-products-container ${filteredProducts.length > 0 ? '' : 'd-none'}`}>
                        <div className="heading">Related Products</div>
                        <div className={`related-products-container`}>
                            {
                                filteredProducts.slice(0,4).map((product,index) => {
                                    return <ProductTile product={product} key={index} />
                                })
                            }
                        </div>
                    </div>
                </div>
                
            </div>
        </div>


        <div className="mobile-navbar-main-container-top d-lg-none">
            <div className="col-1 hamburger-menu" onClick={handleHamburger}><i className={`bi bi-list ${hamburgerOpen ? 'd-none' : ''}`}></i> <i className={`bi bi-x ${hamburgerOpen ? '' : 'd-none'}`}></i></div>
            <NavLink to="/"><div className="col-5 nav-bar-logo" ><img src={BagIcon} alt="" /> <span>SHOP</span></div></NavLink>
            <div className="col-6 nav-icons">
                <img src={searchIcon} onClick={handleSearchEnable} alt="" />
                <NavLink to="/wishlist"><img src={wishlistIcon} alt="wishlist" /><span className="wishlist-count">{wishlistItemsCount}</span></NavLink>
                <NavLink to="/cart"><img src={cartIcon} alt="cart" /><span className="cart-count">{cartItemsCount}</span></NavLink>
            </div>
        </div>

        <div className={`hamburgermenu-main-container ${hamburgerOpen ? 'hamburger-active' : ''}`}>
            <NavLink to="/men"><div className="hamburger-category" onClick={handleHamburger}>Men</div></NavLink>
            <NavLink to="/women"><div className="hamburger-category" onClick={handleHamburger}>Women</div></NavLink>
            <NavLink to="/kids"><div className="hamburger-category" onClick={handleHamburger}>Kids</div></NavLink>
        </div>

        <div className="mobile-navbar-main-container-bottom d-lg-none">
        <NavLink to="/"><div className="mobile-below-menu">
                <img src={BagIcon} alt="" />
                <p>Home</p>
            </div></NavLink>
            <div className="mobile-below-menu">
                <i class="bi bi-lightning"></i>
                <p>Trends</p>
            </div>
            <div className="mobile-below-menu">
            <i class="bi bi-gift-fill"></i>
                <p>Offers</p>
            </div>
            <div className="mobile-below-menu">
            <i class="bi bi-shop"></i>
                <p>Store</p>
            </div>
            <NavLink to="/profile"><div className="mobile-below-menu">
                <img src={profileIcon} alt="" />
                <p>Login</p>
            </div></NavLink>
        </div>
        </>
    )
}

export default Navbar;