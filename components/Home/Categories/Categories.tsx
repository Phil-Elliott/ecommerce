import React from "react";
import Image from "next/image";
import HeroImg from "/assets/hero.jpg";
import { BsChevronRight } from "react-icons/bs";
import Button from "components/shared/Button/Button";
import AccessoriesImage from "assets/accessories.jpg";
import ConsoleImage from "assets/consoles.webp";
import GameImage from "assets/games.webp";
import Link from "next/link";

const categoriesInfo = [
  {
    id: 1,
    description: "Games",
    image: GameImage,
    link: "/shop?category=Game",
  },
  {
    id: 2,
    description: "Consoles",
    image: ConsoleImage,
    link: "/shop?category=Console",
  },
  {
    id: 3,
    description: "Accessories",
    image: AccessoriesImage,
    link: "/shop?category=Accessories",
  },
];

const Categories = () => {
  return (
    <div className="container mx-auto pt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {categoriesInfo.map((cat) => (
        <Link
          href={cat.link}
          key={cat.id}
          style={{
            backgroundImage: `url(${cat.image.src})`,
          }}
          className="relative bg-cover bg-center rounded-sm cursor-pointer flex flex-col justify-center items-center px-10 py-10 sm:py-20"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 rounded-sm"></div>
          <p className="z-10 text-white font-semibold text-2xl my-5 text-center">
            {cat.description}
          </p>
          <Button
            ariaLabel="Shop Now"
            className="z-10 text-white font-semibold py-2 px-6 text-base rounded hover:bg-white hover:text-black transition duration-200 ease-in-out inline-flex items-center space-x-2"
            onClick={() => {
              /* Add your onClick functionality for the specific cat here */
            }}
          >
            Shop Now
            <BsChevronRight className="inline-block ml-2" />
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
