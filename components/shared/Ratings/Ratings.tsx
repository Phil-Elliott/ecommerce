import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

type StarRatingProps = {
  rating: number;
};

export const Ratings = ({ rating }: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className="flex">
      {Array(fullStars)
        .fill(null)
        .map((_, i) => (
          <AiFillStar key={i} className="text-black-500" />
        ))}
      {halfStar > 0 && (
        <div className="relative">
          <AiOutlineStar className="text-black-500" />
          <div
            style={{
              width: `${halfStar * 100}%`,
              position: "absolute",
              overflow: "hidden",
              top: 0,
              left: 0,
            }}
          >
            <AiFillStar className="text-black-500" />
          </div>
        </div>
      )}
      {Array(emptyStars)
        .fill(null)
        .map((_, i) => (
          <AiOutlineStar key={i + fullStars + 1} className="text-black-500" />
        ))}
    </div>
  );
};
