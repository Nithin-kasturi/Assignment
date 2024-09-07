import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import ProductList from '../components/ProductList';
import CartModal from '../components/CartModal';
import { FaShoppingCart } from 'react-icons/fa';

function UserPage() {
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.id === product.id);
      if (itemIndex > -1) {
        // Update quantity if item already exists in the cart
        const updatedCart = [...prevCart];
        updatedCart[itemIndex].quantity += 1;
        return updatedCart;
      } else {
        // Add new item to the cart
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
        .filter(item => item.quantity > 0); // Remove items with 0 quantity
    });
  };

  const handleRemove = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCheckout = () => {
    // Navigate to CheckoutPage and pass cart data
    navigate('/checkout', { state: { cart } });
  };

  return (
    <div className="container mx-auto p-4 relative">
      <h1 className="text-3xl font-bold mb-4">Welcome to the User Dashboard</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <ProductList onAddToCart={handleAddToCart} />
      </div>
      {/* Cart Icon */}
      <div 
        onClick={handleOpenModal} 
        className="fixed top-4 right-4 p-4 bg-blue-500 text-white rounded-full shadow-lg cursor-pointer z-50"
      >
        <FaShoppingCart size={24} />
      </div>
      {/* Cart Modal */}
      {isModalOpen && (
        <CartModal 
          cart={cart} 
          onClose={handleCloseModal} 
          onUpdateQuantity={handleUpdateQuantity} 
          onRemove={handleRemove} 
        />
      )}

    </div>
  );
}

export default UserPage;
