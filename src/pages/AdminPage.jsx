import { useState } from "react";

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    imagePreview: ""
  });

  // Function to add a new product
  const addProduct = () => {
    if (newProduct.name.trim() && newProduct.description.trim() && newProduct.price.trim() && newProduct.image) {
      setProducts([...products, newProduct]);
      setNewProduct({ name: "", description: "", price: "", image: null, imagePreview: "" }); // Clear input fields
    }
  };

  // Function to delete a product
  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  // Update the product fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct({
        ...newProduct,
        image: file,
        imagePreview: URL.createObjectURL(file) // Generate preview URL
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Admin Page</h1>
      <p className="mb-4">Manage products and view orders here.</p>

      {/* Add Product Form */}
      <div className="flex flex-col lg:flex-row lg:items-center mb-6 space-y-4 lg:space-y-0 lg:space-x-4">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          placeholder="Enter product name"
          className="border p-2 w-full lg:w-1/4"
        />
        <input
          type="text"
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
          placeholder="Enter product description"
          className="border p-2 w-full lg:w-1/4"
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          placeholder="Enter product price"
          className="border p-2 w-full lg:w-1/4"
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 w-full lg:w-1/4"
        />

        {/* Preview the uploaded image */}
        {newProduct.imagePreview && (
          <img
            src={newProduct.imagePreview}
            alt="Product Preview"
            className="w-32 h-32 object-cover mt-2 lg:mt-0 lg:ml-4"
          />
        )}

        <button
          onClick={addProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full lg:w-auto"
        >
          Add Product
        </button>
      </div>

      {/* List of Products */}
      <ul className="space-y-4">
        {products.map((product, index) => (
          <li key={index} className="flex flex-col md:flex-row justify-between items-center p-4 border rounded-lg">
            <div className="flex flex-col items-start md:items-center md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-800 font-bold">${product.price}</p>
              </div>
              {product.imagePreview && (
                <img
                  src={product.imagePreview}
                  alt={product.name}
                  className="w-32 h-32 object-cover"
                />
              )}
            </div>
            <button
              onClick={() => deleteProduct(index)}
              className="bg-red-500 text-white px-2 py-1 rounded mt-4 md:mt-0"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;
