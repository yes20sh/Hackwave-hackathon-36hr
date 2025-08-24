import React, { useState, useEffect } from "react";
import axios from "axios";

const WardrobePage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [product, setProduct] = useState({ name: "", image: "", price: "" });
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // ✅ Fetch categories from API
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/products/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load categories");
    }
  };

  // ✅ Fetch all products
  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load products");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchAllProducts();
  }, []);

  // ✅ Add new category (via API)
  const handleAddCategory = async () => {
    if (!newCategory) return;
    try {
      await axios.post("http://localhost:8000/api/products/categories", null, {
        params: { name: newCategory }, // backend expects ?name=...
      });
      setNewCategory("");
      fetchCategories(); // refresh list
    } catch (err) {
      console.error(err);
      setError("Failed to add category");
    }
  };

  // ✅ Add new product into selected category
  const handleAddProduct = async () => {
    if (!selectedCategory || !product.name) return;

    try {
      const res = await axios.post("http://localhost:8000/api/products", {
        ...product,
        category: selectedCategory,
      });
      setProducts([...products, res.data]);
      setProduct({ name: "", image: "", price: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to add product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">👕 My Wardrobe</h1>

        {/* Add Category */}
        <div className="mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Add New Category (e.g. Jackets)"
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

        {/* Select Category for Adding Products */}
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

        {/* Add Product into Selected Category */}
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

        {/* Display Categories as Cards with Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col relative"
            >
              {/* Category Header */}
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h2 className="text-xl font-semibold">{cat}</h2>
              </div>

              {/* Products */}
              <div className="grid grid-cols-2 gap-3">
                {products
                  .filter((item) => item.category === cat)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-50 rounded-lg shadow-sm p-2 flex flex-col items-center"
                    >
                      <img
                        src={item.image || "https://via.placeholder.com/150"}
                        alt={item.name}
                        className="w-full h-28 object-cover rounded mb-2"
                      />
                      <h3 className="text-sm font-semibold">{item.name}</h3>
                      <p className="text-xs text-gray-500">
                        {item.price || "Price not set"}
                      </p>
                    </div>
                  ))}
              </div>

              {products.filter((p) => p.category === cat).length === 0 && (
                <p className="text-gray-400 text-sm text-center mt-3">
                  No products added yet.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WardrobePage;
