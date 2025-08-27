import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiUpload, FiCamera, FiImage, FiSearch, FiExternalLink, FiFolder, FiZap, FiStar, FiTrendingUp } from "react-icons/fi";
import Navbar from "../components/Navbar";

function ImagePage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setResponse(null);
    setError(null);

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("http://localhost:8000/api/images/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResponse(res.data);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getBrandLink = (item) => {
    if (item.link && item.link.startsWith("http")) return item.link;

    const brandDomains = {
      Zara: "zara.com",
      "H&M": "hm.com",
      Uniqlo: "uniqlo.com",
      Nike: "nike.com",
      Adidas: "adidas.com",
      Shein: "shein.com",
      Amazon: "amazon.com",
      Myntra: "myntra.com",
      Flipkart: "flipkart.com",
    };

    const domain = brandDomains[item.source] || null;

    if (domain) {
      return `https://www.google.com/search?q=${encodeURIComponent(
        item.title + " " + item.source
      )}+site:${domain}`;
    }

    return `https://www.google.com/search?q=${encodeURIComponent(
      item.title + " " + (item.source || "")
    )}`;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const droppedFile = droppedFiles[0];
      if (droppedFile.type.startsWith("image/")) {
        setFile(droppedFile);
        setPreview(URL.createObjectURL(droppedFile));
        setResponse(null);
        setError(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Navbar />
      
      {/* Enhanced Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 right-16 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-24 left-16 w-96 h-96 bg-teal-200/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-emerald-300/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-teal-300/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Enhanced Header */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
              <FiZap className="mr-2 h-4 w-4" />
              AI-Powered Visual Search
            </span>
          </div>

          <div className="relative">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light mb-6 text-slate-800 leading-tight tracking-tight">
              Visual Fashion{" "}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl transform -rotate-1"></span>
                <span className="relative px-8 py-3 text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl shadow-2xl">
                  Discovery
                </span>
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Upload any clothing image and discover similar products from top brands using advanced AI technology
            </p>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <FiCamera className="h-4 w-4 text-emerald-600" />
                <span>AI Image Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <FiSearch className="h-4 w-4 text-emerald-600" />
                <span>Smart Product Search</span>
              </div>
              <div className="flex items-center gap-2">
                <FiTrendingUp className="h-4 w-4 text-emerald-600" />
                <span>Brand Discovery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Main Content Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden mb-12">
          {/* Upload Section */}
          <div className="p-8 sm:p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              
              {/* Enhanced Image Upload Area */}
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl mb-4 shadow-lg">
                    <FiImage className="text-white text-2xl" />
                  </div>
                  <h3 className="text-2xl font-light text-slate-800 mb-3">Upload Your Image</h3>
                  <p className="text-slate-600">Drag and drop your fashion image or click to browse</p>
                </div>

                {/* Enhanced Preview Area */}
                <div
                  className="relative group"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {preview ? (
                    <div className="relative">
                      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 to-white p-4 shadow-xl border border-slate-200">
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-full max-w-lg mx-auto rounded-2xl object-contain max-h-[70vh] shadow-lg"
                        />
                        <div className="absolute inset-4 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      <button
                        onClick={() => {
                          setFile(null);
                          setPreview(null);
                          setResponse(null);
                          setError(null);
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg hover:shadow-xl transform hover:scale-110 transition-transform duration-200"
                      >
                        ×
                      </button>

                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-slate-200">
                          <span className="text-sm font-medium text-slate-700">Click to remove</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="border-2 border-dashed border-emerald-300 rounded-3xl p-12 lg:p-16 text-center hover:border-emerald-400 hover:bg-emerald-50/30 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <div className="relative space-y-6">
                        <div className="relative">
                          <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <FiUpload className="text-4xl text-emerald-600" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <FiZap className="text-white text-xs" />
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-xl font-medium text-slate-800 mb-3">Drop your fashion image here</p>
                          <p className="text-slate-600 mb-4">or click to browse from your device</p>
                          
                          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 rounded-full border border-slate-200 text-sm text-slate-500">
                            <span>Supports:</span>
                            <div className="flex gap-2">
                              <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-medium">PNG</span>
                              <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-medium">JPG</span>
                              <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-medium">JPEG</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Enhanced File Input */}
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="group relative block w-full py-4 px-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-medium text-lg text-center cursor-pointer hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <span className="relative flex items-center justify-center gap-3">
                      <FiCamera className="text-xl" />
                      Choose Fashion Image
                    </span>
                  </label>
                </div>
              </div>

              {/* Enhanced Analysis Section */}
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl mb-4 shadow-lg">
                    <FiSearch className="text-white text-2xl" />
                  </div>
                  <h3 className="text-2xl font-light text-slate-800 mb-3">AI-Powered Analysis</h3>
                  <p className="text-slate-600">Get instant fashion insights and product matches</p>
                </div>

                {/* Enhanced Upload Button */}
                <button
                  onClick={handleUpload}
                  disabled={loading || !file}
                  className="group relative w-full py-5 px-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:hover:scale-100 disabled:hover:shadow-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  
                  <span className="relative flex items-center justify-center gap-4">
                    {loading ? (
                      <>
                        <div className="relative">
                          <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                          <div className="absolute inset-0 rounded-full border-2 border-white/30"></div>
                        </div>
                        <span>Analyzing Your Style...</span>
                      </>
                    ) : (
                      <>
                        <FiZap className="text-xl" />
                        <span>Discover Similar Items</span>
                        <FiStar className="text-lg opacity-70" />
                      </>
                    )}
                  </span>
                </button>

                {/* Enhanced Error Display */}
                {error && (
                  <div className="relative bg-red-50 border border-red-200 rounded-2xl p-6 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-pink-500/5"></div>
                    <div className="relative flex items-start gap-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full mt-1 flex-shrink-0"></div>
                      <div>
                        <p className="text-red-800 font-semibold mb-1">Analysis Error</p>
                        <p className="text-red-600">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Enhanced Analysis Result */}
                {response && (
                  <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-200 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5"></div>
                    
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse"></div>
                        <h4 className="text-xl font-semibold text-slate-800">Analysis Complete!</h4>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 shadow-sm">
                          <div className="flex items-center gap-3 mb-3">
                            <FiZap className="h-5 w-5 text-emerald-600" />
                            <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Detected Style</p>
                          </div>
                          <p className="text-slate-800 font-medium text-lg leading-relaxed">
                            {response.prompt || "Style analysis in progress..."}
                          </p>
                        </div>

                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 shadow-sm">
                          <div className="flex items-center gap-3 mb-4">
                            <FiFolder className="h-5 w-5 text-emerald-600" />
                            <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Fashion Categories</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {response.categories?.length > 0 ? (
                              response.categories.map((category, index) => (
                                <span
                                  key={index}
                                  className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                                >
                                  {category}
                                </span>
                              ))
                            ) : (
                              <div className="flex items-center gap-2 text-slate-500">
                                <div className="w-2 h-2 bg-slate-300 rounded-full animate-pulse"></div>
                                <span className="text-sm">Analyzing categories...</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Results Section */}
          {response && (
            <div className="border-t border-slate-200 bg-gradient-to-br from-slate-50/80 to-white/80 p-8 sm:p-12 lg:p-16">
              <div className="mb-12 text-center">
                <div className="inline-flex items-center gap-3 mb-4">
                  <FiTrendingUp className="h-6 w-6 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-700 uppercase tracking-wide">Discovery Results</span>
                </div>
                
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-800 mb-4">
                  Similar Products Found
                </h3>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  Discover {response.search_results?.length || 0} perfectly matched items from premium fashion brands
                </p>
              </div>

              {response.search_results && response.search_results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {response.search_results.map((item, idx) => (
                    <a
                      key={idx}
                      href={getBrandLink(item)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden border border-slate-200/50"
                      style={{
                        animationDelay: `${idx * 150}ms`,
                        animation: "fadeInUp 0.8s ease-out forwards",
                      }}
                    >
                      {/* Enhanced Product Image */}
                      <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-slate-50 to-white">
                        {item.thumbnail ? (
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-56 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                            <FiImage className="text-5xl text-slate-400" />
                          </div>
                        )}

                        {/* Enhanced overlay effects */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* External link icon */}
                        <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 shadow-lg">
                          <FiExternalLink className="text-slate-700 text-sm" />
                        </div>

                        {/* Brand badge */}
                        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-700 rounded-full text-xs font-medium border border-slate-200">
                            {item.source}
                          </span>
                        </div>
                      </div>

                      {/* Enhanced Product Details */}
                      <div className="p-6 space-y-4">
                        <h4 className="text-slate-800 font-medium text-lg line-clamp-2 group-hover:text-emerald-600 transition-colors duration-300 leading-tight">
                          {item.title}
                        </h4>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-2xl font-bold text-slate-900">{item.price}</p>
                            <p className="text-sm text-slate-500">Best Price Match</p>
                          </div>
                          
                          <div className="text-right">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-2 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                              <FiStar className="text-white text-lg" />
                            </div>
                            <span className="text-xs text-slate-500 font-medium">Premium Brand</span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100">
                          <div className="flex items-center justify-between text-sm text-slate-500">
                            <span>View Product</span>
                            <FiExternalLink className="h-4 w-4 group-hover:text-emerald-600 transition-colors" />
                          </div>
                        </div>
                      </div>

                      {/* Enhanced hover glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-teal-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-16 border border-slate-200 max-w-lg mx-auto">
                    <div className="w-32 h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full mx-auto mb-8 flex items-center justify-center">
                      <FiSearch className="text-6xl text-slate-400" />
                    </div>
                    <h4 className="text-2xl font-light text-slate-700 mb-3">No Similar Products Found</h4>
                    <p className="text-slate-500 leading-relaxed">
                      We couldn't find matching products for this image. Try uploading a clearer image or a different fashion item.
                    </p>
                    <div className="mt-6 pt-6 border-t border-slate-100">
                      <p className="text-sm text-slate-400">
                        Our AI is constantly learning and improving
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}

export default ImagePage;