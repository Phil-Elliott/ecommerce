import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";
import { RootState } from "redux/store";

import { GameProps, Review, UserReview } from "components/shared/Types/Types";

import ProductImages from "components/Product/ProductImages";
import MainImage from "components/Product/MainImage";
import ProductDetails from "components/Product/ProductDetails";
import RatingsContainer from "components/Product/Ratings/RatingsContainer";
import WriteReviewContainer from "components/Product/Ratings/WriteReviewContainer";
import TopReviews from "components/Product/Reviews/TopReviews";
import AllReviews from "components/Product/Reviews/AllReviews";

type ProductProps = {
  games: GameProps[];
};

const product = ({ games }: ProductProps) => {
  const [game, setGame] = useState<GameProps | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [isMobileContainerOpen, setIsMobileContainerOpen] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviews, setReviews] = useState<Review[] | null>([]);
  const [userHasReviewed, setUserHasReviewed] = useState<UserReview | null>(
    null
  );
  const [ratingsAvg, setRatingsAvg] = useState(0);
  const [ratingsQuantity, setRatingsQuantity] = useState(0);
  const [starRatings, setStarRatings] = useState<Record<string, number>>({});

  useEffect(() => {
    console.log(ratingsAvg);
    console.log(ratingsQuantity);
    console.log(starRatings);
  }, [starRatings]);

  const user = useSelector((state: RootState) => state.user);

  // Get the 'id' property from the router.query object and parse it as an integer
  const router = useRouter();
  const queryId = router.query.id;
  const id = queryId ? queryId : null;

  // Find the game with the given 'id' (if it exists)
  useEffect(() => {
    const currentGame = id ? games.find((game) => game._id === id) : null;

    if (currentGame) {
      setGame(currentGame);
      setMainImage(currentGame.image[0]);
    }
  }, [id, games]);

  // Gets all reviews when the game changes and sets all of the ratings data
  useEffect(() => {
    if (game) {
      fetchReviews();
      setRatingsAvg(game.ratingsAverage);
      setRatingsQuantity(game.ratingsQuantity);
      setStarRatings(game.starRatings);
    }
  }, [game]);

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

  // check if user has already reviewed this game
  function userHasReviewedCheck() {
    if (user && reviews) {
      const userReview = reviews.find((review) => review.user._id === user.id);
      if (userReview) {
        return {
          headline: userReview.headline,
          rating: userReview.rating,
          review: userReview.review,
          _id: userReview._id,
        };
      }
    }
    return null;
  }

  // Check if user has already reviewed this game
  useEffect(() => {
    if (user && reviews) {
      setUserHasReviewed(userHasReviewedCheck());
    }
  }, [user, reviews]);

  // updates user's review in the userHasReviewed state when they submit, update, or delete their review
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

        setUserHasReviewed(review);
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

        setUserHasReviewed(review);
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
        />
        <div className="pt-16">
          {!showAllReviews ? <TopReviews reviews={reviews} /> : <AllReviews />}
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

- Add more like this section
- Add top reviews section or All reviews if that is clicked
- Add all reviews section



*/
