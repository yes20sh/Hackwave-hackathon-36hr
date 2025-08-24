// import React from "react";

// // Render stars for rating (rounded)
// const renderStars = (rating) => {
//   const stars = [];
//   const maxStars = 5;
//   const roundedRating = Math.round(rating);
//   for (let i = 1; i <= maxStars; i++) {
//     stars.push(
//       <span key={i} className={i <= roundedRating ? "text-yellow-400" : "text-gray-300"}>
//         ★
//       </span>
//     );
//   }
//   return stars;
// };

// const ProductCard = ({ item }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
//       {/* Thumbnail */}
//       {item.thumbnail && (
//         <img
//           src={item.thumbnail}
//           alt={item.title}
//           className="w-full h-48 object-cover"
//         />
//       )}

//       {/* Content */}
//       <div className="p-4">
//         <h2 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h2>
//         <p className="text-sm text-gray-500 mb-2">Source: {item.source}</p>

//         {/* Price Section */}
//         <div className="mb-3">
//           <p className="text-blue-600 font-bold text-lg">{item.price}</p>
//           {item.old_price && (
//             <p className="text-gray-500 text-sm line-through">{item.old_price}</p>
//           )}
//         </div>

//         {/* Rating */}
//         {item.rating ? (
//           <div className="flex items-center mb-3">
//             {renderStars(item.rating)}
//             <span className="ml-2 text-sm text-gray-600">{item.rating.toFixed(1)}</span>
//           </div>
//         ) : (
//           <p className="text-sm text-gray-400 mb-3">No rating available</p>
//         )}

//         {/* Link */}
//         <a
//           href={item.product_link}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="inline-block w-full text-center bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
//         >
//           View Product
//         </a>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;


import React from "react";

// Render stars for rating (rounded)
const renderStars = (rating) => {
  const stars = [];
  const maxStars = 5;
  const roundedRating = Math.round(rating);
  for (let i = 1; i <= maxStars; i++) {
    stars.push(
      <span key={i} className={i <= roundedRating ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    );
  }
  return stars;
};

// Highlight search keywords in a text
const highlightKeyword = (text, keyword) => {
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className="bg-yellow-200">{part}</span>
    ) : (
      part
    )
  );
};

const ProductCard = ({ item, keyword }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Thumbnail */}
      {item.thumbnail && (
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-48 object-contain bg-gray-100"
        />
      )}

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h2 className="font-semibold text-lg mb-2 line-clamp-2">
          {highlightKeyword(item.title, keyword)}
        </h2>

        {item.description && (
          <p className="text-sm text-gray-500 mb-2 line-clamp-3">
            {highlightKeyword(item.description, keyword)}
          </p>
        )}

        <p className="text-sm text-gray-500 mb-2">Listed at : {item.source}</p>

        {/* Price Section */}
        <div className="mb-3">
          <p className="text-blue-600 font-bold text-lg">{item.price}</p>
          {item.old_price && (
            <p className="text-gray-500 text-sm line-through">{item.old_price}</p>
          )}
        </div>

        {/* Rating */}
        {item.rating ? (
          <div className="flex items-center mb-3">
            {renderStars(item.rating)}
            <span className="ml-2 text-sm text-gray-600">{item.rating.toFixed(1)}</span>
          </div>
        ) : (
          <p className="text-sm text-gray-400 mb-3">No rating available</p>
        )}

        {/* Link Button (push to bottom) */}
        <a
          href={item.product_link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-block w-full text-center bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          View Product
        </a>
      </div>
    </div>
  );
};

export default ProductCard;

