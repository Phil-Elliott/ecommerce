import React from "react";
import Link from "next/link";

import { Ratings } from "components/shared";
import { useAddToCart } from "utils/useAddToCart/useAddToCart";
import { useAddToWishList } from "utils/useAddToWishList/useAddToWishList";

import { GameProps } from "components/shared/Types/Types";

type ProductDetailsProps = {
  game: GameProps | null;
};

const ProductDetails = ({ game }: ProductDetailsProps) => {
  const addToCart = useAddToCart();
  const addToWishList = useAddToWishList();

  return (
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
            <Ratings rating={game?.ratingsAverage || 5} />
            <p>{game?.ratingsAverage}</p>
            <p className="text-gray-500">({game?.ratingsQuantity}) Ratings</p>
          </div>

          <p className="text-3xl font-semibold text-gray-800">${game?.price}</p>

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
  );
};

export default ProductDetails;
