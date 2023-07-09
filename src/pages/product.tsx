import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { GameProps } from "components/shared/Types/Types";

import { Ratings } from "components/shared";

import Link from "next/link";
import ProductImages from "components/Product/ProductImages";
import MainImage from "components/Product/MainImage";
import ProductDetails from "components/Product/ProductDetails";

type ProductProps = {
  games: GameProps[];
};

const product = ({ games }: ProductProps) => {
  const [game, setGame] = useState<GameProps | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);

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
    <div className="container mx-auto">
      <div className="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-7 gap-10 py-20 lg:py-32">
        {/* Images and main image container */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 h-full col-span-4">
          <ProductImages
            game={game}
            mainImage={mainImage}
            setMainImage={setMainImage}
          />
          <MainImage game={game} mainImage={mainImage} />
        </div>
        {/* Product description and buttons */}
        <ProductDetails game={game} />
      </div>
    </div>
  );
};

export default product;

/*

Responsive design
1) Under large - have extra pictures go below
2) Under medium -  have cols but pics on top



*/
