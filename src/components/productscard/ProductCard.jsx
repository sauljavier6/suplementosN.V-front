import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
    const navigate = useNavigate();

  const handleDetailsClick = () => {
    console.log("Detalles del producto:", product);
    navigate(`/detalles/${product.id}`);
  };

  return (
    <div
      onClick={handleDetailsClick}
      className="bg-white group p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer w-full"
    >
      <div className="w-full aspect-square rounded-lg mb-4 overflow-hidden">
        <img
          src={product.image_url}
          alt={product.item_name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg"
        />
      </div>

      <h2 className="text-lg font-semibold text-black mb-1">
        {product.item_name}
      </h2>

      <p className="text-sm text-black mb-3">
        <span className="font-semibold text-black">Color:</span> {product.color}
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDetailsClick(e);
        }}
        className="mt-auto px-4 py-2 bg-black text-white rounded hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
      >
        Detalles
      </button>
    </div>
  );
} 