import React, { useState, useEffect } from "react";
import axios from "axios";
import { PlusCircle, FolderPlus, Shirt, Trash2, Edit3 } from "lucide-react";

const API_BASE = "http://127.0.0.1:8000/api/products";

const WardrobePage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [product, setProduct] = useState({ name: "", thumbnail: "", price: "" });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  /** ✅ Fetch categories & products */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          axios.get(`${API_BASE}/categories`),
          axios.get(API_BASE),
        ]);
        setCategories(catRes.data);
        setProducts(prodRes.data);
      } catch (err) {
        console.error(err);
        setError("⚠️ Failed to load wardrobe data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /** ✅ Add new category */
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      const res = await axios.post(`${API_BASE}/categories`, null, {
        params: { name: newCategory.trim() },
      });
      setCategories((prev) => [...prev, res.data]);
      setNewCategory("");
      setShowCategoryModal(false);
    } catch (err) {
      console.error(err);
      setError("⚠️ Failed to add category.");
    }
  };

  /** ✅ Delete category */
  const handleDeleteCategory = async (catId) => {
    try {
      await axios.delete(`${API_BASE}/categories/${catId}`);
      setCategories((prev) => prev.filter((c) => c.id !== catId));
      if (selectedCategory === catId) setSelectedCategory("");
    } catch (err) {
      console.error(err);
      setError("⚠️ Failed to delete category.");
    }
  };

  /** ✅ Add new product */
  const handleAddProduct = async () => {
    if (!selectedCategory || !product.name.trim()) return;
    try {
      const res = await axios.post(API_BASE, {
        ...product,
        category: selectedCategory,
      });
      setProducts((prev) => [...prev, res.data]);
      setProduct({ name: "", thumbnail: "", price: "" });
      setShowProductModal(false);
    } catch (err) {
      console.error(err);
      setError("⚠️ Failed to add product.");
    }
  };

  /** ✅ Delete product */
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      setError("⚠️ Failed to delete product.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl text-gray-600">
        ⏳ Loading wardrobe...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-pink-50 to-yellow-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-black text-center mb-8 text-gray-800 tracking-tight">
          My Wardrobe
        </h1>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((cat) => (
            <div key={cat.id} className="relative flex items-center">
              <button
                onClick={() => setSelectedCategory(cat.name?.toString())}
                className={`px-4 py-2 rounded-full text-sm font-medium shadow transition-all 
                  ${
                    selectedCategory === cat.name?.toString()
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-700 hover:bg-indigo-100"
                  }`}
              >
                {cat.name?.toString()}
              </button>
              {editMode && (
                <button
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {products
            .filter((p) => !selectedCategory || p.category === selectedCategory)
            .map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all group"
              >
                <div className="relative w-full h-48 sm:h-56 bg-white flex items-center justify-center">
                  {item.thumbnail ||
                  (item.thumbnails?.length > 0 && item.thumbnails[0]) ? (
                    <img
                      src={item.thumbnail || item.thumbnails[0]}
                      alt={item.title || item.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-100">
                      <Shirt className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  {editMode && (
                    <button
                      onClick={() => handleDeleteProduct(item.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <div className="p-3 text-center">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {item.title || item.name}
                  </h3>
                  <p className="text-sm text-gray-500">{item.price || "—"}</p>
                </div>
              </div>
            ))}
        </div>

        {/* Floating Action Buttons (Compact Icons) */}
        <div className="fixed bottom-6 right-4 sm:right-6 flex flex-col gap-3">
          {/* Edit Mode Button */}
          <button
            onClick={() => setEditMode(!editMode)}
            className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all duration-200
              ${editMode ? "bg-red-600" : "bg-gray-600"} text-white
              group relative`}
          >
            <Edit3 size={20} />
            <span className="absolute right-full mr-2 px-2 py-1 text-xs rounded-md bg-black text-white opacity-0 group-hover:opacity-100 transition">
              {editMode ? "Done" : "Edit"}
            </span>
          </button>

          {/* Add Category */}
          <button
            onClick={() => setShowCategoryModal(true)}
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition group relative"
          >
            <FolderPlus size={20} />
            <span className="absolute right-full mr-2 px-2 py-1 text-xs rounded-md bg-black text-white opacity-0 group-hover:opacity-100 transition">
              Add Category
            </span>
          </button>

          {/* Add Product */}
          <button
            onClick={() => setShowProductModal(true)}
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition group relative"
          >
            <PlusCircle size={20} />
            <span className="absolute right-full mr-2 px-2 py-1 text-xs rounded-md bg-black text-white opacity-0 group-hover:opacity-100 transition">
              Add Product
            </span>
          </button>
        </div>

        {/* Category Modal */}
        {showCategoryModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 p-3">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">➕ New Category</h2>
              <input
                type="text"
                placeholder="e.g. Jackets"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg mb-4"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCategory}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Modal */}
        {showProductModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 p-3">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">👕 New Product</h2>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg mb-4"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name?.toString()}>
                    {cat.name?.toString()}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Product Name"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg mb-3"
              />
              <input
                type="text"
                placeholder="Thumbnail URL"
                value={product.thumbnail}
                onChange={(e) =>
                  setProduct({ ...product, thumbnail: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg mb-3"
              />
              <input
                type="text"
                placeholder="Price"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg mb-4"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProduct}
                  className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WardrobePage;
