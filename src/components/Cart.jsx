import React from 'react';

function Cart({ cart }) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full sm:w-1/3 lg:w-1/4">
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between items-center text-sm">
              <span>{item.title}</span>
              <span>${item.price}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
