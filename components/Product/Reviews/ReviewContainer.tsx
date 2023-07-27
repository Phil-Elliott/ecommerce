import React from "react";

import { Ratings } from "components/shared";
import { Review } from "components/shared/Types/Types";

import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from "react-icons/bs";

type ReviewContainerProps = {
  review: Review;
};

const ReviewContainer = ({ review }: ReviewContainerProps) => {
  console.log(review, "its the review baby");

  // check the duration of time between the review date and todays date
  function checkDate(date: string) {
    const reviewDate = new Date(date);
    const today = new Date();

    const duration = today.getTime() - reviewDate.getTime();

    const days = Math.floor(duration / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (days < 1) {
      return "Today";
    } else if (days === 1) {
      return "Yesterday";
    } else if (days < 30) {
      return `${days} days ago`;
    } else if (months < 12) {
      return `${months} months ago`;
    } else {
      return `${years} years ago`;
    }
  }

  return (
    <div className="flex flex-col space-y-3 justify-between border border-2 p-4 rounded shadow-sm">
      <div className="flex space-x-5 items-center">
        <Ratings rating={review.rating} />
        <p className="text-sm">{review.rating}.0</p>
      </div>
      <div className="flex justify-between">
        <div className="flex space-x-3 items-center">
          <p className="text-sm font-semibold">{review.user.name}</p>
          <p className="text-xs text-gray-500">{checkDate(review.createdAt)}</p>
        </div>
      </div>
      <p className="text-lg font-semibold">{review.headline}</p>
      <p className="">{review.review}</p>

      {review.recommended ? (
        <div className="flex gap-3 items-center text-sm">
          <BsFillHandThumbsUpFill />
          <p className="">
            <strong>Yes:</strong> I recommend this product
          </p>
        </div>
      ) : (
        <div className="flex gap-3 items-center text-sm">
          <BsFillHandThumbsDownFill />
          <p className="">
            <strong>No:</strong> I don't recommend this product
          </p>
        </div>
      )}
      <div className="text-sm flex space-x-5 items-center">
        <p className="text-gray-500">Was this review helpful?</p>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 text-gray-500 hover:text-black">
            <BsFillHandThumbsUpFill />
            <p>Yes</p>
            <p>({review.upVotes})</p>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-black">
            <BsFillHandThumbsDownFill />
            <p>No</p>
            <p>({review.downVotes})</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewContainer;

/*

- add functionality to upvoting and downvoting
- fix top reviews to show the ones with the most overall votes score


*/
