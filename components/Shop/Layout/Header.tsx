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
};

const Header = ({ handleShowFilter, showFilter }: HeaderProps) => {
  const [display, setDisplay] = useState<boolean>(false);
  const sortByRef = useRef(null);

  useEffect(() => {
    console.log("sortByRef", sortByRef.current);
  }, [sortByRef]);

  return (
    <div className="container mx-auto flex justify-between items-center font-medium bg-white pt-28 pb-2 z-30">
      <h1 className="text-3xl">Products</h1>
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
              <p>Start date</p>
              <p>Price: High-Low</p>
              <p>Price: Low-High</p>
            </div>
          </Popup>
        )}
      </div>
    </div>
  );
};

export default Header;
