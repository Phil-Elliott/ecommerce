import React from "react";
import Image from "next/image";
import HeroImg from "/assets/hero.jpg";
import { BsChevronRight } from "react-icons/bs";

const dealsInfo = [
  {
    id: 1,
    description: "Lorem ipsum dolor sit amet consectetur",
    image: HeroImg,
  },
  {
    id: 2,
    description: "Lorem ipsum dolor sit amet consectetur",
    image: HeroImg,
  },
  {
    id: 3,
    description: "Lorem ipsum dolor sit amet consectetur",
    image: HeroImg,
  },
];

const Deals = () => {
  return (
    <div className="container mx-auto pt-10 grid grid-cols-3 gap-5">
      {dealsInfo.map((deal) => (
        <div
          key={deal.id}
          style={{
            backgroundImage: `url(${deal.image.src})`,
          }}
          className="relative bg-cover bg-center rounded-sm cursor-pointer flex flex-col justify-center items-center px-10 py-20"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-25 rounded-sm"></div>
          <p className="z-10 text-white font-semibold text-xl my-5 text-center">
            {deal.description}
          </p>
          <button className="z-10 text-white font-semibold py-2 px-6 text-base rounded hover:bg-white hover:text-black transition duration-200 ease-in-out">
            Shop Now
            <BsChevronRight className="inline-block ml-2" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Deals;
