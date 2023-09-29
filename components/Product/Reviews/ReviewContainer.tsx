import React from "react";
import { RootState } from "redux/store";
import { Ratings } from "components/shared";
import { Review } from "components/shared/Types/Types";

import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from "react-icons/bs";
import axios from "axios";

type ReviewContainerProps = {
  review: Review;
  user: RootState["user"];
};

const ReviewContainer = ({ review, user }: ReviewContainerProps) => {
  const [upvotesCount, setUpvotesCount] = React.useState(review.upVotes.length);
  const [downvotesCount, setDownvotesCount] = React.useState(
    review.downVotes.length
  );

  // console.log(review, user, "review container");

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

  // handles users upvotes and downvotes on reviews
  async function handleVotes(voteType: string) {
    // is the user logged in?
    if (!user._id) {
      return;
    }

    try {
      const voteData =
        voteType === "upVote" ? { upVote: true } : { downVote: true };

      const response = await axios.patch(
        `https://ecommercebackend-production-40c6.up.railway.app/api/v1/reviews/${review._id}/vote`,
        voteData,
        { withCredentials: true }
      );
      const updatedReview = await response.data;

      // Update the state
      setUpvotesCount(updatedReview.data.review.upVotes.length);
      setDownvotesCount(updatedReview.data.review.downVotes.length);
    } catch (error) {
      console.log(error);
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
          <button
            className="flex items-center space-x-2 text-gray-500 hover:text-black"
            onClick={() => handleVotes("upVote")}
          >
            <BsFillHandThumbsUpFill />
            <p>Yes</p>
            <p>({upvotesCount})</p>
          </button>
          <button
            className="flex items-center space-x-2 text-gray-500 hover:text-black"
            onClick={() => handleVotes("downVote")}
          >
            <BsFillHandThumbsDownFill />
            <p>No</p>
            <p>({downvotesCount})</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewContainer;
