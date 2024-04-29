import React, { useContext, useEffect, useState } from "react";
import '../ProductDetails/ProductDetails.css';
import all_product from '../../Assets/Data/all_product';
import ProductTile from '../../Components/ProductTile/ProductTile'
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";

function ProductDetails (props) {
    const product = props.product;
    const filteredProducts = all_product.filter((element) => {return element.category === product.category})
    const {addToCart, addToWishlist, cartItems} = useContext(ShopContext);
    const [itemInCart, setItemInCart] = useState(false)

    const handleaddToCart = async (productId) => {
        const quantity = 1;
        try {
          // Assuming addToCart is an asynchronous function that returns a promise
          await addToCart(productId, quantity);
          // If addToCart succeeds, you can do something here if needed
        } catch (error) {
          // If addToCart fails, you can handle the error here
          // Perform actions based on your requirements, e.g., show an error message to the user
          // For simplicity, let's just log the error here
          console.log(error);
        }
    };

    useEffect(() => {
        const CheckItemInCart = cartItems.filter(item => item.id === props.product.id);
        if (CheckItemInCart.length > 0) {
            setItemInCart(true)
        } else {
            setItemInCart(false)
        }
    },[cartItems, props.product.id])

    const handleAddToWishlist = async (productId) => {
        try {
            await addToWishlist(productId);
        } catch (error) {
            // throw error
        }
        
    }

    const handleScrollPage = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Optional, smooth scrolling animation
        });
    }


    return (
        <>
            
            <BreadCrumbs home='Home' category={product.category} pname={product.name}/>
            <div className="productdetails-main-container row">
                <div className="col-lg-2 col-12 mini-image-container d-none d-lg-flex">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="col-lg-4 col-12 main-image-container p-0"><img src={product.image} alt="" /></div>
                <div className="col-lg-2 col-12 mini-image-container d-lg-none">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="col-lg-6 col-12 main-product-details-container">
                    <div className="product-details-section">
                        <div className="name-price-container">
                            <p className="product-name">{product.name}</p>
                            <p className="product-price">₹ {product.new_price} <span className="price-strike">₹ {product.old_price}</span> <span className="price-discount">30% Off</span></p>
                        </div>
                        <div className="description-category-container">
                            <p className="product-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum impedit maxime porro reprehenderit repellendus recusandae neque autem iste temporibus sint ea omnis at sapiente, quos consequuntur eveniet mollitia totam eos.</p>
                            <p className="product-category">Category: <span>{product.category}</span></p>
                            <p className="product-tags">Tags: <span>Modern, New Collection</span></p>
                        </div>
                        <div className="variation-pdp-buttons-container">
                            <p className="variation-heading">Size:</p>
                            <div className="variation-container">
                                <div className="variation variation-active d-flex justify-content-center align-items-center">S</div>
                                <div className="variation d-flex justify-content-center align-items-center">M</div>
                                <div className="variation d-flex justify-content-center align-items-center">L</div>
                                <div className="variation d-flex justify-content-center align-items-center">XL</div>
                                <div className="variation d-flex justify-content-center align-items-center">XXL</div>
                            </div>
                            <div className="pdp-btn-container">
                                <button className="addtowishlist" onClick={() => {handleAddToWishlist(product.id)}}>MOVE TO WISHLIST <i class="bi bi-heart-fill"></i></button>
                                <button className={`addtocart ${itemInCart ? 'd-none' : ''}`} onClick={() => {handleaddToCart(product.id)}}>ADD TO CART <i class="bi bi-cart3"></i></button>
                                <Link to='/cart' className={` w-50 ${itemInCart ? '' : 'd-none'}`} onClick={handleScrollPage}><button className={`addtocart w-100 p-3 ${itemInCart ? '' : 'd-none'}`} >GO TO CART <i class="bi bi-cart3"></i></button></Link>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>

            <div className="pdp-similar-products">
                <p className="heading">EXPLORE SIMILAR</p>
                <div className="similar-products-grid">
                {
                    filteredProducts.slice(0,4).map((similarproduct, index) => {
                        return <ProductTile key={index} product={similarproduct}/>
                    })
                }
                </div>
            </div>
            <div className="pdp-similar-products pdp-trending-products">
                <p className="heading">EXPLORE TRENDING</p>
                <div className="similar-products-grid">
                {
                    filteredProducts.slice(4,8).map((similarproduct, index) => {
                        return <ProductTile key={index} product={similarproduct}/>
                    })
                }
                </div>
            </div>
        </>
    )
}

export default ProductDetails;