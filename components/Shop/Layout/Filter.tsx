import React, { useEffect, useState } from "react";
import { TourProps } from "components/shared/Types/Types";

import { BsChevronDown } from "react-icons/bs";

type FilterProps = {
  tours: TourProps[];
};

type FilterOption = {
  name: string;
  options: string[];
  show: boolean;
};

const Filter = ({ tours }: FilterProps) => {
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([
    {
      name: "Category",
      options: [],
      show: true,
    },
    {
      name: "Location",
      options: [],
      show: true,
    },
    {
      name: "Activities",
      options: [],
      show: true,
    },
    {
      name: "Difficulty",
      options: [],
      show: true,
    },
    {
      name: "Prices",
      options: [],
      show: true,
    },
  ]);

  const handleFilterClick = (name: string) => {
    setFilterOptions((prev) =>
      prev.map((filterOption) =>
        filterOption.name === name
          ? { ...filterOption, show: !filterOption.show }
          : filterOption
      )
    );
  };

  // Finds all of the categories in the tours array and removes duplicates
  const categories = tours
    .map((tour) => tour.category)
    .filter((category, index, self) => self.indexOf(category) === index);

  // Finds all of the locations in the tours array and removes duplicates
  const locations = tours
    .map((tour) => tour.location)
    .filter((location, index, self) => self.indexOf(location) === index);

  // Finds all of the activities in the tours array and removes duplicates
  const activities = tours
    .map((tour) => tour.activities)
    .flat()
    .filter((activity, index, self) => self.indexOf(activity) === index);

  // Finds all of the difficulties in the tours array and removes duplicates
  const difficulties = tours
    .map((tour) => tour.difficulty)
    .filter((difficulty, index, self) => self.indexOf(difficulty) === index);

  const prices = [
    "$0 - $500",
    "$500 - $1,000",
    "$1,000 - $1,500",
    "$1,500 - $2,000",
    "Over $2,000",
  ];

  useEffect(() => {
    setFilterOptions((prev) => [
      {
        name: "Category",
        options: categories,
        show: true,
      },
      {
        name: "Location",
        options: locations,
        show: true,
      },
      {
        name: "Activities",
        options: activities,
        show: true,
      },
      {
        name: "Difficulty",
        options: difficulties,
        show: true,
      },
      {
        name: "Prices",
        options: prices,
        show: true,
      },
    ]);
  }, []);

  return (
    <div className="flex flex-col space-y-2 overflow-y-scroll max-h-filter-height w-full sticky top-40 scrollbar">
      {filterOptions.map((filterOption) => (
        <div
          key={filterOption.name}
          className="border-gray border-b-2 pb-2 mr-6"
        >
          <div
            className="flex justify-between items-center pb-4 cursor-pointer"
            onClick={() => handleFilterClick(filterOption.name)}
          >
            <h1 className="text-xl font-semibold ">{filterOption.name}s</h1>
            <BsChevronDown className="text-xl" />
          </div>
          {filterOption.show
            ? filterOption.options.map((option) => (
                <div
                  key={option}
                  className="flex items-center space-x-2 pb-2 relative"
                >
                  <div className="relative flex ">
                    <input
                      type="checkbox"
                      name={filterOption.name}
                      id={option}
                      value={option}
                      className="cursor-pointer custom-checkbox w-4 h-4 bg-transparent border border-gray-500 rounded appearance-none focus:outline-none"
                    />
                  </div>
                  <label className="cursor-pointer" htmlFor={option}>
                    {option}
                  </label>
                </div>
              ))
            : null}
        </div>
      ))}
    </div>
  );
};

export default Filter;
