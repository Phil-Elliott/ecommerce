import React from "react";
import Image from "next/image";

import HeroImg from "/assets/hero.jpg";
import { TourProps } from "components/shared/Types/Types";

type ItemsProps = {
  tours: TourProps[];
};

const Items = ({ tours }: ItemsProps) => {
  return (
    <div className="grid grid-cols-3 gap-10 w-full">
      {tours.map((tour) => (
        <div
          key={tour.id}
          className="bg-white rounded-lg shadow hover:shadow-lg w-full inline-block cursor-pointer select-none"
        >
          <Image
            src={HeroImg}
            alt={tour.name}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <div className="p-4 w-64 flex flex-col justify-between h-32">
            <h1 className="text-lg font-semibold whitespace-normal">
              {tour.name}
            </h1>
            <p className="text-gray-500">${tour.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Items;
