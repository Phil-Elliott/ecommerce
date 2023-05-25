import React from "react";
import Image from "next/image";
import Link from "next/link";
import HeroImg from "/assets/hero.jpg";
import Button from "components/shared/Button/Button";

const Hero = () => {
  return (
    <div className="relative container mx-auto pt-28 flex justify-center items-center">
      <Image
        src={HeroImg}
        alt="Hero"
        className="object-cover w-full h-full brightness-0 rounded-sm"
      />
      <div className="absolute flex flex-col justify-center items-center gap-8">
        <h1 className="text-white font-bold text-8xl">Great Products</h1>
        <p className="text-white font-semibold text-xl ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        </p>
        <Link href="/shop">
          <Button
            ariaLabel="Shop All"
            className="bg-white text-black font-semibold py-2 px-12 text-xl rounded hover:bg-gray-200 transition duration-200 ease-in-out"
          >
            Shop All
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;

//h-screen
