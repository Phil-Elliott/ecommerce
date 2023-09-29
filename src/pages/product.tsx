import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import { GameProps, Review, UserReview } from "components/shared/Types/Types";

import ProductImages from "components/Product/ProductImages";
import MainImage from "components/Product/MainImage";
import ProductDetails from "components/Product/ProductDetails";
import RatingsContainer from "components/Product/Ratings/RatingsContainer";
import WriteReviewContainer from "components/Product/Ratings/WriteReviewContainer";
import TopReviews from "components/Product/Reviews/TopReviews";
import AllReviews from "components/Product/Reviews/AllRviews/AllReviews";
import Items from "components/shared/Items/Items";
import Head from "next/head";
import { Spinner } from "components/shared";

const product = () => {
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
  const [loading, setLoading] = useState<boolean>(false);

  // Set loading to false after a short wait
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

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
        `https://ecommercebackend-production-40c6.up.railway.app/api/v1/games/${id}`
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
          `https://ecommercebackend-production-40c6.up.railway.app/api/v1/reviews/user?user=${user._id}&game=${game?._id}`,
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
        `https://ecommercebackend-production-40c6.up.railway.app/api/v1/reviews/top-reviews/${id}`
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
      <Head>
        <title>
          {game?.name} {game?.platform ? "-" : null} {game?.platform}
        </title>
        <meta name="description" content={game?.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer />
      {loading ? (
        <Spinner size={150} />
      ) : (
        <>
          <div className="container mx-auto pt-20 lg:pt-32">
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
            {topReviews?.length ? (
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
            ) : (
              <div className="pt-20">
                <h1 className="pb-6 text-xl font-semibold text-center">
                  Be the first to review this game!
                </h1>
              </div>
            )}
          </div>
          <WriteReviewContainer
            isMobileContainerOpen={isMobileContainerOpen}
            setIsMobileContainerOpen={setIsMobileContainerOpen}
            game={game}
            user={user}
            userHasReviewed={userHasReviewed}
            updateUserReview={updateUserReview}
          />
          <Items name="Discover Something New" />
        </>
      )}
    </>
  );
};

export default product;
