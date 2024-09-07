import React from 'react';
import { useLocation } from 'react-router-dom';

function CheckoutPage() {
  const location = useLocation();
  const { cart } = location.state || { cart: [] }; // Fallback in case cart is not passed

  const totalPrice = cart.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity, 10) || 0;
    return sum + price * quantity;
  }, 0);

  const handlePayment = () => {
    fetch('http://localhost:5000/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart, total: totalPrice }),
    })
      .then(() => {
        alert('Order placed successfully!');
      })
      .catch((error) => console.error('Error placing order:', error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      {cart.length === 0 ? (
        <p className="text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
            {cart.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 mb-4">
                <img
                  src={item.thumbnail || item.images[0]}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-green-600 text-lg font-bold">${item.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 mt-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="font-bold text-lg mb-2">Total: ${totalPrice.toFixed(2)}</div>
            <button
              onClick={handlePayment}
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Pay Bill
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
