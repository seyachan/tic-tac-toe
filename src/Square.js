// Square.js
import React from 'react';

function Square({ value, onClick }) {
  return (
    <button
      className="w-20 h-20 border border-gray-400 text-3xl font-bold flex items-center justify-center hover:bg-gray-200 transition"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Square;
