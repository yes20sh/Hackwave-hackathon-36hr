import React from "react";

const Card = ({ image, brand, name, price }) => {
  return (
    <div
      className="w-full max-w-[240px] sm:max-w-[260px] md:max-w-[280px] 
      rounded-2xl overflow-hidden shadow-lg
      bg-white/10 backdrop-blur-md border border-white/20
      hover:scale-105 transition-transform duration-300"
    >
      {/* Image */}
      <div className="w-full aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-2">
        {/* Brand + Price Row */}
        <div className="flex justify-between items-center">
          <span className="text-xs sm:text-sm text-gray-300 font-medium">
            {brand}
          </span>
          <span className="text-sm font-semibold text-white">
            ${price}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-sm font-semibold text-white line-clamp-2">
          {name}
        </h3>
      </div>
    </div>
  );
};

export default Card;
