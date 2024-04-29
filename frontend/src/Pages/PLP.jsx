import React, { useContext, useState } from "react";
import ProductTile from "../Components/ProductTile/ProductTile";
import { ShopContext } from "../Context/ShopContext";
import BreadCrumbs from "../Components/BreadCrumbs/BreadCrumbs";

function PLP (props) {
    const {ProductsData, allProducts} = useContext(ShopContext);
    const [sortSelected, setSortSelected] = useState('Recommended');
    const [sortOpen, setSortOpen] = useState(false);

    console.log(allProducts);

    const handleSortOpen = () => {
        setSortOpen(!sortOpen)
    }

    const handleSortSelection = async (e) => {
        await setSortSelected(e.target.innerHTML);
        handleSortOpen();
    }

    return (
        <div className="plp-main-container">
            <BreadCrumbs home='Home' category={props.category}  />
            <div className="smart-filters-container">
                <button>Modern Wear</button>
                <button>Traditional Wear</button>
                <button>Eastern Wear</button>
                <button>Below 10K</button>
                <button>Above 10K</button>
            </div>
            <div className="filters-sortby-main-container">
                <div className="filters-section">Filters <span><i class="bi bi-caret-right-fill"></i></span></div>
                <div className="sortby-section" onClick={handleSortOpen}>Sort: <span className="selected-sort">{sortSelected}</span> <span className={`rotate-icon ${sortOpen ? 'active' : ''}`}><i class={`bi bi-caret-down-fill`}></i></span></div>
                <div className={`sortby-dropdown-container ${sortOpen ? '' : 'd-none'}`}>
                    <div className={`sortbyItem ${sortSelected === 'Recommended' ? 'active' : ''}`} onClick={handleSortSelection}>Recommended</div>
                    <div className={`sortbyItem ${sortSelected === 'Popularity' ? 'active' : ''}`} onClick={handleSortSelection}>Popularity</div>
                    <div className={`sortbyItem ${sortSelected === "What's New" ? 'active' : ''}`} onClick={handleSortSelection}>What's New</div>
                    <div className={`sortbyItem ${sortSelected === 'Price: Low to High' ? 'active' : ''}`} onClick={handleSortSelection}>Price: Low to High</div>
                    <div className={`sortbyItem ${sortSelected === 'Price: High to Low' ? 'active' : ''}`} onClick={handleSortSelection}>Price: High to Low</div>
                    <div className={`sortbyItem ${sortSelected === 'Products with Discount' ? 'active' : ''}`} onClick={handleSortSelection}>Products with Discount</div>
                </div>
            </div>
            <div className="plp-product-container">
                {
                    allProducts.map((product, index) => {
                        if (props.category === product.category) {
                            return <ProductTile key={index} product={product} />;
                        } else {
                            return null;
                        }
                    })
                }
            </div>
            <div className="showmorebutton-container">
                <button>EXPLORE MORE</button>
            </div>
        </div>
    )
}

export default PLP;