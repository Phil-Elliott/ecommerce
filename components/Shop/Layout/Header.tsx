import Popup from "components/shared/Popup/Popup";
import * as Popover from "@radix-ui/react-popover";
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
  const [hiddenHeader, setHiddenHeader] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setHiddenHeader(true);
      } else {
        setHiddenHeader(false);
      }
      lastScrollY = currentScrollY;
    });
  });

  return (
    <>
      <div className="fixed w-full z-40">
        <div
          className={`container mx-auto hidden lg:flex justify-between items-center font-medium bg-white pb-4 z-30
          transition-all duration-500 ease-in-out
        ${hiddenHeader ? "pt-4" : "pt-28"}
        `}
        >
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
            <Popover.Root>
              <Popover.Trigger className="flex items-center space-x-1 cursor-pointer relative">
                <p>Sort By</p> <FiChevronDown />
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  align="end"
                  className="flex flex-col space-y-2 p-4 items-end font-normal bg-white shadow-sm rounded-md z-10 bg-white cursor-default"
                >
                  <p
                    className="cursor-pointer hover:text-gray-500"
                    onClick={() => {
                      changeSortBy("date");
                    }}
                  >
                    Start date
                  </p>
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
                  <Popover.Arrow />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
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
