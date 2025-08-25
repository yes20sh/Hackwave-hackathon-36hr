import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import {
  PlusCircle,
  FolderPlus,
  Shirt,
  Trash2,
  Edit3,
  X,
  Eye,
  EyeOff,
  Package,
  Sparkles,
} from "lucide-react";

const API_BASE = "http://127.0.0.1:8000/api/products";

const WardrobePage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [product, setProduct] = useState({
    name: "",
    thumbnail: "",
    price: "",
  });
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

  const filteredProducts = products.filter(
    (p) => !selectedCategory || p.category === selectedCategory
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-3 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 font-light">
            Loading your wardrobe...
          </p>
        </div>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50  ">
      <Navbar />
      {/* Decorative background elements */}
      <div className="fixed inset-0 mt-1.5 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-green-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-teal-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mt-[3em] mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl">
              <Package className="text-white text-3xl" />
            </div>
          </div>

          <div className="relative inline-block">
            <span className="text-4xl sm:text-5xl md:text-6xl font-light bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
              Wardrobe
            </span>
          </div>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Organize, manage, and style your fashion collection with ease
          </p>
        </div>

        {/* Enhanced Error Banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <p className="text-red-600 font-medium">{error}</p>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-400 hover:text-red-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Enhanced Category Filter Section */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="text-emerald-600 text-xl" />
            <h3 className="text-xl font-medium text-gray-800">
              Browse by Category
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {/* All Items Button */}
            <button
              onClick={() => setSelectedCategory("")}
              className={`group relative px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                !selectedCategory
                  ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg"
                  : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-lg border border-gray-200"
              }`}
            >
              <span className="flex items-center gap-2">
                <Eye size={16} />
                <span>All Items ({products.length})</span>
              </span>
              {!selectedCategory && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-green-600/20 rounded-2xl blur animate-pulse"></div>
              )}
            </button>

            {categories.map((cat) => (
              <div key={cat.id} className="relative group">
                <button
                  onClick={() => setSelectedCategory(cat.name?.toString())}
                  className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === cat.name?.toString()
                      ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg"
                      : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-lg border border-gray-200"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{cat.name?.toString()}</span>
                    <span className="text-xs opacity-75">
                      (
                      {
                        products.filter(
                          (p) => p.category === cat.name?.toString()
                        ).length
                      }
                      )
                    </span>
                  </span>
                </button>

                {editMode && (
                  <button
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={12} />
                  </button>
                )}

                {selectedCategory === cat.name?.toString() && (
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-green-600/20 rounded-2xl blur animate-pulse"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Products Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Package className="text-emerald-600 text-xl" />
              <h3 className="text-xl font-medium text-gray-800">
                {selectedCategory
                  ? `${selectedCategory} Collection`
                  : "All Items"}
              </h3>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                {filteredProducts.length} items
              </span>
            </div>

            <button
              onClick={() => setEditMode(!editMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                editMode
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-white/80 text-gray-700 hover:bg-white border border-gray-200"
              }`}
            >
              {editMode ? <EyeOff size={16} /> : <Edit3 size={16} />}
              <span>{editMode ? "Done Editing" : "Edit Mode"}</span>
            </button>
          </div>

          {/* Enhanced Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
              {filteredProducts.map((item, index) => (
                <div
                  key={item.id}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-gray-200"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                  }}
                >
                  {/* Product Image */}
                  <div className="relative w-full h-48 sm:h-56 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                    {item.thumbnail ||
                    (item.thumbnails?.length > 0 && item.thumbnails[0]) ? (
                      <img
                        src={item.thumbnail || item.thumbnails[0]}
                        alt={item.title || item.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                          <Shirt className="w-8 h-8 text-emerald-600" />
                        </div>
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Delete button in edit mode */}
                    {editMode && (
                      <button
                        onClick={() => handleDeleteProduct(item.id)}
                        className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-4 text-center space-y-2">
                    <h3 className="font-medium text-gray-800 truncate group-hover:text-emerald-600 transition-colors duration-300">
                      {item.title || item.name}
                    </h3>
                    <p className="text-emerald-600 font-semibold">
                      {item.price ? `$${item.price}` : "—"}
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        {item.category || "Uncategorized"}
                      </span>
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-green-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-gray-200 max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Shirt className="text-4xl text-gray-400" />
                </div>
                <p className="text-xl text-gray-600 font-light mb-2">
                  {selectedCategory
                    ? `No ${selectedCategory} items yet`
                    : "Your wardrobe is empty"}
                </p>
                <p className="text-gray-500 mb-6">
                  Start building your collection by adding some items
                </p>
                <button
                  onClick={() => setShowProductModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-medium hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Add Your First Item
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Floating Action Buttons */}
        <div className="fixed bottom-8 right-8 flex flex-col gap-4">
          {/* Add Product */}
          <button
            onClick={() => setShowProductModal(true)}
            className="group relative w-14 h-14 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-2xl shadow-2xl hover:from-emerald-700 hover:to-green-700 transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
          >
            <PlusCircle size={24} />
            <span className="absolute right-full mr-4 px-3 py-2 text-sm font-medium rounded-lg bg-gray-900 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
              Add Product
            </span>
          </button>

          {/* Add Category */}
          <button
            onClick={() => setShowCategoryModal(true)}
            className="group relative w-14 h-14 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-2xl shadow-2xl hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
          >
            <FolderPlus size={24} />
            <span className="absolute right-full mr-4 px-3 py-2 text-sm font-medium rounded-lg bg-gray-900 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
              Add Category
            </span>
          </button>
        </div>

        {/* Enhanced Category Modal */}
        {showCategoryModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 z-50">
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl flex items-center justify-center">
                  <FolderPlus className="text-white text-xl" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  New Category
                </h2>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="e.g. Summer Dresses, Sneakers, Accessories"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300"
                  autoFocus
                />

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setShowCategoryModal(false)}
                    className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCategory}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-700 hover:to-emerald-700 font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Create Category
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Product Modal */}
        {showProductModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 z-50">
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl flex items-center justify-center">
                  <Shirt className="text-white text-xl" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  New Product
                </h2>
              </div>

              <div className="space-y-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300"
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
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300"
                />

                <input
                  type="text"
                  placeholder="Thumbnail URL (optional)"
                  value={product.thumbnail}
                  onChange={(e) =>
                    setProduct({ ...product, thumbnail: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300"
                />

                <input
                  type="text"
                  placeholder="Price (optional)"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300"
                />

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setShowProductModal(false)}
                    className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddProduct}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700 font-medium transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!selectedCategory || !product.name.trim()}
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default WardrobePage;
