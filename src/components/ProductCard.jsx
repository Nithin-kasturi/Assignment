import { useState } from 'react';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

function ProductCard({ product, onAddToCart }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    if (!isAdded) {
      setIsAdded(true);
      onAddToCart(product);
      toast.success(`${product.title} added to cart!`); // Show toast message
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center space-y-4">
      <img 
        src={product.thumbnail || product.images[0]} 
        alt={product.title} 
        loading="lazy" 
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-lg font-semibold">{product.title}</h2>
      <p className="text-green-600 text-lg font-bold">${product.price}</p>
      <p className="text-sm text-gray-600">{product.description}</p>
      <p className="text-yellow-500">Rating: {product.rating} / 5</p>
      <button
        onClick={handleAddToCart}
        className={`px-4 py-2 mt-2 rounded-md ${isAdded ? 'bg-gray-500' : 'bg-blue-500'} text-white`}
        disabled={isAdded}
      >
        {isAdded ? 'Added to Cart' : 'Add to Cart'}
      </button>
    </div>
  );
}

export default ProductCard;
