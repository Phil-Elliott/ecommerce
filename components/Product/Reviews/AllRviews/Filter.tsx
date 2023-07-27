import { Button, MobileHeader } from "components/shared";
import React, { useState } from "react";
import { BsFilter } from "react-icons/bs";

type FilterProps = {
  page: number;
  ratingsQuantity: number;
};

const Filter = ({ page, ratingsQuantity }: FilterProps) => {
  const [isMobileContainerOpen, setIsMobileContainerOpen] = useState(false);

  return (
    <>
      <div
        className="flex items-center gap-3 font-semibold cursor-pointer pb-6"
        onClick={() => setIsMobileContainerOpen(true)}
      >
        <BsFilter />
        <p>Filter</p>
      </div>
      <MobileHeader
        isOpen={isMobileContainerOpen}
        closeHandler={() => setIsMobileContainerOpen(false)}
        title="Filter"
        full
      >
        <div className="">
          <p className="font-medium text-gray-600 p-5">
            {`${(page - 1) * 10 + 1} - ${
              page * 10 > ratingsQuantity ? ratingsQuantity : page * 10
            } of ${ratingsQuantity} Reviews`}
          </p>
          <div className="flex gap-3 px-5 pb-5 border-b-2 border-gray-300">
            <Button
              className="w-full p-2 shadow border-black border-2 rounded-sm hover:bg-Secondary hover:text-white hover:border-Secondary"
              ariaLabel="Clear All"
              type="button"
              onClick={() => console.log("clear all")}
            >
              Clear All
            </Button>
            <Button
              className="w-full p-2 shadow bg-black text-white border-black border-2 rounded-sm hover:bg-Secondary hover:text-white hover:border-Secondary"
              ariaLabel="Apply"
              type="button"
              onClick={() => console.log("clear all")}
            >
              Apply
            </Button>
          </div>

          <div className="flex flex-col space-y-2 px-5 py-5 border-b-2 border-gray-300 font-semibold">
            <p className="">Ratings</p>
            <div className="flex items-center gap-3">
              <input type="checkbox" name="" id="" />
              <p>5 Stars</p>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" name="" id="" />
              <p>4 Stars</p>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" name="" id="" />
              <p>3 Stars</p>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" name="" id="" />
              <p>2 Stars</p>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" name="" id="" />
              <p>1 Star</p>
            </div>
          </div>
        </div>
      </MobileHeader>
    </>
  );
};

export default Filter;
