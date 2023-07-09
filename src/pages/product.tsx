import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { GameProps } from "components/shared/Types/Types";

import { useAddToCart } from "utils/useAddToCart/useAddToCart";
import { useAddToWishList } from "utils/useAddToWishList/useAddToWishList";
import { Ratings } from "components/shared";

import { CldImage } from "next-cloudinary";
import Link from "next/link";

type ProductProps = {
  games: GameProps[];
};

const product = ({ games }: ProductProps) => {
  const [game, setGame] = useState<GameProps | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);

  const addToCart = useAddToCart();
  const addToWishList = useAddToWishList();

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
          <div className="order-2 lg:order-none grid grid-cols-6 lg:grid-cols-1 lg:grid-rows-6 gap-3 sm:gap-5 h-full max-h-[70vh] w-full">
            {game?.image.map((img, index) => (
              <CldImage
                key={index}
                src={img}
                width="600"
                height="600"
                alt="Game picture"
                className={`w-full h-20 object-cover rounded-lg cursor-pointer sm:p-2 ${
                  mainImage === img ? "border-2 border-gray-200" : ""
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
          <div className="order-1 h-full max-h-[70vh] lg:col-span-4">
            <CldImage
              src={mainImage || "2"}
              width="600"
              height="600"
              alt={game?.name || "Game picture"}
              className="w-full h-96 lg:h-full object-cover rounded-lg"
            />
          </div>
        </div>
        {/* Product description and buttons */}
        <div className="col-span-4 lg:col-span-3 flex flex-col lg:justify-between space-y-10">
          <div className="flex lg:justify-between flex-col lg:h-full space-y-10">
            <div className="space-y-5">
              <h1 className="text-2xl font-semibold mb-2">
                {game?.name} - {game?.platform}
              </h1>
              <Link href={`/shop?publisher=${game?.publisher}`}>
                <p className="underline cursor-pointer hover:text-red-500 transition duration-300">
                  {game?.publisher}
                </p>
              </Link>
              <div className="flex space-x-2 items-center">
                <Ratings rating={game?.rating || 5} />
                <p>{game?.rating}</p>
                <p className="text-gray-500">(12) Ratings</p>
              </div>

              <p className="text-3xl font-semibold text-gray-800">
                ${game?.price}
              </p>

              <p className="leading-relaxed">{game?.description}</p>

              {game?.gameModes[0] && (
                <p className="">Game Modes: {game?.gameModes.join(", ")}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <button
              className="bg-black text-white px-4 py-2 rounded hover:opacity-75 hover:shadow-lg"
              onClick={() => game && addToCart(game)}
            >
              Add to Cart
            </button>
            <button
              className="px-4 py-2 rounded border-black border-2 hover:shadow-lg"
              onClick={() => game && addToWishList(game)}
            >
              Save
            </button>
          </div>
        </div>
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
