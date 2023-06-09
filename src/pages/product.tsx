import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { GameProps, Review } from "components/shared/Types/Types";

import ProductImages from "components/Product/ProductImages";
import MainImage from "components/Product/MainImage";
import ProductDetails from "components/Product/ProductDetails";
import RatingsContainer from "components/Product/Ratings/RatingsContainer";
import WriteReviewContainer from "components/Product/Ratings/WriteReviewContainer";
import TopReviews from "components/Product/Reviews/TopReviews";
import AllReviews from "components/Product/Reviews/AllReviews";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

type ProductProps = {
  games: GameProps[];
};

const product = ({ games }: ProductProps) => {
  const [game, setGame] = useState<GameProps | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [isMobileContainerOpen, setIsMobileContainerOpen] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviews, setReviews] = useState<Review[] | null>([]);
  const [userHasReviewed, setUserHasReviewed] = useState<Review | null>(null);

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

  // Get reviews from database
  useEffect(() => {
    if (game) {
      const fetchReviews = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/v1/games/${game._id}/reviews`
          );
          const data = await response.json();
          setReviews(data.data.data);
          console.log(data.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchReviews();
    }
  }, [game]);

  // check if user has already reviewed this game
  function userHasReviewedCheck() {
    if (user && reviews) {
      const userReview = reviews.find((review) => review.user._id === user.id);
      if (userReview) {
        return userReview;
      }
    }
    return null;
  }

  useEffect(() => {
    if (user && reviews) {
      setUserHasReviewed(userHasReviewedCheck());
    }
  }, [user, reviews]);

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
        />
        <div>{!showAllReviews ? <TopReviews /> : <AllReviews />}</div>
      </div>
      <WriteReviewContainer
        isMobileContainerOpen={isMobileContainerOpen}
        setIsMobileContainerOpen={setIsMobileContainerOpen}
        game={game}
        user={user}
        userHasReviewed={userHasReviewed}
      />
    </>
  );
};

export default product;

/*

Mobile container 
- Game info
    - Pic and title and platform
- Overall Rating (stars) - they can select
- Review headline input
- Review body input
- Submit button (Post Review)


Today
- Add ability for user to add a review and rating
- Display the reviews
- Add ability for user to update or delete reviews



- Add more like this section
- Add reviews section 
- Add top reviews section or All reviews if that is clicked
- Add scrolling or arrows to images on smaller screens

Responsive design
1) Under large - have extra pictures go below
2) Under medium -  have cols but pics on top



*/
