import React, { useEffect, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import Popup from "components/shared/Popup/Popup";
import {
  FiChevronUp,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

type HeaderProps = {
  handleShowFilter: () => void;
  showFilter: boolean;
  changeSortBy: (value: string) => void;
  count: number;
  openMobileFilter: () => void;
  searchQuery: string;
};

const Header = ({
  handleShowFilter,
  showFilter,
  changeSortBy,
  count,
  openMobileFilter,
  searchQuery,
}: HeaderProps) => {
  const [hiddenHeader, setHiddenHeader] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setHiddenHeader(true);
      } else {
        setHiddenHeader(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed w-full z-40">
        <div
          className={`container mx-auto hidden lg:flex justify-between items-center font-medium bg-white pb-4 z-30
          transition-all duration-500 ease-in-out
        ${hiddenHeader ? "pt-4" : "pt-24"}
        `}
        >
          <h1 className="text-2xl">
            {searchQuery ? searchQuery : "Products"} ({count})
          </h1>
          <div className="flex space-x-6 relative">
            <div
              className="flex items-center space-x-1 cursor-pointer relative"
              onClick={handleShowFilter}
            >
              {showFilter ? <p>Hide Filter</p> : <p>Show Filter</p>}
              {showFilter ? <FiChevronLeft /> : <FiChevronRight />}
            </div>
            <Popup
              header={
                <div className="flex items-center space-x-1 cursor-pointer">
                  <p>Sort By</p> <FiChevronDown />
                </div>
              }
            >
              <div className="p-2 flex flex-col items-end">
                <p
                  className="cursor-pointer hover:text-gray-500"
                  onClick={() => {
                    changeSortBy("rating");
                  }}
                >
                  Rating
                </p>
                <p
                  className="cursor-pointer hover:text-gray-500"
                  onClick={() => {
                    changeSortBy("priceAsc");
                  }}
                >
                  Price: Low-High
                </p>
                <p
                  className="cursor-pointer hover:text-gray-500"
                  onClick={() => {
                    changeSortBy("priceDesc");
                  }}
                >
                  Price: High-Low
                </p>
              </div>
            </Popup>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="flex lg:hidden flex-col font-medium bg-white pt-24 z-30">
        <div className="border-gray border-b-2">
          <h1 className="container mx-auto text-xl pb-4">Products</h1>
        </div>
        <div className="container mx-auto flex justify-between items-center py-4 relative">
          <p className="text-gray-500">{count} Results</p>
          <div
            className="flex items-center space-x-1 cursor-pointer relative border-gray border-2 rounded-md px-2 py-1"
            onClick={openMobileFilter}
          >
            <p>Filter</p>
            <FiChevronLeft />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
