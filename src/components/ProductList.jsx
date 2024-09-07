import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 5;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then((data) => {
          setProducts(data.products);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }, 2000);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesPrice = (!minPrice || product.price >= minPrice) && (!maxPrice || product.price <= maxPrice);
    return matchesPrice;
  });

  const displayedProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  return (
    <div className="flex-1">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border border-gray-300 p-2 rounded-md flex-1"
        />
        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border border-gray-300 p-2 rounded-md flex-1"
        />
      </div>

      {loading ? (
        <div className="text-center">Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}

      <div className="flex justify-between mt-4">
        <button 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled={loading}
        >
          Previous
        </button>
        <button 
          onClick={() => setCurrentPage((prev) => prev + 1)} 
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled={loading}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductList;
