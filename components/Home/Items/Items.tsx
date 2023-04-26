import Image from "next/image";
import React, { useRef } from "react";
import HeroImg from "/assets/hero.jpg";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { TourProps } from "components/shared/Types/Types";

type ItemProps = {
  name: string;
  tours: TourProps[];
};

const Items = ({ name, tours }: ItemProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -270, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 270, behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto pt-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">{name}</h1>
        <div className="text-base flex items-center space-x-4">
          <button className="text-base">Show All</button>
          <div
            className="bg-gray-500 text-white p-1 rounded-full cursor-pointer"
            onClick={scrollLeft}
          >
            <BsChevronLeft />
          </div>
          <div
            className="bg-gray-500 text-white p-1 rounded-full cursor-pointer"
            onClick={scrollRight}
          >
            <BsChevronRight />
          </div>
        </div>
      </div>

      <div className="overflow-hidden pt-10">
        <div
          ref={scrollRef}
          className="flex gap-4 whitespace-nowrap overflow-x-scroll scrollbar px-1"
        >
          {tours.map((tour) => (
            <div className="bg-white rounded-lg shadow w-64 inline-block mb-10 cursor-pointer select-none">
              <Image
                src={HeroImg}
                alt={tour.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-4 w-64">
                <h1 className="text-lg font-semibold pb-4 whitespace-normal">
                  {tour.name}
                </h1>
                <p className="text-gray-500">${tour.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Items;
