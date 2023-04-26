import { TourProps } from "components/shared/Types/Types";
import React from "react";

type FilterProps = {
  tours: TourProps[];
};

const Filter = ({ tours }: FilterProps) => {
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

  return (
    <div className="flex flex-col space-y-2 overflow-y-scroll max-h-filter-height w-full sticky top-40 scrollbar">
      <div className="border-gray border-b-2 pb-2 mr-4">
        <h1 className="text-xl font-semibold pb-4">Categories</h1>
        {categories.map((category) => (
          <div key={category} className="flex items-center space-x-2 pb-2">
            <input
              type="checkbox"
              name="category"
              id={category}
              value={category}
            />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>
      <div className="border-gray border-b-2 pb-2 mr-4">
        <h1 className="text-xl font-semibold pb-4">Locations</h1>
        {locations.map((location) => (
          <div key={location} className="flex items-center space-x-2 pb-2">
            <input
              type="checkbox"
              name="category"
              id={location}
              value={location}
            />
            <label htmlFor={location}>{location}</label>
          </div>
        ))}
      </div>
      <div className="border-gray border-b-2 pb-2 mr-4">
        <h1 className="text-xl font-semibold pb-4">Activities</h1>
        {locations.map((location) => (
          <div key={location} className="flex items-center space-x-2 pb-2">
            <input
              type="checkbox"
              name="category"
              id={location}
              value={location}
            />
            <label htmlFor={location}>{location}</label>
          </div>
        ))}
      </div>
      <div className="border-gray border-b-2 pb-2 mr-4">
        <h1 className="text-xl font-semibold pb-4">Categories</h1>
        {categories.map((category) => (
          <div key={category} className="flex items-center space-x-2 pb-2">
            <input
              type="checkbox"
              name="category"
              id={category}
              value={category}
            />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
