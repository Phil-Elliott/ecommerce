import Popup from "components/shared/Popup/Popup";
import React, { useEffect, useState, useRef } from "react";
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
  const [display, setDisplay] = useState<boolean>(false);
  const sortByRef = useRef(null);

  return (
    <>
      <div className="fixed w-full z-40">
        <div className="container mx-auto hidden lg:flex justify-between items-center font-medium bg-white pt-28 pb-2 z-30">
          <h1 className="text-2xl">
            {searchQuery ? searchQuery : "Tour Packages"} ({count})
          </h1>
          <div className="flex space-x-6 relative">
            <div
              className="flex items-center space-x-1 cursor-pointer relative"
              onClick={handleShowFilter}
            >
              {showFilter ? <p>Hide Filter</p> : <p>Show Filter</p>}
              {showFilter ? <FiChevronLeft /> : <FiChevronRight />}
            </div>
            <div
              ref={sortByRef}
              className="flex items-center space-x-1 cursor-pointer relative"
              onClick={() => setDisplay(!display)}
            >
              <p>Sort By</p>
              {display ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {display && (
              <Popup close={() => setDisplay(false)} ignoreRef={sortByRef}>
                <div className="flex flex-col space-y-2 p-4 items-end font-normal">
                  <p
                    className="cursor-pointer"
                    onClick={() => {
                      changeSortBy("date");
                      setDisplay(false);
                    }}
                  >
                    Start date
                  </p>
                  <p
                    className="cursor-pointer"
                    onClick={() => {
                      changeSortBy("rating");
                      setDisplay(false);
                    }}
                  >
                    Rating
                  </p>
                  <p
                    className="cursor-pointer"
                    onClick={() => {
                      changeSortBy("priceAsc");
                      setDisplay(false);
                    }}
                  >
                    Price: Low-High
                  </p>
                  <p
                    className="cursor-pointer"
                    onClick={() => {
                      changeSortBy("priceDesc");
                      setDisplay(false);
                    }}
                  >
                    Price: High-Low
                  </p>
                </div>
              </Popup>
            )}
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
