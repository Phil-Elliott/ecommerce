import React, { useEffect, useState } from "react";
import {
  FilterOption,
  FilteredOptionsProps,
} from "components/shared/Types/Types";
import { BsChevronDown, BsX } from "react-icons/bs";
import { useWindowResize } from "../../shared/Hooks/useWindowResize";
import { MobileHeader } from "components/shared";

type FilterProps = {
  addFilterOption: (name: keyof FilteredOptionsProps, option: string) => void;
  removeFilterOption: (
    name: keyof FilteredOptionsProps,
    option: string
  ) => void;
  isMobileFilterOpen: boolean;
  closeMobileFilter: () => void;
  changeSortBy: (value: string) => void;
  sortBy: string;
  filterOptionsSelected: FilteredOptionsProps;
  filterOptionsData: FilterOption[];
  setFilterOptionsData: React.Dispatch<React.SetStateAction<FilterOption[]>>;
};

const Filter = ({
  addFilterOption,
  removeFilterOption,
  isMobileFilterOpen,
  closeMobileFilter,
  changeSortBy,
  sortBy,
  filterOptionsSelected,
  filterOptionsData,
  setFilterOptionsData,
}: FilterProps) => {
  const mapFilterOptionNameToKey = (
    name: string
  ): keyof FilteredOptionsProps => {
    const nameKeyMap: Record<string, keyof FilteredOptionsProps> = {
      Category: "category",
      Publisher: "publisher",
      "Game Modes": "gameModes",
      Platform: "platform",
      Prices: "prices",
    };

    return nameKeyMap[name];
  };

  const handleSortByOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeSortBy(e.target.value);
  };

  const toggleFilterOption = (name: string) => {
    setFilterOptionsData((prev) =>
      prev.map((filterOption) =>
        filterOption.name === name
          ? { ...filterOption, show: !filterOption.show }
          : filterOption
      )
    );
  };

  // Use the useWindowResize hook
  const windowSize = useWindowResize();

  useEffect(() => {
    // Update the overflow property based on the window width and isMobileFilterOpen state
    if (windowSize.width <= 1024) {
      document.body.style.overflow = isMobileFilterOpen ? "hidden" : "auto";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function to set the overflow property back to auto when the component is unmounted
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [windowSize.width, isMobileFilterOpen]);

  const handleFilterOption = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: keyof FilteredOptionsProps
  ) => {
    if (e.target.checked) {
      addFilterOption(name, e.target.value);
    } else {
      removeFilterOption(name, e.target.value);
    }
  };

  return (
    <>
      <div className="w-1/4 lg:block hidden select-none">
        <div className="flex flex-col overflow-y-scroll max-h-filter-height w-full sticky top-16 scrollbar">
          {filterOptionsData.map((filterOption, i) => (
            <div
              key={filterOption.name}
              className={`border-gray pb-4 mr-6 ${
                i !== filterOptionsData.length - 1 ? "border-b-2" : "border-b-0"
              } ${i === 0 ? "pt-0" : "pt-4"}`}
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFilterOption(filterOption.name)}
              >
                <h1 className="text-xl text-base font-medium">
                  {filterOption.name}s
                </h1>
                <BsChevronDown className="text-lg" />
              </div>
              {filterOption.show ? (
                <div className="pt-4">
                  {filterOption.options.map((option, i) => (
                    <div
                      key={`${filterOption.name}-${option}`}
                      className="flex items-center space-x-2 pb-2 relative text-base"
                    >
                      <div className="relative flex ">
                        <input
                          type="checkbox"
                          name={filterOption.name}
                          id={option}
                          value={option}
                          checked={filterOptionsSelected[
                            mapFilterOptionNameToKey(filterOption.name)
                          ].includes(option)}
                          className="cursor-pointer custom-checkbox w-4 h-4 bg-transparent border border-gray-500 rounded appearance-none focus:outline-none"
                          onChange={(e) => {
                            handleFilterOption(
                              e,
                              mapFilterOptionNameToKey(filterOption.name)
                            );
                          }}
                        />
                      </div>
                      <label className="cursor-pointer" htmlFor={option}>
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <MobileHeader
        isOpen={isMobileFilterOpen}
        closeHandler={closeMobileFilter}
        title="Filter"
      >
        <div className="p-4 border-b-2">
          <h1 className="text-xl text-base font-medium mb-2">Sort By</h1>
          <div className="flex flex-col space-y-2 font-normal pt-4">
            {["-ratingsAverage", "price", "-price"].map((option) => (
              <div
                key={option}
                className="flex items-center space-x-2 pb-2 relative text-base"
              >
                <div className="relative flex">
                  <input
                    type="radio"
                    name="sortBy"
                    id={option}
                    value={option}
                    className="cursor-pointer custom-radio"
                    checked={
                      sortBy === option ||
                      (sortBy === undefined && option === "date")
                    }
                    onChange={handleSortByOption}
                  />
                </div>
                <label className="cursor-pointer" htmlFor={option}>
                  {option === "-ratingsAverage" && "Rating"}
                  {option === "price" && "Price: Low-High"}
                  {option === "-price" && "Price: High-Low"}
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* Filter section */}
        {filterOptionsData.map((filterOption, i) => (
          <div
            key={filterOption.name}
            className={`border-gray p-4 ${
              i !== filterOptionsData.length - 1 ? "border-b-2" : "border-b-0"
            }`}
          >
            <div
              className="flex justify-between items-center cursor-pointer mb-2"
              onClick={() => toggleFilterOption(filterOption.name)}
            >
              <h1 className="text-xl text-base font-medium">
                {filterOption.name}s
              </h1>
              <BsChevronDown className="text-lg" />
            </div>
            {filterOption.show ? (
              <div className="pt-4">
                {filterOption.options.map((option) => (
                  <div
                    key={`${filterOption.name}-${option}`}
                    className="flex items-center space-x-2 pb-2 relative text-base"
                  >
                    <div className="relative flex">
                      <input
                        type="checkbox"
                        name={filterOption.name}
                        id={`mobile-${option}`}
                        value={option}
                        checked={filterOptionsSelected[
                          mapFilterOptionNameToKey(filterOption.name)
                        ].includes(option)}
                        className="cursor-pointer custom-checkbox w-4 h-4 bg-transparent border border-gray-500 rounded appearance-none focus:outline-none"
                        onChange={(e) => {
                          handleFilterOption(
                            e,
                            mapFilterOptionNameToKey(filterOption.name)
                          );
                        }}
                      />
                    </div>
                    <label
                      className="cursor-pointer"
                      htmlFor={`mobile-${option}`}
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </MobileHeader>
    </>
  );
};

export default Filter;
