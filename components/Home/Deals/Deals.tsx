import React from "react";
import Image from "next/image";
import HeroImg from "/assets/hero.jpg";
import { BsChevronRight } from "react-icons/bs";
import Button from "components/shared/Button/Button";

const dealsInfo = [
  {
    id: 1,
    description: "Games",
    image: HeroImg,
  },
  {
    id: 2,
    description: "Consoles",
    image: HeroImg,
  },
  {
    id: 3,
    description: "Deals",
    image: HeroImg,
  },
];

const Deals = () => {
  return (
    <div className="container mx-auto pt-10 grid grid-cols-3 gap-8">
      {dealsInfo.map((deal) => (
        <div
          key={deal.id}
          style={{
            backgroundImage: `url(${deal.image.src})`,
          }}
          className="relative bg-cover bg-center rounded-sm cursor-pointer flex flex-col justify-center items-center px-10 py-20"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 rounded-sm"></div>
          <p className="z-10 text-white font-semibold text-2xl my-5 text-center">
            {deal.description}
          </p>
          <Button
            ariaLabel="Shop Now"
            className="z-10 text-white font-semibold py-2 px-6 text-base rounded hover:bg-white hover:text-black transition duration-200 ease-in-out inline-flex items-center space-x-2"
            onClick={() => {
              /* Add your onClick functionality for the specific deal here */
            }}
          >
            Shop Now
            <BsChevronRight className="inline-block ml-2" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Deals;
