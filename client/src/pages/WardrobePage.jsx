import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WardrobePage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [product, setProduct] = useState({ name: '', image: '', price: '' });
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all products initially
  const fetchAllProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/products/');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load products');
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Add new category
  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  // Add new product
  const handleAddProduct = async () => {
    if (!selectedCategory || !product.name) return;

    try {
      const res = await axios.post('http://localhost:8000/api/products/', {
        ...product,
        category: selectedCategory,
      });
      setProducts([...products, res.data]);
      setProduct({ name: '', image: '', price: '' });
    } catch (err) {
      console.error(err);
      setError('Failed to add product');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">My Wardrobe</h1>

        {/* Add Category */}
        <div className="mb-6 flex gap-2">
          <input
            type="text"
            placeholder="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAddCategory}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Category
          </button>
        </div>

        {/* Select Category */}
        <div className="mb-6 flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Category</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Add Product */}
        {selectedCategory && (
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            <input
              type="text"
              placeholder="Product Name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={product.image}
              onChange={(e) => setProduct({ ...product, image: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Price"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleAddProduct}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Add Product
            </button>
          </div>
        )}

        {/* Error */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Display Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
              <img
                src={item.image || 'https://via.placeholder.com/150'}
                alt={item.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h2 className="text-lg font-semibold mb-1">{item.name}</h2>
              <p className="text-gray-600 mb-2">{item.price || 'Price not set'}</p>
              <p className="text-sm text-gray-500">{item.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WardrobePage;
