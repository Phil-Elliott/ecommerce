import React from "react";
import Image from "next/image";
import HeroImg from "/assets/hero.jpg";

const Hero = () => {
  return (
    <div className="relative container mx-auto pt-28 flex justify-center items-center">
      <Image
        src={HeroImg}
        alt="Hero"
        className="object-cover w-full h-full brightness-75 rounded-sm"
      />
      <div className="absolute flex flex-col justify-center items-center">
        <h1 className="text-white font-bold text-8xl">Great Products</h1>
        <p className="text-white font-semibold text-xl my-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        </p>
        <button className="bg-white text-black font-semibold py-2 px-12 text-xl rounded hover:bg-gray-200 transition duration-200 ease-in-out">
          Shop All
        </button>
      </div>
    </div>
  );
};

export default Hero;

//h-screen
