import React, { useState } from "react";
import axios from "axios";

function ImagePage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResponse(null);
    setError(null);
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

      console.log("API Response:", res.data); // 🔍 Debug log
      setResponse(res.data);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-4">Upload Clothing Image</h1>

        {/* File Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 w-full border p-2 rounded"
        />

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Upload & Analyze"}
        </button>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}

        {/* Response */}
        {response && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Analysis Result:</h2>
            <p><strong>Prompt:</strong> {response.prompt || "N/A"}</p>
            <p><strong>Categories:</strong> {response.categories?.join(", ") || "N/A"}</p>

            <h3 className="text-lg font-semibold mt-4">Shopping Results:</h3>
            <ul className="space-y-3 mt-2">
              {response.search_results && response.search_results.length > 0 ? (
                response.search_results.map((item, idx) => (
                  <li key={idx} className="p-3 border rounded-lg flex items-center gap-4">
                    {item.thumbnail && (
                      <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover rounded" />
                    )}
                    <div>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 font-medium hover:underline"
                      >
                        {item.title}
                      </a>
                      <p className="text-gray-700">{item.price}</p>
                      <p className="text-sm text-gray-500">{item.source}</p>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No shopping results found.</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImagePage;
