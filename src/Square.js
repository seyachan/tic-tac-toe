import React from 'react';

function Square({ value, onClick }) {
  return (
   // Square.js
<button
  className="aspect-square w-20 border border-gray-400 text-3xl font-bold flex items-center justify-center hover:bg-gray-200 transition"
  onClick={onClick}
>
  {value}
</button>

  );
}

export default Square;
