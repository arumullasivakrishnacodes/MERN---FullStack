import React from "react";
import '../ToastMessage/ToastMessage.css';
import {Link} from 'react-router-dom'

function ToastMessage (props) {
        return (
            <div className={`toast-message-main-container ${props.success !== 0 ? 'active' : ''}`}>
                <div className="toast-message-container">
                    <div className="message-div">
                        <div className="icon"><i class="bi bi-check2"></i></div>
                        <div className="message">{props.message}</div>
                    </div>
                    <Link to='/cart' className={`view-cart ${props.viewbutton === 'cart' ? '' : 'd-none'}`}><button>View Cart</button></Link>
                    <Link to='/wishlist' className={`view-wishlist ${props.viewbutton === 'wishlist' ? '' : 'd-none'}`}><button>View Wishlist</button></Link>
                </div>
                <div className="progress "></div>
            </div>
            
        )
    
}

export default ToastMessage;