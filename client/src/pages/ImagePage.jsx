// import React, { useState } from "react";
// import axios from "axios";

// function ImagePage() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setResponse(null);
//     setError(null);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setError("Please select an image first.");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const res = await axios.post("http://localhost:8000/api/images/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       console.log("API Response:", res.data); // 🔍 Debug log
//       setResponse(res.data);
//     } catch (err) {
//       console.error("Upload error:", err);
//       setError(err.response?.data?.detail || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
//       <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl">
//         <h1 className="text-2xl font-bold text-center mb-4">Upload Clothing Image</h1>

//         {/* File Upload */}
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="mb-4 w-full border p-2 rounded"
//         />

//         {/* Upload Button */}
//         <button
//           onClick={handleUpload}
//           disabled={loading}
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 disabled:opacity-50"
//         >
//           {loading ? "Analyzing..." : "Upload & Analyze"}
//         </button>

//         {/* Error Message */}
//         {error && <p className="text-red-500 mt-3 text-center">{error}</p>}

//         {/* Response */}
//         {response && (
//           <div className="mt-6">
//             <h2 className="text-lg font-semibold mb-2">Analysis Result:</h2>
//             <p><strong>Prompt:</strong> {response.prompt || "N/A"}</p>
//             <p><strong>Categories:</strong> {response.categories?.join(", ") || "N/A"}</p>

//             <h3 className="text-lg font-semibold mt-4">Shopping Results:</h3>
//             <ul className="space-y-3 mt-2">
//               {response.search_results && response.search_results.length > 0 ? (
//                 response.search_results.map((item, idx) => (
//                   <li key={idx} className="p-3 border rounded-lg flex items-center gap-4">
//                     {item.thumbnail && (
//                       <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover rounded" />
//                     )}
//                     <div>
//                       <a
//                         href={item.link}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-600 font-medium hover:underline"
//                       >
//                         {item.title}
//                       </a>
//                       <p className="text-gray-700">{item.price}</p>
//                       <p className="text-sm text-gray-500">{item.source}</p>
//                     </div>
//                   </li>
//                 ))
//               ) : (
//                 <p className="text-gray-500">No shopping results found.</p>
//               )}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ImagePage;
import React, { useState } from "react";
import axios from "axios";

function ImagePage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // preview for uploaded image
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

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

      console.log("API Response:", res.data);
      setResponse(res.data); // ✅ keep original functionality
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Helper: build link directly to brand's site if possible
  const getBrandLink = (item) => {
    if (item.link && item.link.startsWith("http")) {
      return item.link;
    }

    // map brand/source names to domains
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

    // fallback: generic google search
    return `https://www.google.com/search?q=${encodeURIComponent(
      item.title + " " + (item.source || "")
    )}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-lg p-6 sm:p-8">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
          Upload & Analyze Clothing
        </h1>

        {/* Upload Section */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Preview */}
          <div className="flex-1 flex flex-col items-center">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full max-w-sm rounded-xl shadow mb-4 object-cover"
              />
            ) : (
              <div className="w-full max-w-sm h-48 flex items-center justify-center bg-gray-200 rounded-xl text-gray-500 mb-4">
                No Image Selected
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full max-w-sm border p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Upload Button & Response */}
          <div className="flex-1 flex flex-col">
            <button
              onClick={handleUpload}
              disabled={loading}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Upload & Analyze"}
            </button>

            {error && (
              <p className="text-red-500 mt-3 text-center md:text-left">{error}</p>
            )}

            {/* Analysis Result */}
            {response && (
              <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Analysis Result
                </h2>
                <p className="text-gray-700 mb-1">
                  <strong>Prompt:</strong> {response.prompt || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>Categories:</strong>{" "}
                  {response.categories?.join(", ") || "N/A"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Shopping Results */}
        {response && (
          <div className="mt-10">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
              Similar Products
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {response.search_results && response.search_results.length > 0 ? (
                response.search_results.map((item, idx) => (
                  <a
                    key={idx}
                    href={getBrandLink(item)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border rounded-lg shadow-sm hover:shadow-md transition p-3 flex flex-col cursor-pointer"
                  >
                    {item.thumbnail && (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-40 object-contain rounded-md mb-3 bg-gray-100"
                      />
                    )}
                    <h4 className="text-blue-600 font-medium hover:underline line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-800 font-semibold mt-1">{item.price}</p>
                    <p className="text-sm text-gray-500">{item.source}</p>
                  </a>
                ))
              ) : (
                <p className="text-gray-500 col-span-full text-center">
                  No shopping results found.
                </p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImagePage;
