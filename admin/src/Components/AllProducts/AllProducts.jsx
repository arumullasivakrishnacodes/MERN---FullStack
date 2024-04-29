import React, { useEffect, useState } from 'react';
import '../AllProducts/AllProducts.css';

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchDataInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
    .then((res)=>res.json())
    .then((data) => {setAllProducts(data)});
  }

  useEffect(()=> {
    fetchDataInfo();
  }, []);

  return (
    <div className="allproductslist-main-container">
      <div className="heading">PRODUCTS LIST</div>

      <div className='product-list-table-head row'>
        <div className="col-2 head-item">Image</div>
        <div className="col-4 head-item">Name</div>
        <div className="col-1 head-item">Category</div>
        <div className="col-2 head-item">Offer Price</div>
        <div className="col-2 head-item">Original Price</div>
        <div className="col-1 head-item"><i class="bi bi-trash"></i></div>
      </div>

      <div className="product-details-main-container">
        {
          allProducts.map((product) => {
            return (
              <div className="product-details-con row">
                <div className="col-2"><img src={product.image} alt="" /></div>
                <div className="col-4">{product.name}</div>
                <div className="col-1">{product.category}</div>
                <div className="col-2">{product.new_price}</div>
                <div className="col-2">{product.old_price}</div>
                <div className="col-1"><i class="bi bi-x"></i></div>
              </div>
            )
          })
        }
        
      </div>
    </div>
  )
}

export default AllProducts