import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";
import { RootState } from "redux/store";

import axios from "axios";

import { GameProps, Review, UserReview } from "components/shared/Types/Types";

import ProductImages from "components/Product/ProductImages";
import MainImage from "components/Product/MainImage";
import ProductDetails from "components/Product/ProductDetails";
import RatingsContainer from "components/Product/Ratings/RatingsContainer";
import WriteReviewContainer from "components/Product/Ratings/WriteReviewContainer";
import TopReviews from "components/Product/Reviews/TopReviews";
import AllReviews from "components/Product/Reviews/AllRviews/AllReviews";

type ProductProps = {
  games: GameProps[];
};

const product = ({ games }: ProductProps) => {
  const [game, setGame] = useState<GameProps | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [isMobileContainerOpen, setIsMobileContainerOpen] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [topReviews, setTopReviews] = useState<Review[] | null>([]);
  const [userHasReviewed, setUserHasReviewed] = useState<UserReview | null>(
    null
  );
  const [ratingsAvg, setRatingsAvg] = useState(0);
  const [ratingsQuantity, setRatingsQuantity] = useState(0);
  const [starRatings, setStarRatings] = useState<Record<string, number>>({});

  const user = useSelector((state: RootState) => state.user);

  // Get the 'id' property from the router.query object and parse it as an integer
  const router = useRouter();
  const queryId = router.query.id;
  const id = queryId ? queryId : null;

  // Find the game with the given 'id' (if it exists)
  useEffect(() => {
    if (id) {
      getCurrentGame();
    }
  }, [id]);

  async function getCurrentGame() {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/games/${id}`
      );
      const data = await response.data;
      setGame(data.data.data);
      setMainImage(data.data.data.image[0]);
    } catch (error) {
      console.log(error);
    }
  }

  // Gets all reviews when the game changes and sets all of the ratings data
  useEffect(() => {
    if (game) {
      setRatingsAvg(game.ratingsAverage);
      setRatingsQuantity(game.ratingsQuantity);
      setStarRatings(game.starRatings);
      fetchTopReviews();
    }
  }, [game]);

  // Check if user has already reviewed this game when the game or user changes
  useEffect(() => {
    if (user && game) {
      userHasReviewedCheck();
    }
  }, [user, game]);

  // check if user has already reviewed this game
  async function userHasReviewedCheck() {
    if (user && game) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/reviews/user?user=${user._id}&game=${game?._id}`,
          { withCredentials: true }
        );
        const data = response.data.data.review;
        if (data) {
          setUserHasReviewed({
            headline: data.headline,
            rating: data.rating,
            review: data.review,
            _id: data._id,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    return null;
  }

  // Get top reviews from database
  async function fetchTopReviews() {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/reviews/top-reviews/${id}`
      );
      const data = await response.data.data.reviews;
      setTopReviews(data);
    } catch (error) {
      console.log(error);
    }
  }

  function updateUserReview(review: UserReview | null) {
    if (review) {
      // handles updating a review and updating the ratingsAvg, ratingsQuantity, and starRatings
      if (userHasReviewed) {
        // update starRatings and ratingsAvg if star rating changed
        if (userHasReviewed.rating !== review.rating) {
          setStarRatings({
            ...starRatings,
            [userHasReviewed.rating]: starRatings[userHasReviewed.rating] - 1,
            [review.rating]: starRatings[review.rating] + 1,
          });
          const totalRatingsValue = Object.entries(starRatings).reduce(
            (acc, [star, count]) => acc + parseInt(star) * count,
            0
          );

          setRatingsAvg(
            (totalRatingsValue + review.rating - userHasReviewed.rating) /
              ratingsQuantity
          );
        }

        userHasReviewedCheck();

        // if users review was in top reviews then you need to pull them again
        if (topReviews) {
          const userReview = topReviews.find(
            (review) => review.user._id === user._id
          );
          if (userReview) {
            fetchTopReviews();
          }
        }
      } else {
        // handles adding a review and updating the ratingsAvg, ratingsQuantity, and starRatings
        setRatingsQuantity(ratingsQuantity + 1);
        setStarRatings({
          ...starRatings,
          [review.rating]: starRatings[review.rating] + 1,
        });

        const totalRatingsValue = Object.entries(starRatings).reduce(
          (acc, [star, count]) => acc + parseInt(star) * count,
          0
        );

        setRatingsAvg(
          (totalRatingsValue + review.rating) / (ratingsQuantity + 1)
        );

        userHasReviewedCheck();

        // if users review was in top reviews then you need to pull them again
        if (topReviews) {
          const userReview = topReviews.find(
            (review) => review.user._id === user._id
          );
          if (userReview) {
            fetchTopReviews();
          }
        }
      }
    } else {
      // handles deleting a review and updating the ratingsAvg, ratingsQuantity, and starRatings
      setRatingsQuantity(ratingsQuantity - 1);
      setStarRatings({
        ...starRatings,
        [userHasReviewed!.rating]: starRatings[userHasReviewed!.rating] - 1,
      });
      const totalRatingsValue = Object.entries(starRatings).reduce(
        (acc, [star, count]) => acc + parseInt(star) * count,
        0
      );
      if (ratingsQuantity - 1 === 0) {
        setRatingsAvg(5);
      } else {
        setRatingsAvg(totalRatingsValue / ratingsQuantity);
      }
      setUserHasReviewed(null);

      // if users review was in top reviews then you need to pull them again
      if (topReviews) {
        const userReview = topReviews.find(
          (review) => review.user._id === user._id
        );
        if (userReview) {
          fetchTopReviews();
        }
      }
    }
  }

  return (
    <>
      <div className="container mx-auto py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-10 ">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 h-full col-span-4">
            <ProductImages
              game={game}
              mainImage={mainImage}
              setMainImage={setMainImage}
            />
            <MainImage game={game} mainImage={mainImage} />
          </div>
          <ProductDetails game={game} />
        </div>
        <RatingsContainer
          game={game}
          openReview={() => setIsMobileContainerOpen(true)}
          userHasReviewed={userHasReviewed}
          ratingsAvg={ratingsAvg}
          ratingsQuantity={ratingsQuantity}
          starRatings={starRatings}
          setShowAllReviews={setShowAllReviews}
          showAllReviews={showAllReviews}
        />
        <div>
          {!showAllReviews ? (
            <TopReviews reviews={topReviews} user={user} />
          ) : (
            <AllReviews
              ratingsQuantity={ratingsQuantity}
              id={game?._id}
              user={user}
            />
          )}
        </div>
      </div>
      <WriteReviewContainer
        isMobileContainerOpen={isMobileContainerOpen}
        setIsMobileContainerOpen={setIsMobileContainerOpen}
        game={game}
        user={user}
        userHasReviewed={userHasReviewed}
        updateUserReview={updateUserReview}
      />
    </>
  );
};

export default product;

/*

- Fix css of the review container
- add votes and reccomended 
- Add reccommend option to form
- get pagination working

- Only pull all reviews when user clicks on all reviews but do it with pagination
- Shouldnt be grabbing all of the games like that (what if there were 100s of games?)
- Add more like this section
- Add a loading spinner
- Add reccomend to form
- Add upvotes and downvotes to reviews
- Probably could just make one component for a review container



  // Get reviews from database
  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/games/${game?._id}/reviews`
      );
      const data = await response.json();
      setReviews(data.data.data);
      console.log(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };
*/
