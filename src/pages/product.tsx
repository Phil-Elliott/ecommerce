import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { GameProps } from "components/shared/Types/Types";

import ProductImages from "components/Product/ProductImages";
import MainImage from "components/Product/MainImage";
import ProductDetails from "components/Product/ProductDetails";
import RatingsContainer from "components/Product/Ratings/RatingsContainer";
import { MobileHeader } from "components/shared";

type ProductProps = {
  games: GameProps[];
};

const product = ({ games }: ProductProps) => {
  const [game, setGame] = useState<GameProps | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [isMobileContainerOpen, setIsMobileContainerOpen] = useState(false);

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
        />
      </div>
      <MobileHeader
        isOpen={isMobileContainerOpen}
        closeHandler={() => setIsMobileContainerOpen(false)}
        title="Write a Review"
        full
      >
        <div className="flex flex-col space-y-5 p-5">
          <div className="flex flex-col space-y-2">
            <label htmlFor="headline">Review Headline</label>
            <input
              type="text"
              name="headline"
              id="headline"
              className="border-2 border-gray-400 rounded p-2"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="review">Review Body</label>
            <textarea
              name="review"
              id="review"
              className="border-2 border-gray-400 rounded p-2"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="rating">Rating</label>
            <select
              name="rating"
              id="rating"
              className="border-2 border-gray-400 rounded p-2"
            >
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded hover:opacity-75 hover:shadow-lg">
            Submit Review
          </button>
        </div>
      </MobileHeader>
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
