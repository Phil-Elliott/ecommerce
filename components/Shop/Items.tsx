import React from "react";
import Image from "next/image";

import HeroImg from "/assets/hero.jpg";
import { TourProps } from "components/shared/Types/Types";
import router from "next/router";

type ItemsProps = {
  tours: TourProps[];
};

const Items = ({ tours }: ItemsProps) => {
  return (
    <div className="grid grid-cols-3 gap-10 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {tours.map((tour) => (
        <div
          key={tour.id}
          className="bg-white rounded-lg shadow hover:shadow-lg w-full inline-block cursor-pointer select-none h-96"
          onClick={() =>
            router.push(`/product?id=${encodeURIComponent(tour.id)}`)
          }
        >
          <Image
            src={HeroImg}
            alt={tour.name}
            className="w-full h-2/3 object-cover rounded-t-lg"
          />
          <div className="p-4 h-1/3 flex flex-col justify-between">
            <h1 className="text-lg font-semibold pb-4 whitespace-normal">
              {tour.name}
            </h1>
            {/* <p className="text-gray-500">{tour.date}</p> */}
            <p className="text-gray-500">${tour.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Items;

// - when product is clicked navigate here and have product id in params
