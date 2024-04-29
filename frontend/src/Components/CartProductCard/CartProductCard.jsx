import React, { useContext, useEffect, useState } from "react";
import '../CartProductCard/CartProductCard.css';
import returnImage from '../../Assets/Images/returnimage.png';
import { ShopContext } from "../../Context/ShopContext";
import { NavLink } from "react-router-dom";

function CartProductCard (props) {
    const product = props.product;
    const {removeCartItem, addToWishlist, addToCart} = useContext(ShopContext);
    const [qtyselected, setqtySelected] = useState(1);

    useEffect(()=> {
        setqtySelected(product.qty);
    }, [product.qty])

    const deleteProduct = (productID) => {
        removeCartItem(productID);
    }

    async function hamdleAddToWishlist  (productID)  {
        await addToWishlist(productID);
        await deleteProduct(productID);
    }

    const handleChangeProductQuantity = (productId,e) => {
        const quantityValue = Number(e.target.innerHTML);
        if (quantityValue === 1) {
            addToCart(productId, quantityValue)
        }
        addToCart(productId, quantityValue-1)
    }

    return (
        <div className="cart-product-card-container row">
            <div className="cart-image-container col-3">
            <NavLink to={`/product/${product.id}`}><img src={product.image} alt="" /></NavLink>
            </div>
            <div className="cart-product-details-section col-9">
                <div className="row">
                    <p className="product-name col-11">{product.name}</p>
                    <button className="col-1 cart-remove-product-btn d-flex justify-content-end align-items-start p-0 btn btn-primary" data-toggle="modal" data-target={`#removecartproduct${product.id}`}><i class="bi bi-x mb-auto"></i></button>
                    <div class="modal fade" id={`removecartproduct${product.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Remove From Cart</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <i class="bi bi-x"></i>
                                </button>
                            </div>
                            <p className="confirm-msg">Are you sure you want to move this item from bag?</p>
                            <div class="modal-body">
                                <div className="details-container row mb-3">
                                    <div className="image-block col-3"><img src={product.image} alt="" /></div>
                                    <div className="name-price-block col-9">
                                    <p className="product-name">{product.name}</p>
                                    <p className="product-price">₹ {product.new_price} <span className="price-strike">₹ {product.old_price}</span> <span className="price-discount">30% Off</span></p>
                                    </div>
                                </div>
                                <div className="buttons-container justify-content-center">
                                    <button className="move-to-wishlist" data-dismiss="modal" aria-label="Close" onClick={() => hamdleAddToWishlist(product.id)}>MOVE TO WISHLIST</button>
                                    <button className="remove-from-cart" data-dismiss="modal" aria-label="Close" onClick={() => deleteProduct(product.id)}>REMOVE ITEM</button>
                                </div>
                            </div>
                            <div class="modal-footer">
                            <div className="return-policy-container">
                                <img src={returnImage} alt="" /> <span>14 days return available.</span>
                            </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="product-price">₹ {product.new_price} <span className="price-strike">₹ {product.old_price}</span> <span className="price-discount">30% Off</span></p>
                <div className="variant-quantity-container">
                    <div className="variant btn"  data-toggle="modal" data-target={`#cartProductVariant${product.id}`}>Size: <span>XL</span> <span><i class="bi bi-caret-down-fill"></i></span></div>
                    
                    <div class="modal fade" id={`cartProductVariant${product.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Select Size</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <i class="bi bi-x"></i>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div className="details-container row mb-3">
                                    <div className="image-block col-3"><img src={product.image} alt="" /></div>
                                    <div className="name-price-block col-9">
                                    <p className="product-name">{product.name}</p>
                                    <p className="product-price">₹ {product.new_price} <span className="price-strike">₹ {product.old_price}</span> <span className="price-discount">30% Off</span></p>
                                    </div>
                                </div>
                                <div className="modal-variant-container">
                                    <div className="modal-variant d-flex justify-content-center align-items-center active">s</div>
                                    <div className="modal-variant d-flex justify-content-center align-items-center">M</div>
                                    <div className="modal-variant d-flex justify-content-center align-items-center">L</div>
                                    <div className="modal-variant d-flex justify-content-center align-items-center">XL</div>
                                    <div className="modal-variant d-flex justify-content-center align-items-center">XXL</div>
                                </div>
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn variant-done-btn" data-dismiss="modal">Done</button>
                            </div>
                            </div>
                        </div>
                    </div>


                    <div className="quantity btn" data-toggle="modal" data-target={`#cartProductQuantity${product.id}`}>Qty: <span>{product.qty}</span> <span><i class="bi bi-caret-down-fill"></i></span></div>

                    <div class="modal fade" id={`cartProductQuantity${product.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Select Quantity</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <i class="bi bi-x"></i>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div className="details-container row mb-3">
                                    <div className="image-block col-3"><img src={product.image} alt="" /></div>
                                    <div className="name-price-block col-9">
                                    <p className="product-name">{product.name}</p>
                                    <p className="product-price">₹ {product.new_price} <span className="price-strike">₹ {product.old_price}</span> <span className="price-discount">30% Off</span></p>
                                    </div>
                                </div>
                                <div className="modal-quantity-container">
                                    <div className={`modal-quantity d-flex justify-content-center align-items-center ${qtyselected === 1 ? 'active' : ''}`} data-dismiss="modal" onClick={(e) => handleChangeProductQuantity(product.id, e)}>1</div>
                                    <div className={`modal-quantity d-flex justify-content-center align-items-center ${qtyselected === 2 ? 'active' : ''}`} data-dismiss="modal" onClick={(e) => handleChangeProductQuantity(product.id, e)}>2</div>
                                    <div className={`modal-quantity d-flex justify-content-center align-items-center ${qtyselected === 3 ? 'active' : ''}`} data-dismiss="modal" onClick={(e) => handleChangeProductQuantity(product.id, e)}>3</div>
                                    <div className={`modal-quantity d-flex justify-content-center align-items-center ${qtyselected === 4 ? 'active' : ''}`} data-dismiss="modal" onClick={(e) => handleChangeProductQuantity(product.id, e)}>4</div>
                                    <div className={`modal-quantity d-flex justify-content-center align-items-center ${qtyselected === 5 ? 'active' : ''}`} data-dismiss="modal" onClick={(e) => handleChangeProductQuantity(product.id, e)}>5</div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn quantity-done-btn" data-dismiss="modal">Done</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="return-policy-container">
                    <img src={returnImage} alt="" /> <span>14 days return available.</span>
                </div>
            </div>
        </div>
    )
}

export default CartProductCard;