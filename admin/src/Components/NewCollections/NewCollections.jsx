import React, { useEffect, useState } from 'react';
import '../NewCollections/NewCollections.css';
import UploadImage from '../../assets/Images/upload-image.png'

const NewCollections = () => {
  const [productImage, setProductImage] = useState(false);
  const [productCategory, setProductCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productOriginalprice, setProductOriginalPrice] = useState('');
  const [productOfferPrice, setProductOfferPrice] = useState('');

  const [productDetails, setProductDetails] = useState({});

  const handleImageUpload = (event) => {
    setProductImage(event.target.files[0]);
  }

  const handleCategorySelection = (e) => {
    setProductCategory(e.target.innerHTML);
  }

  const handleInputValue = (e) => {
    const inputValue = e.target.id;
    if (inputValue === 'productName') {
      setProductName(e.target.value)
    } else if (inputValue === 'productOriginalPrice') {
      setProductOriginalPrice(e.target.value)
    } else if (inputValue === 'productOfferPrice') {
      setProductOfferPrice(e.target.value)
    } else if (inputValue === 'productDescription') {
      setProductDescription(e.target.value)
    }
  }

  const validation = () => {
    let validationSuccess = false;
    if (productName === '' || productOriginalprice === '' || productOfferPrice === '' || productCategory === '' || productImage === '') {
      document.getElementById('ErrorMessage').classList.remove('d-none');
      setTimeout(() => {
        document.getElementById('ErrorMessage').classList.add('d-none');
      }, 1800);
      validationSuccess = false;
    } else {
      document.getElementById('ErrorMessage').classList.add('d-none');
      validationSuccess = true;
    }
    return validationSuccess;
  }

  const AddProducts = async () => {
    const validationSuccess = await validation();

    if (validationSuccess) {
      setProductDetails({
        name: productName,
        image: productImage,
        category: productCategory,
        new_price: productOfferPrice,
        old_price: productOriginalprice
      });

      let responseData;
      let product = productDetails;

      let formData = new FormData();
      formData.append('product', productImage);

      await fetch('http://localhost:4000/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body:formData,
      }).then((res) => res.json()).then((data) => {responseData=data});

      if (responseData.success) {
        product.image = responseData.image_url;

        await fetch('http://localhost:4000/addCollectionProduct', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify(product),
        }).then((res) => res.json()).then((data) => {
          data.success ? alert('Product Added'): alert('Failed')
        });
      }
    }
  }

  return (
    <div className='addproducts-main-container'>
      <div className="toast-message d-none" id='ErrorMessage'>Please Enter All * Inputs</div>
      <div className="product-config-con">
        <label className='input-label'>Product Name <span style={{color: '#c00'}}>*</span></label>
        <input type="text" id='productName' value={productName} placeholder='Enter Product Name...' onChange={handleInputValue} />
      </div>

      <div className="product-config-con">
        <label className='input-label'>Product Description</label>
        <input type="text" id='productDescription' value={productDescription} placeholder='Enter Product Description...' onChange={handleInputValue} />
      </div>

      <div className="product-category-con">
        <label className='input-label'>Category <span style={{color: '#c00'}}>*</span></label>
        <div className="category-item-con">
          <div className={`category-item ${productCategory === 'Men' ? 'active' : ''}`} onClick={handleCategorySelection}>Men</div>
          <div className={`category-item ${productCategory === 'Women' ? 'active' : ''}`} onClick={handleCategorySelection}>Women</div>
          <div className={`category-item ${productCategory === 'Kids' ? 'active' : ''}`} onClick={handleCategorySelection}>Kids</div>
        </div>
      </div>

      <div className="product-price-container row">
        <div className="col-6">
          <div className="product-config-con">
          <label className='input-label'>Original Price <span style={{color: '#c00'}}>*</span></label>
          <input type="text" id='productOriginalPrice' value={productOriginalprice} placeholder='Enter Original Price...' onChange={handleInputValue} />
          </div>
        </div>

        <div className="col-6">
          <div className="product-config-con">
          <label className='input-label'>Offer Price <span style={{color: '#c00'}}>*</span></label>
          <input type="text" id='productOfferPrice' value={productOfferPrice} placeholder='Enter Offer Price...' onChange={handleInputValue} />
          </div>
        </div>

      </div>

      <div className="product-image-container">
        <label className='input-label'>Product Image <span style={{color: '#c00'}}>*</span></label>
        <div className="uploadimage">
          <img src={productImage ? URL.createObjectURL(productImage) : UploadImage} alt=""/>
        </div>
        <input type="file" id='productImage' onChange={handleImageUpload} />
      </div>

      <div className="addproct-btn" onClick={AddProducts}>ADD PRODUCT</div>

    </div>
  )
}

export default NewCollections;