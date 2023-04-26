import React from "react";
import { FiChevronDown, FiChevronLeft } from "react-icons/fi";

const Header = () => {
  return (
    <div className="flex justify-between items-center font-medium pb-10">
      <h1 className="text-3xl">Products</h1>
      <div className="flex space-x-6">
        <div className="flex items-center space-x-1">
          <p>Hide Filter</p>
          <FiChevronLeft />
        </div>
        <div className="flex items-center space-x-1">
          <p>Sort By</p>
          <FiChevronDown />
        </div>
      </div>
    </div>
  );
};

export default Header;
