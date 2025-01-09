import React from 'react';

const Tooltip = ({ children, text }) => {
  return (
    <div className="relative inline-block w-full group">
      {children}
      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block px-3 py-1 bg-gray-700 text-white text-xs md:text-sm rounded-md shadow-lg z-10">
        {text}
      </span>
    </div>
  );
};

export default Tooltip;