import React from "react";
import Image from "next/image";
import Link from "next/link";
import HeroImg from "/assets/hero.jpg";
import Button from "components/shared/Button/Button";

const Hero = () => {
  return (
    <div className="relative container mx-auto pt-24 flex justify-center items-center">
      {/* <Image
        src={HeroImg}
        alt="Hero"
        className="object-cover w-full h-full brightness-0 rounded-sm"
      /> */}
      <img
        src="https://www.racketboy.com/images/interview-game-collecting-001-collection-featured.jpg"
        alt="Video games"
        className="object-cover w-full h-[65vh] brightness-50 rounded-sm"
      />
      <div className="absolute flex flex-col justify-center items-center gap-8">
        <h1 className="text-white font-bold text-fluid-5xl sm:text-6xl  lg:text-8xl w-4/5 sm:w-2/3 text-center text-shadow leading-snug">
          Rediscover the Classics
        </h1>
        {/* <p className="text-white font-semibold text-xl w-2/4 text-center text-shadow">
          Experience nostalgia with our curated collection of retro games and
          consoles.
        </p> */}
        <Link href="/shop">
          <Button
            ariaLabel="Shop All"
            className="bg-Tertiary text-Primary font-semibold py-2 px-8 text-xl rounded-sm shadow hover:bg-Secondary transition duration-200 ease-in-out"
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
