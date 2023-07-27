import { Ratings } from "components/shared";
import { Review } from "components/shared/Types/Types";
import React from "react";

type ReviewContainerProps = {
  review: Review;
};

const ReviewContainer = ({ review }: ReviewContainerProps) => {
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
    <div className="flex flex-col space-y-3 border border-2 p-4 rounded shadow-sm">
      <div className="flex space-x-5 items-center">
        <Ratings rating={review.rating} />
        <p className="text-sm">{review.rating}.0</p>
      </div>
      <p className="text-lg font-semibold">{review.headline}</p>
      <p className="">{review.review}</p>
      <div className="flex space-x-3 items-center">
        <p className="text-sm font-semibold">{review.user.name}</p>
        <p className="text-xs text-gray-500">{checkDate(review.createdAt)}</p>
      </div>
    </div>
  );
};

export default ReviewContainer;
