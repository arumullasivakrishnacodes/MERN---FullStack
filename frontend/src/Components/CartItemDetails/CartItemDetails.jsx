import React, { useContext } from "react";
import CouponImage from '../../Assets/Images/couponimage.png';
import '../CartItemDetails/CartItemDetails.css';
import { ShopContext } from "../../Context/ShopContext";

function CartProductDetails () {
    const {cartItemsCount, cartTotalPrice} = useContext(ShopContext);
    if (cartItemsCount > 0) {
        return (
            <div className="cart-price-details-section-container">
                <div className="coupons-container">
                    <div className="heading">COUPONS</div>
                    <div className="apply-coupon-section">
                        <div className="heading-section">
                            <img src={CouponImage} alt="" /> <span>APPLY COUPON</span>
                        </div>
                        <button className="apply-coupon-btn btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">APPLY</button>
                        {/* bootstrap modal apply coupon */}
                        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    ...
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Save changes</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-details-section">
                    <div className="heading">ProductDetails ( <span>{cartItemsCount}</span> <span>{cartItemsCount > 1 ? 'Items' : 'Item'} )</span></div>
                    <div className="price-breakup-section">Total Price <span>₹ {cartTotalPrice}</span></div>
                    <div className="price-breakup-section">Discount Price <span>₹ 0</span></div>
                    <div className="price-breakup-section">Coupon Discount <span>₹ 0</span></div>
                    <div className="price-breakup-section">Platform fee <span>₹ 1</span></div>
                    <div className="price-breakup-section">Shipping fee <span>₹ 3</span></div>
                </div>
                <div className="place-order-section">
                    <div className="total-price">Total Price <span>₹ {cartTotalPrice + 4}</span></div>
                    <button className="place-order-btn">PLACE ORDER</button>
                </div>
            </div>
        )
    }
    
}

export default CartProductDetails;