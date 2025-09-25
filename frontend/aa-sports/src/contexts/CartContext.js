// src/contexts/CartContext.js
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevState => [...prevState, product]);
  };

  const removeFromCart = (itemIndex) => {
    setCartItems(currentItems => {
      const newCart = [...currentItems];
      newCart.splice(itemIndex, 1);
      return newCart;
    });
  };

   const clearCart = () => {
        setCartItems([]);
    };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}