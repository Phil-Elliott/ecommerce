import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GameProps } from "components/shared/Types/Types";
import Nintendo from "assets/logos/nintendo.png";
import Konami from "assets/logos/Konami.png";
import Capcom from "assets/logos/capcon.png";
import Square from "assets/logos/square.jpg";
import Sega from "assets/logos/sega.png";

const LogoLinks = [
  {
    title: "Nintendo",
    logo: Nintendo,
    link: "/shop?publisher=Nintendo",
  },
  {
    title: "Capcom",
    logo: Capcom,
    link: "/shop?publisher=Capcom",
  },
  {
    title: "Square",
    logo: Square,
    link: "/shop?publisher=Square Enix",
  },
  {
    title: "Konami",
    logo: Konami,
    link: "/shop?publisher=Konami",
  },
  {
    title: "Sega",
    logo: Sega,
    link: "/shop?publisher=Sega",
  },
];

const TopBrands = () => {
  return (
    <div className="bg-gray-100 py-16 mt-16">
      <div className="container mx-auto ">
        <h1 className="text-3xl font-semibold leading-relaxed">
          Top Brands. <span className="text-gray-500">Take Your Pick.</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-10">
          {LogoLinks.map((logo) => (
            <Link
              href={logo.link}
              key={logo.title}
              className="h-64 sm:h-48 w-full bg-white p-6 flex items-center justify-center rounded-lg shadow-md hover:shadow-lg cursor-pointer"
            >
              <Image
                src={logo.logo}
                alt={logo.title}
                className="w-full h-3/4 object-contain"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBrands;
