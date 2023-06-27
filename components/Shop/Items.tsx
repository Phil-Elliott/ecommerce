import React from "react";
import { GameProps } from "components/shared/Types/Types";
import router from "next/router";
import { Ratings } from "components/shared";
import { CldImage } from "next-cloudinary";

type ItemsProps = {
  games: GameProps[];
};

const Items = ({ games }: ItemsProps) => {
  return (
    <div className="grid grid-cols-3 gap-10 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {games.map((game) => (
        <div
          key={game.name}
          className="bg-white shadow rounded-lg hover:shadow-md w-full inline-block cursor-pointer select-none h-96"
          onClick={() =>
            router.push(`/product?id=${encodeURIComponent(game._id)}`)
          }
        >
          <CldImage
            src={game.image[0] || "2"}
            width="600"
            height="600"
            alt={game.name}
            className="w-full h-2/3 object-cover rounded-t-lg"
          />
          <div className="p-4 h-1/3 flex flex-col justify-between">
            <div>
              <h1 className="text-base font-medium pb-2 whitespace-normal">
                {game.name} - {game.platform}
              </h1>
              <div className="flex space-x-2 items-center text-sm">
                <Ratings rating={game.rating} />
                <p>{game.rating}</p>
                <p className="text-gray-500">(12)</p>
              </div>
            </div>
            {/* <p className="text-gray-500">{game.releaseDate}</p> */}
            <p className="text-lg font-semibold">${game.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Items;
