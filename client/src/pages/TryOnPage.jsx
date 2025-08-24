import React, { useState, useEffect } from "react";
import axios from "axios";

function TryOnPage() {
  const [userImage, setUserImage] = useState(null);
  const [clothingImage, setClothingImage] = useState(null);
  const [userPreview, setUserPreview] = useState(null);
  const [clothingPreview, setClothingPreview] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Clean up created object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (userPreview) URL.revokeObjectURL(userPreview);
      if (clothingPreview) URL.revokeObjectURL(clothingPreview);
    };
  }, [userPreview, clothingPreview]);

  const handleUserImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserImage(file);
      setUserPreview(URL.createObjectURL(file));
      setGeneratedImage(null);
      setError(null);
    }
  };

  const handleClothingImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setClothingImage(file);
      setClothingPreview(URL.createObjectURL(file));
      setGeneratedImage(null);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!userImage || !clothingImage) {
      setError("Please upload both images.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("user_image", userImage);
      formData.append("outfit_image", clothingImage);

      const res = await axios.post(
        "http://localhost:8000/api/tryon/tryon",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: "blob",
          timeout: 60000, // timeout in ms - optional
        }
      );

      // Convert blob to base64 for display
      const reader = new FileReader();
      reader.readAsDataURL(res.data);
      reader.onloadend = () => setGeneratedImage(reader.result);
    } catch (err) {
      console.error("Try-on error:", err);
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else if (err.message) {
        setError(`Request failed: ${err.message}`);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-4">AI Try-On</h1>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Upload Your Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleUserImageChange}
            className="w-full mb-2"
            disabled={loading}
          />
          {userPreview && (
            <img
              src={userPreview}
              alt="User Preview"
              className="max-w-xs rounded mb-2"
            />
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Upload Clothing Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleClothingImageChange}
            className="w-full mb-2"
            disabled={loading}
          />
          {clothingPreview && (
            <img
              src={clothingPreview}
              alt="Clothing Preview"
              className="max-w-xs rounded mb-2"
            />
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Try-On"}
        </button>

        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}

        {generatedImage && (
          <div className="mt-6 text-center">
            <h2 className="text-lg font-semibold mb-2">Result:</h2>
            <img
              src={generatedImage}
              alt="Try-On Result"
              className="mx-auto max-w-full rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default TryOnPage;
