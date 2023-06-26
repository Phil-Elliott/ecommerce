import React from "react";
import Image from "next/image";
import { GameProps } from "components/shared/Types/Types";
import Nintendo from "assets/logos/nintendo.png";
import Konami from "assets/logos/Konami.png";
import Capcom from "assets/logos/capcon.png";
import Square from "assets/logos/square.jpg";
import Sega from "assets/logos/sega.png";

type TopBrandsProps = {
  games: GameProps[];
};

const LogoLinks = [
  {
    title: "Nintendo",
    logo: Nintendo,
    link: "/",
  },
  {
    title: "Capcon",
    logo: Capcom,
    link: "/",
  },
  {
    title: "Square",
    logo: Square,
    link: "/",
  },
  {
    title: "Konami",
    logo: Konami,
    link: "/",
  },
  {
    title: "Sega",
    logo: Sega,
    link: "/",
  },
];

const TopBrands = ({ games }: TopBrandsProps) => {
  const publishers = games
    .map((game) => game.publisher)
    .filter((publisher) => publisher && publisher.trim() !== "")
    .filter((publisher, index, self) => self.indexOf(publisher) === index);

  return (
    <div className="bg-gray-100 py-16 mt-16">
      <div className="container mx-auto ">
        <h1 className="text-3xl font-semibold leading-relaxed">
          Top Brands. <span className="text-gray-500">Take Your Pick.</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-10">
          {LogoLinks.map((logo) => (
            <div
              key={logo.title}
              className="h-64 sm:h-48 w-full bg-white p-6 flex items-center justify-center rounded-lg shadow-md hover:shadow-lg cursor-pointer"
            >
              <Image
                src={logo.logo}
                alt={logo.title}
                className="w-full h-3/4 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBrands;

/*

1) Make an array of data for each link
        - title, logo, link

*/
