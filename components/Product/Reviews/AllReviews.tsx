import { Popup, Ratings } from "components/shared";
import React from "react";
import { FiChevronDown } from "react-icons/fi";
import { BsFilter } from "react-icons/bs";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";
import { Review } from "components/shared/Types/Types";

type AllReviewsProps = {
  reviews: Review[] | null;
};

const AllReviews = ({ reviews }: AllReviewsProps) => {
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
    <div>
      <div className="flex justify-between items-center pb-6">
        <div className="flex items-center  gap-5">
          <h1 className=" text-xl font-bold">All Reviews</h1>
          <p className="text-sm">1 - 10 of 941 Reviews</p>
        </div>
        <Popup
          header={
            <div className="flex items-center space-x-1 cursor-pointer font-semibold">
              <p>Sort By</p> <FiChevronDown />
            </div>
          }
        >
          <div className="p-2 flex flex-col items-end">
            <p
              className="cursor-pointer hover:text-gray-500"
              // onClick={() => {
              //   changeSortBy("rating");
              // }}
            >
              Highest to Lowest Rating
            </p>
            <p
              className="cursor-pointer hover:text-gray-500"
              // onClick={() => {
              //   changeSortBy("priceAsc");
              // }}
            >
              Lowest to Highest Rating
            </p>
            <p
              className="cursor-pointer hover:text-gray-500"
              // onClick={() => {
              //   changeSortBy("priceDesc");
              // }}
            >
              Most Recent
            </p>
          </div>
        </Popup>
      </div>
      <div className="flex items-center gap-3 font-semibold cursor-pointer pb-6">
        <BsFilter />
        <p>Filter</p>
      </div>
      {reviews?.map((review, index) => {
        return (
          <div
            key={index}
            className="flex flex-col space-y-3 border border-2 p-4 rounded shadow-sm mb-6"
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
      })}

      <div className="flex justify-center items-center space-x-3 pt-6">
        <AiOutlineLeftCircle className="text-3xl" />
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>...</p>
        <p>95</p>
        <AiOutlineRightCircle className="text-3xl" />
      </div>
    </div>
  );
};

export default AllReviews;

/*

Header 
  - All Reviews
  - Number of reviews and page number
  - Filter button
  - sort button

  - List reviews in same style as top reviews



  Need to figure out how to paginate and maybe only load the ones you need at first (there could be a lot)
  - then do the same to the shop page

*/
