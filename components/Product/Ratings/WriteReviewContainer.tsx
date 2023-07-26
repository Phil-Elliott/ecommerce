import React, { useState, useEffect } from "react";
import { MobileHeader } from "components/shared";
import axios from "axios";
import { GameProps, Review, UserReview } from "components/shared/Types/Types";
import { CldImage } from "next-cloudinary";
import { RootState } from "redux/store";

type WriteReviewContainerProps = {
  isMobileContainerOpen: boolean;
  setIsMobileContainerOpen: (isOpen: boolean) => void;
  game: GameProps | null;
  user: RootState["user"];
  userHasReviewed: UserReview | null;
  updateUserReview: (review: UserReview | null) => void;
};

const WriteReviewContainer = ({
  isMobileContainerOpen,
  setIsMobileContainerOpen,
  game,
  user,
  userHasReviewed,
  updateUserReview,
}: WriteReviewContainerProps) => {
  const [headline, setHeadline] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [attempted, setAttempted] = useState<boolean>(false);

  // adds the users review to the state if they have already left one
  useEffect(() => {
    if (userHasReviewed !== null) {
      setHeadline(userHasReviewed.headline);
      setReview(userHasReviewed.review);
      setRating(userHasReviewed.rating);
    }
  }, [userHasReviewed]);

  // Submits the review to the database or updates it if they have already left one
  async function submitReview() {
    if (!user) {
      return;
    }

    if (headline.length < 3 || review.length < 10) {
      setAttempted(true);
      return;
    }

    if (userHasReviewed === null) {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/v1/games/${game?._id}/reviews`,
          {
            headline: headline,
            rating: rating,
            review: review,
          },
          { withCredentials: true }
        );
        setIsMobileContainerOpen(false);
        console.log(response.data.data.review, "review submitted");
        updateUserReview(response.data.data.review);
      } catch (error: any) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.patch(
          `http://localhost:3000/api/v1/reviews/${userHasReviewed?._id}`,
          {
            headline: headline,
            rating: rating,
            review: review,
          },
          { withCredentials: true }
        );
        setIsMobileContainerOpen(false);
        console.log(response, "review updated");
        updateUserReview(response.data.data.data);
      } catch (error: any) {
        console.log(error);
      }
    }
  }

  // deletes the users review from the database
  async function deleteReview() {
    if (!user) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/reviews/${userHasReviewed?._id}`,
        { withCredentials: true }
      );
      setIsMobileContainerOpen(false);
      setHeadline("");
      setReview("");
      setRating(5);
      updateUserReview(null);
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <MobileHeader
      isOpen={isMobileContainerOpen}
      closeHandler={() => setIsMobileContainerOpen(false)}
      title={userHasReviewed ? "Update Review" : "Write a Review"}
      full
    >
      <div className="flex flex-col space-y-5 p-5">
        {!user.id && (
          <p className="text-center text-lg text-red-500">
            You must be logged in to leave a review
          </p>
        )}

        <div className="flex items-center bg-gray-200 p-4">
          {game?.image[0] && (
            <CldImage
              src={game.image[0]}
              width="100"
              height="100"
              alt="Game picture"
              className="w-20 h-20 object-cover rounded-lg"
            />
          )}
          <p className="pl-12 text-lg">
            {game?.name} - {game?.platform}
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="headline">Review Headline</label>
          <input
            type="text"
            name="headline"
            id="headline"
            className="border-2 border-gray-400 rounded p-2"
            onChange={(e) => setHeadline(e.target.value)}
            value={headline}
          />
          {headline.length < 3 && attempted && (
            <p className="text-sm text-red-600 mb-2">
              👋 Please enter a headline between 3 and 100 characters
            </p>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="review">Review Body</label>
          <textarea
            name="review"
            id="review"
            className="border-2 border-gray-400 rounded p-2"
            onChange={(e) => setReview(e.target.value)}
            value={review}
          />
          {review.length < 10 && attempted && (
            <p className="text-sm text-red-600 mb-2">
              👋 Please enter a review greater than or equal to 10 characters
            </p>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="rating">Rating</label>
          <select
            name="rating"
            id="rating"
            className="border-2 border-gray-400 rounded p-2"
            onChange={(e) => setRating(parseInt(e.target.value))}
            value={rating}
          >
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
        <button
          className="bg-black text-white px-4 py-2 rounded hover:opacity-75 hover:shadow-lg"
          onClick={() => submitReview()}
        >
          {userHasReviewed ? "Update Review" : "Submit Review"}
        </button>
        {userHasReviewed && (
          <button
            className="px-4 py-2 rounded border-black border-2 hover:shadow-lg"
            onClick={() => deleteReview()}
          >
            Delete Review
          </button>
        )}
      </div>
    </MobileHeader>
  );
};

export default WriteReviewContainer;

/*



*/
