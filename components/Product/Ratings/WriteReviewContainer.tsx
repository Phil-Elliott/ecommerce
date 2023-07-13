import React, { useState } from "react";
import { MobileHeader } from "components/shared";
import axios from "axios";
import { GameProps } from "components/shared/Types/Types";
import { CldImage } from "next-cloudinary";

type WriteReviewContainerProps = {
  isMobileContainerOpen: boolean;
  setIsMobileContainerOpen: (isOpen: boolean) => void;
  game: GameProps | null;
};

const WriteReviewContainer = ({
  isMobileContainerOpen,
  setIsMobileContainerOpen,
  game,
}: WriteReviewContainerProps) => {
  const [headline, setHeadline] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);

  async function submitReview() {
    console.log(`http://localhost:3000/api/v1/${game?._id}/reviews`);

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
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }

    setIsMobileContainerOpen(false);
    setHeadline("");
    setReview("");
    setRating(5);
  }

  return (
    <MobileHeader
      isOpen={isMobileContainerOpen}
      closeHandler={() => setIsMobileContainerOpen(false)}
      title="Write a Review"
      full
    >
      <div className="flex flex-col space-y-5 p-5">
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
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="review">Review Body</label>
          <textarea
            name="review"
            id="review"
            className="border-2 border-gray-400 rounded p-2"
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="rating">Rating</label>
          <select
            name="rating"
            id="rating"
            className="border-2 border-gray-400 rounded p-2"
            onChange={(e) => setRating(parseInt(e.target.value))}
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
          Submit Review
        </button>
      </div>
    </MobileHeader>
  );
};

export default WriteReviewContainer;

/*

1) Have it make a call to the api to post the review
2) Have it update the reviews state in the parent component or call the getReviews function
3) Have it close the modal
4) Maybe show stars instead of a drop down - but could just do that later


*/
