import React from "react";

const CategoryButtons = ({ onSelect }) => (
  <div className="flex w-full justify-center gap-3 py-3 px-2 bg-white sticky top-0 z-20">
    <button
      className="flex-1 py-3 rounded-xl bg-pink-100 text-pink-700 font-semibold text-sm shadow hover:bg-pink-200 transition"
      onClick={() => onSelect && onSelect('boutique')}
    >
      Her Boutique
    </button>
    <button
      className="flex-1 py-3 rounded-xl bg-blue-100 text-blue-700 font-semibold text-sm shadow hover:bg-blue-200 transition"
      onClick={() => onSelect && onSelect('toys')}
    >
      Her Toys
    </button>
    <button
      className="flex-1 py-3 rounded-xl bg-yellow-100 text-yellow-700 font-semibold text-sm shadow hover:bg-yellow-200 transition"
      onClick={() => onSelect && onSelect('scent')}
    >
      Her Scent
    </button>
  </div>
);

export default CategoryButtons;
