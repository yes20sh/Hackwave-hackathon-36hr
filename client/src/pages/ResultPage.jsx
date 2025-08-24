import React from "react";

const ResultPage = ({ results }) => {
  if (!results || results.length === 0) {
    return <p className="text-center text-gray-600">No results to display.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {results.map((item, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded shadow hover:shadow-md transition"
        >
          <h2 className="font-semibold text-lg mb-2">{item.name}</h2>
          <p className="text-gray-700 mb-2">Price: ${item.price}</p>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Product
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResultPage;
