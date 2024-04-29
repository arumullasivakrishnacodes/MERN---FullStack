import React, { useContext } from "react";
import '../ProductTile/ProductTile.css';
import { NavLink } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

function ProductTile (props) {
    const product = props.product;
    const {addToWishlist} = useContext(ShopContext);

    const handleTiletoWishlist = (productID) => {
        addToWishlist(productID)
    }

    const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Optional, smooth scrolling animation
        });
    }

    return (
        <div className="productTile-main-container">
            <div className="product-details-container">
                <div className="tile-wishlist" onClick={() => {handleTiletoWishlist(product.id)}}><i class="bi bi-heart"></i></div>
                <NavLink to={`/product/${product.id}`}><img src={product.image} className="product-image" alt="product.name" onClick={handleScrollTop} /></NavLink>
                <p className="product-name">{product.name.length > 26 ? product.name.substring(0,26)+'...' : product.name}</p>
                <p className="product-price">₹ {product.new_price} <span className="strike-price">₹ {product.old_price}</span> <span className="discount-offer">30% Off</span></p>
            </div>
        </div>
    )
}

export default ProductTile;