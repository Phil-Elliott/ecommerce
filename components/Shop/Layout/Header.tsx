import React from "react";
import { FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";

type HeaderProps = {
  handleShowFilter: () => void;
  showFilter: boolean;
};

const Header = ({ handleShowFilter, showFilter }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center font-medium fixed bg-white container mx-auto pt-28 pb-2 z-30">
      <h1 className="text-3xl">Products</h1>
      <div className="flex space-x-6">
        <div
          className="flex items-center space-x-1 cursor-pointer"
          onClick={handleShowFilter}
        >
          {showFilter ? <p>Hide Filter</p> : <p>Show Filter</p>}
          {showFilter ? <FiChevronLeft /> : <FiChevronRight />}
        </div>
        <div className="flex items-center space-x-1 cursor-pointer">
          <p>Sort By</p>
          <FiChevronDown />
        </div>
      </div>
    </div>
  );
};

export default Header;
