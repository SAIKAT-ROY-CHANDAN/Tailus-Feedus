'use client'
import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <div className="bg-gray-50 min-h-screen flex items-center">
    <div className="container mx-auto">
      {/* Cart page */}
      <h1 className="text-4xl mb-5">Cart</h1>
      
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="text-lg mb-2">
              {item.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg">Your cart is empty.</p>
      )}
    </div>
  </div>
  );
};

export default Cart;
