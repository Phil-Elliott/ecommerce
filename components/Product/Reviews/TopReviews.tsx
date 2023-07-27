import React from "react";
import { Review } from "components/shared/Types/Types";
import ReviewContainer from "./ReviewContainer";

type TopReviewsProps = {
  reviews: Review[] | null;
};

const TopReviews = ({ reviews }: TopReviewsProps) => {
  return (
    <div className="pt-20">
      <h1 className="pb-6 text-xl font-semibold">Top Reviews</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews?.map((review, index) => {
          if (index < 3) {
            return <ReviewContainer key={index} review={review} />;
          }
        })}
      </div>
    </div>
  );
};

export default TopReviews;

/*




*/
