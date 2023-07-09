import React from "react";
import { GameProps } from "components/shared/Types/Types";
import { Ratings } from "components/shared";

type RatingsProps = {
  game: GameProps | null;
};

const ratingsData = [
  {
    rating: "5 Stars",
    percentage: 80,
    NumberOfRatings: 16,
  },
  {
    rating: "4 Stars",
    percentage: 10,
    NumberOfRatings: 2,
  },
  {
    rating: "3 Stars",
    percentage: 5,
    NumberOfRatings: 1,
  },
  {
    rating: "2 Stars",
    percentage: 5,
    NumberOfRatings: 1,
  },
  {
    rating: "1 Stars",
    percentage: 0,
    NumberOfRatings: 0,
  },
];

const RatingsContainer = ({ game }: RatingsProps) => {
  return (
    <div className="pt-10 mt-10 border-t-2 border-gray-200">
      <h2 className="text-2xl font-semibold mb-5">Ratings and Reviews</h2>
      <div className="grid grid-cols-2 gap-10 pt-10 space-x-5">
        <div className="flex flex-col space-y-2 items-center w-full border-r-2 border-gray-400 pr-10">
          <p className="text-3xl">{game?.rating}</p>
          <Ratings rating={game?.rating || 5} />
          <p className="text-gray-500">(12) Ratings</p>
          <div className="flex flex-col space-y-3 w-full pt-5">
            <button
              className="bg-black text-white px-4 py-2 rounded hover:opacity-75 hover:shadow-lg"
              // onClick={() => game && addToCart(game)}
            >
              Write A Review
            </button>
            <button
              className="px-4 py-2 rounded border-black border-2 hover:shadow-lg"
              // onClick={() => game && addToWishList(game)}
            >
              Show All Reviews
            </button>
          </div>
        </div>
        <div className="flex justify-center flex-col">
          {ratingsData.map((rating, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-5 py-1"
            >
              <p>{rating.rating}</p>
              <div className="flex-1">
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex bg-gray-200">
                    <div
                      style={{ width: `${rating.percentage}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-black"
                    ></div>
                  </div>
                </div>
              </div>
              <p>{rating.NumberOfRatings}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingsContainer;
