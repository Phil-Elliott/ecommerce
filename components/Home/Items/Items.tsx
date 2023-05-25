import React, { useRef } from "react";
import Image from "next/image";
import router from "next/router";
import HeroImg from "/assets/hero.jpg";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { TourProps } from "components/shared/Types/Types";
import Button from "components/shared/Button/Button";

type ItemProps = {
  name: string;
  tours: TourProps[];
};
// Scroll distance constant
const SCROLL_DISTANCE = 270;

const Items = ({ name, tours }: ItemProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

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
    <div className="container mx-auto pt-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">{name}</h1>
        <div className="text-base flex items-center space-x-4">
          <Button
            ariaLabel="Show All"
            className="text-base"
            // onClick={() => {
            //   /* Add your onClick functionality here */
            // }}
          >
            Show All
          </Button>
          <Button
            ariaLabel="Scroll Left"
            className="bg-gray-500 text-white p-1 rounded-full cursor-pointer"
            onClick={scrollLeft}
          >
            <BsChevronLeft />
          </Button>
          <Button
            ariaLabel="Scroll Right"
            className="bg-gray-500 text-white p-1 rounded-full cursor-pointer"
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
          {tours.map((tour) => (
            <div
              key={tour.id}
              onClick={() =>
                router.push(`/product?id=${encodeURIComponent(tour.id)}`)
              }
              className="bg-white rounded-lg shadow w-64 inline-block mb-10 cursor-pointer select-none"
            >
              <Image
                src={HeroImg}
                alt={tour.name}
                className="w-full h-64 object-cover rounded-t-lg"
                onError={(e) => {
                  e.currentTarget.src = "/path/to/default/image.jpg";
                }}
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
