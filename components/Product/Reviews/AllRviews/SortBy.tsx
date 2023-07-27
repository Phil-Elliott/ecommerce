import { Popup } from "components/shared";
import React from "react";
import { FiChevronDown } from "react-icons/fi";

type SortByProps = {
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const SortBy = ({ sort, setSort, setPage }: SortByProps) => {
  function handleSort(param: string) {
    if (sort === param) {
      return;
    } else {
      setSort(param);
      setPage(1);
    }
  }

  return (
    <Popup
      header={
        <div className="flex items-center space-x-1 cursor-pointer font-semibold">
          <p>Sort By</p> <FiChevronDown />
        </div>
      }
    >
      <div className="p-3 flex flex-col items-end space-y-2">
        <p
          className="cursor-pointer hover:text-gray-500"
          onClick={() => {
            handleSort("-rating");
          }}
        >
          Highest to Lowest Rating
        </p>
        <p
          className="cursor-pointer hover:text-gray-500"
          onClick={() => {
            handleSort("rating");
          }}
        >
          Lowest to Highest Rating
        </p>
        <p
          className="cursor-pointer hover:text-gray-500"
          onClick={() => {
            handleSort("-createdAt");
          }}
        >
          Most Recent
        </p>
        <p
          className="cursor-pointer hover:text-gray-500"
          onClick={() => {
            handleSort("createdAt");
          }}
        >
          Oldest
        </p>
      </div>
    </Popup>
  );
};

export default SortBy;
