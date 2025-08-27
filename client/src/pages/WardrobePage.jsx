// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { PlusCircle, FolderPlus, Shirt, Trash2, Edit3 } from "lucide-react";

// const API_BASE = "http://127.0.0.1:8000/api/products";

// const WardrobePage = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [newCategory, setNewCategory] = useState("");
//   const [product, setProduct] = useState({ name: "", thumbnail: "", price: "" });
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [showCategoryModal, setShowCategoryModal] = useState(false);
//   const [showProductModal, setShowProductModal] = useState(false);
//   const [editMode, setEditMode] = useState(false);

//   /** ✅ Fetch categories & products */
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [catRes, prodRes] = await Promise.all([
//           axios.get(`${API_BASE}/categories`),
//           axios.get(API_BASE),
//         ]);
//         setCategories(catRes.data);
//         setProducts(prodRes.data);
//       } catch (err) {
//         console.error(err);
//         setError("⚠️ Failed to load wardrobe data.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   /** ✅ Add new category */
//   const handleAddCategory = async () => {
//     if (!newCategory.trim()) return;
//     try {
//       const res = await axios.post(`${API_BASE}/categories`, null, {
//         params: { name: newCategory.trim() },
//       });
//       setCategories((prev) => [...prev, res.data]);
//       setNewCategory("");
//       setShowCategoryModal(false);
//     } catch (err) {
//       console.error(err);
//       setError("⚠️ Failed to add category.");
//     }
//   };

//   /** ✅ Delete category */
//   const handleDeleteCategory = async (catId) => {
//     try {
//       await axios.delete(`${API_BASE}/categories/${catId}`);
//       setCategories((prev) => prev.filter((c) => c.id !== catId));
//       if (selectedCategory === catId) setSelectedCategory("");
//     } catch (err) {
//       console.error(err);
//       setError("⚠️ Failed to delete category.");
//     }
//   };

//   /** ✅ Add new product */
//   const handleAddProduct = async () => {
//     if (!selectedCategory || !product.name.trim()) return;
//     try {
//       const res = await axios.post(API_BASE, {
//         ...product,
//         category: selectedCategory,
//       });
//       setProducts((prev) => [...prev, res.data]);
//       setProduct({ name: "", thumbnail: "", price: "" });
//       setShowProductModal(false);
//     } catch (err) {
//       console.error(err);
//       setError("⚠️ Failed to add product.");
//     }
//   };

//   /** ✅ Delete product */
//   const handleDeleteProduct = async (id) => {
//     try {
//       await axios.delete(`${API_BASE}/${id}`);
//       setProducts((prev) => prev.filter((p) => p.id !== id));
//     } catch (err) {
//       console.error(err);
//       setError("⚠️ Failed to delete product.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center text-xl text-gray-600">
//         ⏳ Loading wardrobe...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-pink-50 to-yellow-50 p-4 sm:p-6">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl sm:text-5xl font-black text-center mb-8 text-gray-800 tracking-tight">
//           My Wardrobe
//         </h1>

//         {/* Error Banner */}
//         {error && (
//           <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-lg mb-6 text-center">
//             {error}
//           </div>
//         )}

//         {/* Category Pills */}
//         <div className="flex flex-wrap justify-center gap-3 mb-8">
//           {categories.map((cat) => (
//             <div key={cat.id} className="relative flex items-center">
//               <button
//                 onClick={() => setSelectedCategory(cat.name?.toString())}
//                 className={`px-4 py-2 rounded-full text-sm font-medium shadow transition-all 
//                   ${
//                     selectedCategory === cat.name?.toString()
//                       ? "bg-indigo-600 text-white"
//                       : "bg-white text-gray-700 hover:bg-indigo-100"
//                   }`}
//               >
//                 {cat.name?.toString()}
//               </button>
//               {editMode && (
//                 <button
//                   onClick={() => handleDeleteCategory(cat.id)}
//                   className="ml-2 text-red-500 hover:text-red-700"
//                 >
//                   <Trash2 size={16} />
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Products Grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
//           {products
//             .filter((p) => !selectedCategory || p.category === selectedCategory)
//             .map((item) => (
//               <div
//                 key={item.id}
//                 className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all group"
//               >
//                 <div className="relative w-full h-48 sm:h-56 bg-white flex items-center justify-center">
//                   {item.thumbnail ||
//                   (item.thumbnails?.length > 0 && item.thumbnails[0]) ? (
//                     <img
//                       src={item.thumbnail || item.thumbnails[0]}
//                       alt={item.title || item.name}
//                       className="max-h-full max-w-full object-contain"
//                     />
//                   ) : (
//                     <div className="flex items-center justify-center w-full h-full bg-gray-100">
//                       <Shirt className="w-12 h-12 text-gray-400" />
//                     </div>
//                   )}
//                   {editMode && (
//                     <button
//                       onClick={() => handleDeleteProduct(item.id)}
//                       className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   )}
//                 </div>
//                 <div className="p-3 text-center">
//                   <h3 className="font-semibold text-gray-800 truncate">
//                     {item.title || item.name}
//                   </h3>
//                   <p className="text-sm text-gray-500">{item.price || "—"}</p>
//                 </div>
//               </div>
//             ))}
//         </div>

//         {/* Floating Action Buttons (Compact Icons) */}
//         <div className="fixed bottom-6 right-4 sm:right-6 flex flex-col gap-3">
//           {/* Edit Mode Button */}
//           <button
//             onClick={() => setEditMode(!editMode)}
//             className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all duration-200
//               ${editMode ? "bg-red-600" : "bg-gray-600"} text-white
//               group relative`}
//           >
//             <Edit3 size={20} />
//             <span className="absolute right-full mr-2 px-2 py-1 text-xs rounded-md bg-black text-white opacity-0 group-hover:opacity-100 transition">
//               {editMode ? "Done" : "Edit"}
//             </span>
//           </button>

//           {/* Add Category */}
//           <button
//             onClick={() => setShowCategoryModal(true)}
//             className="flex items-center gap-2 px-4 py-3 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition group relative"
//           >
//             <FolderPlus size={20} />
//             <span className="absolute right-full mr-2 px-2 py-1 text-xs rounded-md bg-black text-white opacity-0 group-hover:opacity-100 transition">
//               Add Category
//             </span>
//           </button>

//           {/* Add Product */}
//           <button
//             onClick={() => setShowProductModal(true)}
//             className="flex items-center gap-2 px-4 py-3 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition group relative"
//           >
//             <PlusCircle size={20} />
//             <span className="absolute right-full mr-2 px-2 py-1 text-xs rounded-md bg-black text-white opacity-0 group-hover:opacity-100 transition">
//               Add Product
//             </span>
//           </button>
//         </div>

//         {/* Category Modal */}
//         {showCategoryModal && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 p-3">
//             <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
//               <h2 className="text-xl font-bold mb-4">➕ New Category</h2>
//               <input
//                 type="text"
//                 placeholder="e.g. Jackets"
//                 value={newCategory}
//                 onChange={(e) => setNewCategory(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg mb-4"
//               />
//               <div className="flex justify-end gap-3">
//                 <button
//                   onClick={() => setShowCategoryModal(false)}
//                   className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleAddCategory}
//                   className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Product Modal */}
//         {showProductModal && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 p-3">
//             <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
//               <h2 className="text-xl font-bold mb-4">👕 New Product</h2>
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg mb-4"
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((cat) => (
//                   <option key={cat.id} value={cat.name?.toString()}>
//                     {cat.name?.toString()}
//                   </option>
//                 ))}
//               </select>
//               <input
//                 type="text"
//                 placeholder="Product Name"
//                 value={product.name}
//                 onChange={(e) =>
//                   setProduct({ ...product, name: e.target.value })
//                 }
//                 className="w-full px-4 py-2 border rounded-lg mb-3"
//               />
//               <input
//                 type="text"
//                 placeholder="Thumbnail URL"
//                 value={product.thumbnail}
//                 onChange={(e) =>
//                   setProduct({ ...product, thumbnail: e.target.value })
//                 }
//                 className="w-full px-4 py-2 border rounded-lg mb-3"
//               />
//               <input
//                 type="text"
//                 placeholder="Price"
//                 value={product.price}
//                 onChange={(e) =>
//                   setProduct({ ...product, price: e.target.value })
//                 }
//                 className="w-full px-4 py-2 border rounded-lg mb-4"
//               />
//               <div className="flex justify-end gap-3">
//                 <button
//                   onClick={() => setShowProductModal(false)}
//                   className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleAddProduct}
//                   className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WardrobePage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { PlusCircle, FolderPlus, Shirt, Trash2, Edit3, Sparkles } from "lucide-react";

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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex justify-center items-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-emerald-500 border-t-transparent"></div>
          <div className="absolute inset-0 rounded-full border-2 border-emerald-200"></div>
        </div>
      </div>
    );
  }

  const filteredProducts = products.filter((p) => 
    !selectedCategory || p.category === selectedCategory
  );

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-100 rounded-full opacity-40 blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-teal-100 rounded-full opacity-40 blur-xl"></div>
      <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-emerald-200 rounded-full opacity-30 blur-lg"></div>

      <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
              <Sparkles className="mr-2 h-4 w-4" />
              Your Personal Collection
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-8 text-slate-800 leading-tight tracking-tight">
            My{" "}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl transform rotate-1"></span>
              <span className="relative px-6 py-2 text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-lg">
                Wardrobe
              </span>
            </span>
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Organize and manage your fashion collection with style
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-2xl mb-8 text-center shadow-lg">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Enhanced Category Pills */}
        <div className="mb-12">
          <h2 className="text-2xl font-light text-slate-800 mb-6 text-center">Categories</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedCategory("")}
              className={`group relative px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === ""
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl shadow-emerald-200"
                  : "bg-white/80 text-slate-700 shadow-lg border border-slate-200 hover:bg-white hover:shadow-xl"
              }`}
            >
              <span className="relative z-10">All Items</span>
              {selectedCategory !== "" && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              )}
            </button>
            
            {categories.map((cat) => (
              <div key={cat.id} className="relative flex items-center group">
                <button
                  onClick={() => setSelectedCategory(cat.name?.toString())}
                  className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === cat.name?.toString()
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl shadow-emerald-200"
                      : "bg-white/80 text-slate-700 shadow-lg border border-slate-200 hover:bg-white hover:shadow-xl"
                  }`}
                >
                  <span className="relative z-10">{cat.name?.toString()}</span>
                  {selectedCategory !== cat.name?.toString() && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  )}
                </button>
                {editMode && (
                  <button
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="ml-3 p-2 text-red-500 hover:text-white hover:bg-red-500 rounded-full transition-all duration-300 hover:shadow-lg transform hover:scale-110"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Products Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-light text-slate-800 mb-1">
                {selectedCategory ? `${selectedCategory} Items` : 'All Items'}
              </h2>
              <p className="text-slate-600">
                {filteredProducts.length} item{filteredProducts.length !== 1 ? "s" : ""} in your collection
              </p>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto border border-slate-200 shadow-lg">
                <Shirt className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-slate-600 mb-2">
                  {selectedCategory ? `No ${selectedCategory} items` : 'No items in wardrobe'}
                </h3>
                <p className="text-slate-500">
                  {selectedCategory 
                    ? 'Add some items to this category to get started' 
                    : 'Start building your wardrobe by adding categories and items'
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200"
                >
                  <div className="relative w-full h-48 sm:h-56 bg-gradient-to-br from-slate-50 to-emerald-50 flex items-center justify-center">
                    {item.thumbnail ||
                    (item.thumbnails?.length > 0 && item.thumbnails[0]) ? (
                      <img
                        src={item.thumbnail || item.thumbnails[0]}
                        alt={item.title || item.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <Shirt className="w-12 h-12 text-slate-300 group-hover:text-emerald-400 transition-colors duration-300" />
                      </div>
                    )}
                    {editMode && (
                      <button
                        onClick={() => handleDeleteProduct(item.id)}
                        className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg transition-all duration-300 transform hover:scale-110 z-10"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                    {editMode && (
                      <div className="absolute inset-0 bg-red-100/20 rounded-t-2xl border-2 border-red-200 border-dashed transition-all duration-300"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"></div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-slate-800 truncate mb-1 group-hover:text-emerald-700 transition-colors duration-300">
                      {item.title || item.name}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium">
                      {item.price || "—"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Enhanced Floating Action Buttons */}
        <div className="fixed bottom-6 right-4 sm:right-6 flex flex-col gap-4">
          {/* Edit Mode Button */}
          <button
            onClick={() => setEditMode(!editMode)}
            className={`group relative flex items-center justify-center w-14 h-14 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-110 ${
              editMode 
                ? "bg-gradient-to-r from-red-600 to-red-700 text-white animate-pulse" 
                : "bg-gradient-to-r from-slate-600 to-slate-700 text-white"
            }`}
          >
            <Edit3 size={20} />
            <span className="absolute right-full mr-3 px-3 py-2 text-sm rounded-xl bg-slate-800 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-lg">
              {editMode ? "Exit Edit Mode" : "Enter Edit Mode"}
            </span>
            {editMode && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
            )}
          </button>

          {/* Add Category */}
          <button
            onClick={() => setShowCategoryModal(true)}
            className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-2xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-110"
          >
            <FolderPlus size={20} />
            <span className="absolute right-full mr-3 px-3 py-2 text-sm rounded-xl bg-slate-800 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-lg">
              Add Category
            </span>
          </button>

          {/* Add Product */}
          <button
            onClick={() => setShowProductModal(true)}
            className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-2xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 transform hover:scale-110"
          >
            <PlusCircle size={20} />
            <span className="absolute right-full mr-3 px-3 py-2 text-sm rounded-xl bg-slate-800 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-lg">
              Add Item
            </span>
          </button>
        </div>

        {/* Enhanced Category Modal */}
        {showCategoryModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 z-50">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur opacity-20"></div>
              <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md border border-slate-200">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl mb-4">
                    <FolderPlus className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-light text-slate-800 mb-2">New Category</h2>
                  <p className="text-slate-600">Create a new category for your wardrobe</p>
                </div>
                
                <input
                  type="text"
                  placeholder="e.g. Jackets, Shoes, Accessories..."
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border border-slate-300 rounded-2xl mb-6 text-slate-800 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300"
                  autoFocus
                />
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCategoryModal(false)}
                    className="flex-1 px-6 py-4 rounded-2xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCategory}
                    className="flex-1 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Product Modal */}
        {showProductModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 z-50">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur opacity-20"></div>
              <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md border border-slate-200">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl mb-4">
                    <Shirt className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-light text-slate-800 mb-2">New Item</h2>
                  <p className="text-slate-600">Add a new item to your wardrobe</p>
                </div>

                <div className="space-y-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border border-slate-300 rounded-2xl text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300"
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
                    placeholder="Item Name"
                    value={product.name}
                    onChange={(e) =>
                      setProduct({ ...product, name: e.target.value })
                    }
                    className="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border border-slate-300 rounded-2xl text-slate-800 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300"
                  />

                  <input
                    type="text"
                    placeholder="Image URL (optional)"
                    value={product.thumbnail}
                    onChange={(e) =>
                      setProduct({ ...product, thumbnail: e.target.value })
                    }
                    className="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border border-slate-300 rounded-2xl text-slate-800 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300"
                  />

                  <input
                    type="text"
                    placeholder="Price (optional)"
                    value={product.price}
                    onChange={(e) =>
                      setProduct({ ...product, price: e.target.value })
                    }
                    className="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border border-slate-300 rounded-2xl text-slate-800 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300"
                  />
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowProductModal(false)}
                    className="flex-1 px-6 py-4 rounded-2xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddProduct}
                    disabled={!selectedCategory || !product.name.trim()}
                    className="flex-1 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Add Item
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WardrobePage;