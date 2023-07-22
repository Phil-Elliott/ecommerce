import React from "react";
import { Review } from "components/shared/Types/Types";
import { Ratings } from "components/shared";

type TopReviewsProps = {
  reviews: Review[] | null;
};

const TopReviews = ({ reviews }: TopReviewsProps) => {
  console.log(reviews, "reviews");

  // check the duration of time between the review date and todays date
  // if the duration is less than 1 month, display the duration in days
  // if the duration is less than 1 year, display the duration in months
  // if the duration is more than 1 year, display the duration in years
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
    <div>
      <h1 className="pb-6 text-xl font-semibold">Top Reviews</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews?.map((review, index) => {
          if (index < 3) {
            return (
              <div
                key={index}
                className="flex flex-col space-y-3 border border-2 p-4 rounded shadow-sm"
              >
                <div className="flex space-x-5 items-center">
                  <Ratings rating={review.rating} />
                  <p className="text-sm">{review.rating}.0</p>
                </div>
                <p className="text-lg font-semibold">{review.headline}</p>
                <p className="">{review.review}</p>
                <div className="flex space-x-3 items-center">
                  <p className="text-sm font-semibold">{review.user.name}</p>
                  <p className="text-xs text-gray-500">
                    {checkDate(review.createdAt)}
                  </p>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default TopReviews;

/*

Border outside
Contents
- Ratings stars and score by user
- Review headline
- Review body
- Reviewer name
- Compare date written with todays date


*/
