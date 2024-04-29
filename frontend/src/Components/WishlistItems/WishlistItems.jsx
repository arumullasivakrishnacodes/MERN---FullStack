import React, { useContext } from "react";
import '../WishlistItems/WishlistItems.css';
import { ShopContext } from "../../Context/ShopContext";
import ProductTile from "../ProductTile/ProductTile";
import HeartIcon from '../../Assets/Images/heart-icon.png';
import {Link} from 'react-router-dom'

function WishlistItems () {
    const {wishListItems, removeWishlistItem, addToCart, wishlistItemsCount} = useContext(ShopContext);

    async function removeFromWishlist (productID) {
        removeWishlistItem(productID)
    }

    async function handleMoveToCart  (productID)  {
        const quantity = 1;
        addToCart(productID, quantity);
    }

    async function runFunctions (productID) {
        await removeFromWishlist(productID);
        await handleMoveToCart(productID);
    }

    if (wishlistItemsCount > 0) {
        return (
            <>
                <div className="wishlist-heading-container">
                    <div className="heading">WISHLIST</div>
                </div>
                <div className="wishlist-items-main-container">
                {
                    wishListItems.map((item, index) => {
                        return (
                            <div className="wishlist-each-item-container" key={index} >
                                <ProductTile product={item} />
                                <div className="wishlist-buttons-container">
                                    <button className="remove-from-wishlist" id={item.id} onClick={() => {removeFromWishlist(item.id)}}>Remove</button>
                                    <button className="move-to-cart-btn" id={item.id} onClick={() => {runFunctions(item.id)}}>MOVE TO CART</button>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </>
            
        )
    } else {
        return (
            <div className="empty-wishlist-items">
                <img src={HeartIcon} alt="Hear Icon" className="main-heart-icon" />
                <p style={{fontWeight: '600'}}>Hey, It feels so light!</p>
                <p>There is nothing in your Wishlist. Let's add some items.</p>
                <div className="category-container-buttons">
                    <Link to='/men'><div className="category">Men</div></Link>
                    <Link to='/women'><div className="category">Women</div></Link>
                    <Link to='/kids'><div className="category">Kids</div></Link>
                </div>
            </div>
        )
    }

}

export default WishlistItems;