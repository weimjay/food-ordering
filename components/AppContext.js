"use client";
import {SessionProvider} from "next-auth/react";
import {createContext, useEffect, useState} from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
    let price = cartProduct.basePrice;
    if (cartProduct.size) {
        price += cartProduct.size.price;
    }
    if (cartProduct.extras?.length > 0) {
        for (const extra of cartProduct.extras) {
            price += extra.price;
        }
    }
    price *= cartProduct.quantity;
    return price;
}

export function AppProvider({children}) {
    const [cartProducts, setCartProducts] = useState([]);
    const ls = typeof window !== 'undefined' ? window.localStorage : null;

    useEffect(() => {
        /*if (ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')));
        }*/
        getCartProductsFromDb();
    }, []);

    function clearCart() {
        setCartProducts([]);
        saveCartProductsToDb([]);
    }

    function removeCartProduct(indexToRemove) {
        setCartProducts(prevCartProducts => {
            const newCartProducts = prevCartProducts.filter((v, index) => index !== indexToRemove);
            saveCartProductsToDb(newCartProducts);
            return newCartProducts;
        })
        toast.success('Product removed');
    }

    function getCartProductsFromDb() {
        fetch('/api/cart').then(response => {
            response.json().then(resData => {
                setCartProducts(resData?.data?.products || []);
            })
        })
    }

    function saveCartProductsToLocalStorage(cartProducts) {
        if (ls) {
            ls.setItem('cart', JSON.stringify(cartProducts));
        }
    }

    function saveCartProductsToDb(cartProducts) {
        fetch('/api/cart', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({cartProducts}),
        }).then(response => {
            return response.json();
        })
    }

    function addToCart(product, size=null, extras=[]) {
        const existingItem = cartProducts.find(item => item._id === product._id);
        let updateProducts;
        if (existingItem && !existingItem.size && existingItem.extras.length === 0) {
            updateProducts = cartProducts.map(item => {
                if (item._id === product._id) {
                    return {...item, quantity: item.quantity + 1};
                }
                return item;
            });
        } else {
            const {_id, name, image, basePrice} = product;
            updateProducts = [...cartProducts, {_id, name, image, basePrice, quantity: 1, size, extras}];
        }
        setCartProducts(updateProducts);
        saveCartProductsToDb(updateProducts);
        return updateProducts;
    }
    function decrCartQuantity(product) {
        const updateProducts = cartProducts.map(item => {
            if (item._id === product._id && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCartProducts(updateProducts);
        saveCartProductsToDb(updateProducts);
    }

    return (
        <SessionProvider>
            <CartContext.Provider value={{cartProducts, setCartProducts, addToCart, decrCartQuantity, removeCartProduct, clearCart}}>
                {children}
            </CartContext.Provider>
        </SessionProvider>
    );
}