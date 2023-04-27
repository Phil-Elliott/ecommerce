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

  return (
    <div className="flex flex-col space-y-2 overflow-y-scroll max-h-filter-height w-full sticky top-40 scrollbar">
      <div className="border-gray border-b-2 pb-2 mr-6">
        <h1 className="text-xl font-semibold pb-4">Categories</h1>
        {categories.map((category) => (
          <div
            key={category}
            className="flex items-center space-x-2 pb-2 relative"
          >
            <div className="relative flex">
              <input
                type="checkbox"
                name="category"
                id={category}
                value={category}
                className="custom-checkbox w-4 h-4 bg-transparent border border-gray-500 rounded appearance-none focus:outline-none"
              />
            </div>
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>
      <div className="border-gray border-b-2 pb-2 mr-6">
        <h1 className="text-xl font-semibold pb-4">Locations</h1>
        {locations.map((location) => (
          <div
            key={location}
            className="flex items-center space-x-2 pb-2 relative"
          >
            <div className="relative flex">
              <input
                type="checkbox"
                name="location"
                id={location}
                value={location}
                className="custom-checkbox w-4 h-4 bg-transparent border border-gray-500 rounded appearance-none focus:outline-none"
              />
            </div>
            <label htmlFor={location}>{location}</label>
          </div>
        ))}
      </div>
      <div className="border-gray border-b-2 pb-2 mr-6">
        <h1 className="text-xl font-semibold pb-4">Activities</h1>
        {activities.map((activity) => (
          <div
            key={activity}
            className="flex items-center space-x-2 pb-2 relative"
          >
            <div className="relative flex">
              <input
                type="checkbox"
                name="activity"
                id={activity}
                value={activity}
                className="custom-checkbox w-4 h-4 bg-transparent border border-gray-500 rounded appearance-none focus:outline-none"
              />
            </div>
            <label htmlFor={activity}>{activity}</label>
          </div>
        ))}
      </div>
      <div className="border-gray border-b-2 pb-2 mr-6">
        <h1 className="text-xl font-semibold pb-4">Difficulty</h1>
        {difficulties.map((difficulty) => (
          <div
            key={difficulty}
            className="flex items-center space-x-2 pb-2 relative"
          >
            <div className="relative flex">
              <input
                type="checkbox"
                name="difficulty"
                id={difficulty}
                value={difficulty}
                className="custom-checkbox w-4 h-4 bg-transparent border border-gray-500 rounded appearance-none focus:outline-none"
              />
            </div>
            <label htmlFor={difficulty}>{difficulty}</label>
          </div>
        ))}
      </div>
      <div className="border-gray border-b-2 pb-2 mr-6">
        <h1 className="text-xl font-semibold pb-4">Price</h1>
        {prices.map((price) => (
          <div key={price} className="flex items-center space-x-2 pb-2">
            <div className="relative flex">
              <input
                type="checkbox"
                name="price"
                id={price}
                value={price}
                className="custom-checkbox w-4 h-4 bg-transparent border border-gray-500 rounded appearance-none focus:outline-none"
              />
            </div>
            <label htmlFor={price}>{price}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
