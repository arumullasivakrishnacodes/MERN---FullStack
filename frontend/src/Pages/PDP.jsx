import React, { useContext } from "react";
import ProductDetails from "../Components/ProductDetails/ProductDetails";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";

function PDP () {
    const productDetails = useContext(ShopContext);
    const {productID} = useParams();
    const product = productDetails.ProductsData.find((e) => e.id === Number(productID))

    return (
        <div className="pdp-main-page-container">
            <ProductDetails product={product}/>
        </div>
    )
}

export default PDP;