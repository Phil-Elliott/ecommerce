import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import SortBy from "./SortBy";
import ReviewContainer from "../ReviewContainer";
import PaginationBar from "./PaginationBar ";
import { Review } from "components/shared/Types/Types";
import Filter from "./Filter";

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
      <Filter page={page} ratingsQuantity={ratingsQuantity} />
      <div className="space-y-6">
        {reviews?.map((review, index) => {
          return <ReviewContainer key={index} review={review} />;
        })}
      </div>
      <PaginationBar
        page={page}
        setPage={setPage}
        ratingsQuantity={ratingsQuantity}
      />
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
