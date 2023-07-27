import { Popup, Ratings } from "components/shared";
import React, { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { BsFilter } from "react-icons/bs";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";
import { GameProps, Review } from "components/shared/Types/Types";
import axios from "axios";
import SortBy from "./SortBy";

type AllReviewsProps = {
  id: string | undefined;
  ratingsQuantity: number;
};

const AllReviews = ({ id, ratingsQuantity }: AllReviewsProps) => {
  const [reviews, setReviews] = useState<Review[] | null>([]);
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<string>("-rating");

  const ref = useRef<HTMLDivElement>(null);

  // Fetch the reviews based off of the page number, sort by, and filters
  useEffect(() => {
    getReviews();
  }, [page, sort]);

  // Get the reviews from the database
  async function getReviews() {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/games/${id}/reviews?page=${page}&limit=10&sort=${sort}`
      );
      const data = await response.data;
      setReviews(data.data.data);
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.log(error);
    }
  }

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
    <div ref={ref} className="pt-20">
      <div className="flex justify-between items-center pb-6">
        <div className="flex items-center  gap-5">
          <h1 className=" text-xl font-bold">All Reviews</h1>
          <p className="text-sm">
            {`${(page - 1) * 10 + 1} - ${
              page * 10 > ratingsQuantity ? ratingsQuantity : page * 10
            } of ${ratingsQuantity} Reviews`}
          </p>
        </div>
        <SortBy sort={sort} setSort={setSort} setPage={setPage} />
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
        <div className="pr-2">
          <AiOutlineLeftCircle
            className="text-2xl cursor-pointer"
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          />
        </div>
        {Array.from(
          { length: Math.ceil(ratingsQuantity / 10) },
          (_, i) => i + 1
        ).map((num) => (
          <p
            key={num}
            className={`${
              num === page
                ? "text-white rounded-full bg-gray-700 px-2 py-0 cursor-pointer"
                : "text-black cursor-pointer px-2 py-0"
            }`}
            onClick={() => setPage(num)}
          >
            {num}
          </p>
        ))}
        <div className="pl-2">
          <AiOutlineRightCircle
            className="text-2xl cursor-pointer"
            onClick={() => {
              if (page < Math.ceil(ratingsQuantity / 10)) {
                setPage(page + 1);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AllReviews;

/*

- Get all buttons working
- Make responsive
- Figure out pagination and how to load the reviews (should not be loading all at once)


Header 
  - All Reviews
  - Number of reviews and page number
  - Filter button
  - sort button

  - List reviews in same style as top reviews



  Need to figure out how to paginate and maybe only load the ones you need at first (there could be a lot)
  - then do the same to the shop page

*/
