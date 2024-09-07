import React from 'react';
import { useNavigate } from 'react-router-dom';

function CartModal({ cart, onClose, onUpdateQuantity, onRemove }) {
  const navigate = useNavigate();

  const totalPrice = cart.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity, 10) || 0;
    return sum + price * quantity;
  }, 0);

  if (!cart || cart.length === 0) return null;

  const handleCheckout = () => {
    // Pass the cart details as state to CheckoutPage via navigation
    navigate('/checkout', { state: { cart } });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Shopping Cart Details</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
                <img
                  src={item.thumbnail || item.images[0]}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-green-600 text-lg font-bold">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-300 rounded"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-300 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="ml-2 px-4 py-1 bg-red-500 text-white rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-4 font-bold text-lg">
              Total: ${totalPrice.toFixed(2)}
            </div>
          </div>
        )}
        <div className="mt-4 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Close
          </button>
          <button
            onClick={handleCheckout}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartModal;
