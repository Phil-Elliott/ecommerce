import React from "react";
import Link from "next/link";
import Button from "components/shared/Button/Button";
import { CldImage } from "next-cloudinary";

const Hero = () => {
  return (
    <div className="relative container mx-auto pt-24 flex justify-center items-center">
      <CldImage
        src="https://res.cloudinary.com/djdxd5akb/image/upload/v1691214276/Ecommerce/hero_jgjpik.jpg"
        alt="Video games"
        className="object-cover w-full lg:h-[65vh] brightness-75 rounded-sm"
        width="1500"
        height="600"
        priority={true}
      />
      <div className="absolute flex flex-col justify-center items-center gap-8">
        <h1 className="text-white font-bold text-fluid-4xl sm:text-6xl  lg:text-8xl w-4/5 sm:w-2/3 text-center text-shadow leading-snug">
          Rediscover the Classics
        </h1>
        <Link href="/shop">
          <Button
            ariaLabel="Shop All"
            className="bg-Tertiary text-Primary font-semibold py-2 px-8 sm:text-xl rounded-sm shadow hover:bg-Secondary transition duration-200 ease-in-out"
          >
            Shop All
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
