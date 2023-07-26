import React, { useState } from "react";
import { GameProps, Review, UserReview } from "components/shared/Types/Types";
import { Ratings } from "components/shared";

type RatingsProps = {
  game: GameProps | null;
  openReview: () => void;
  userHasReviewed: UserReview | null;
  ratingsAvg: number;
  ratingsQuantity: number;
  starRatings: Record<string, number>;
  setShowAllReviews: React.Dispatch<React.SetStateAction<boolean>>;
  showAllReviews: boolean;
};

const RatingsContainer = ({
  game,
  openReview,
  userHasReviewed,
  ratingsAvg,
  ratingsQuantity,
  starRatings,
  setShowAllReviews,
  showAllReviews,
}: RatingsProps) => {
  const transformedStarRatings = game
    ? Object.entries(starRatings).map(([star, count]) => ({
        rating: `${star} Stars`,
        NumberOfRatings: count,
        percentage: game.ratingsQuantity
          ? (count / game.ratingsQuantity) * 100
          : 0,
      }))
    : [];

  transformedStarRatings.reverse();

  return (
    <div className="pt-10 mt-10 border-t-2 border-gray-200">
      <h2 className="text-2xl font-semibold mb-5">Ratings and Reviews</h2>
      <div className="grid  lg:grid-cols-2 gap-10 pt-10 lg:space-x-5">
        <div className="flex flex-col space-y-2 items-center w-full border-b-2 lg:border-b-0 lg:border-r-2 border-gray-400 lg:pr-10 pb-10 lg:pb-0">
          <p className="text-3xl">{ratingsAvg.toFixed(2)}</p>
          <Ratings rating={ratingsAvg || 5} />
          <p className="text-gray-500">({ratingsQuantity}) Ratings</p>
          <div className="flex flex-col space-y-3 w-full pt-5">
            <button
              className="bg-black text-white px-4 py-2 rounded hover:opacity-75 hover:shadow-lg"
              onClick={() => openReview()}
            >
              {userHasReviewed !== null ? "Update Review" : "Write a Review"}
            </button>
            <button
              className="px-4 py-2 rounded border-black border-2 hover:shadow-lg"
              onClick={() => setShowAllReviews(!showAllReviews)}
            >
              {showAllReviews ? "Show Top Reviews" : "Show All Reviews"}
            </button>
          </div>
        </div>
        <div className="flex justify-center flex-col">
          {transformedStarRatings.map((rating, index) => (
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

/*


*/
