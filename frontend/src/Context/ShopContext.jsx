import React, { createContext, useCallback, useEffect, useState } from "react";
import ProductsData from '../Assets/Data/all_product'

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [allProducts, setAllProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [AuthenticatedUser, setAuthenticatedUser] = useState([])
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [wishlistItemsCount, setWishlistItemsCount] = useState(0);
    const [cartTotalPrice, setCartTotalPrice] = useState(0)
    const [wishListItems, setWishlistItems] = useState([]);

    const fetchAllProducts = async () => {
        await fetch('http://localhost:4000/allproducts')
            .then((res) => res.json())
            .then((data) => { setAllProducts(data) });
    };

    const fetchUsers = async () => {
        await fetch('http://localhost:4000/users')
        .then((res) => res.json())
        .then((data) => { setUsers(data) })
    }
    
    useEffect(() => {
        fetchAllProducts();
        fetchUsers();
    }, []);

    useEffect(() => {
        const loggedinUser = users.find((e) => e.mobile === Number(localStorage.getItem('loginUser')));
        localStorage.setItem('check', loggedinUser);
        setAuthenticatedUser(loggedinUser)
    }, [users]);
    

    const addToCart = (itemId, quantity) => {
        const productExistinCart = cartItems.find((e) => e.id === Number(itemId));
        if (productExistinCart) {
            productExistinCart.qty = quantity + 1;
            setCartItems([...cartItems]);
        } else {
            const cartItem = allProducts.find((e) => e.id === Number(itemId));
            setCartItems([...cartItems, {...cartItem, qty: 1 }]); 
        }
        
    };

    const removeCartItem = (itemId) => {
        const updatedProducts = cartItems.filter((product) =>{ return product.id !== itemId});
        setCartItems(updatedProducts);
    }

    const removeWishlistItem = (itemId) => {
        const updatedProducts = wishListItems.filter((product) =>{ return product.id !== itemId});
        setWishlistItems(updatedProducts);
    }

    const addToWishlist = (itemId) => {
        const wishlistItem = allProducts.find((e) => e.id === Number(itemId));
        setWishlistItems([...wishListItems, wishlistItem]);
    }

    const getCartTotalPrice = useCallback(() => {
        let totalPrice = 0;
        cartItems.map((eachItem) => {
            return  totalPrice += Number(eachItem.new_price * eachItem.qty)
        })
        setCartTotalPrice(totalPrice);
    }, [cartItems]);

    const getCartTotalCount = useCallback(() => {
        let totalCartCount = 0;
        cartItems.map((eachItem) => {
            return  totalCartCount += Number(eachItem.qty)
        })
        setCartItemsCount(totalCartCount);
    }, [cartItems]);

    
    useEffect(() => {
        getCartTotalCount();
        getCartTotalPrice();
    }, [cartItems, getCartTotalPrice, getCartTotalCount]);

    useEffect(() => {
        const wishListItemsLength = wishListItems.length;
        setWishlistItemsCount(wishListItemsLength);
    }, [wishListItems])
    
    const productsData = {allProducts, users, AuthenticatedUser,  ProductsData, cartItems, wishListItems, cartItemsCount, wishlistItemsCount, cartTotalPrice, addToCart, addToWishlist, removeCartItem, removeWishlistItem};

    return (
        <ShopContext.Provider value={productsData}>
            {props.children}
        </ShopContext.Provider>
    )
    
}

export default ShopContextProvider;