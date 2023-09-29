import React, { useEffect, useRef, useState } from "react";
import router from "next/router";
import axios from "axios";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { GameProps } from "components/shared/Types/Types";
import Button from "components/shared/Button/Button";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

type ItemProps = {
  name: string;
};
// Scroll distance constant
const SCROLL_DISTANCE = 270;

const Items = ({ name }: ItemProps) => {
  const [games, setGames] = useState<GameProps[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // fetches 10 random products from the database
  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await axios.get(
          `https://ecommercebackend-production-40c6.up.railway.app/api/v1/games/randomProducts`
        );
        const data = await response.data.data.products;
        setGames(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchGames();
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -SCROLL_DISTANCE,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: SCROLL_DISTANCE, behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto py-16">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">{name}</h1>
        <div className="text-base flex items-center space-x-4">
          <Link href="/shop">
            <Button ariaLabel="Show All" className="text-base hover:underline">
              Show All
            </Button>
          </Link>
          <Button
            ariaLabel="Scroll Left"
            className="hidden sm:block bg-gray-500 text-white p-1 rounded-full cursor-pointer hover:bg-gray-600 transition duration-200 ease-in-out"
            onClick={scrollLeft}
          >
            <BsChevronLeft />
          </Button>
          <Button
            ariaLabel="Scroll Right"
            className="hidden sm:block bg-gray-500 text-white p-1 rounded-full cursor-pointer hover:bg-gray-600 transition duration-200 ease-in-out"
            onClick={scrollRight}
          >
            <BsChevronRight />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden pt-10">
        <div
          ref={scrollRef}
          className="flex gap-4 whitespace-nowrap overflow-x-scroll scrollbar px-1"
        >
          {games?.slice(0, 10).map((game) => (
            <div
              key={game._id}
              onClick={() =>
                router.push(`/product?id=${encodeURIComponent(game._id)}`)
              }
              className="bg-white rounded-lg shadow hover:shadow-lg w-64 inline-block mb-10 cursor-pointer select-none"
            >
              <CldImage
                src={game.image[0] || "2"}
                width="600"
                height="600"
                alt={game.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-4 w-64">
                <h1 className="text-lg font-semibold pb-4 whitespace-normal">
                  {game.name}
                </h1>
                <p className="text-gray-500">${game.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Items;

/*

check how you pull the data on the product page

*/
