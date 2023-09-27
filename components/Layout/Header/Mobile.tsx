import React, { useState } from "react";
import Image from "next/image";
import { MobileHeader } from "components/shared";
import Link from "next/link";
import { BsChevronDown, BsPersonCircle } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BiPackage } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";

import AccessoriesImage from "assets/accessories.jpg";
import ConsoleImage from "assets/consoles.webp";
import GameImage from "assets/games.webp";
import ClothesImage from "assets/clothing.jpg";
import DealsImage from "assets/discount.jpg";

type MobileProps = {
  isMobileHeaderOpen: boolean;
  setIsMobileHeaderOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUserButton: () => void;
  user: any;
};

const Mobile = ({
  isMobileHeaderOpen,
  setIsMobileHeaderOpen,
  handleUserButton,
  user,
}: MobileProps) => {
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);

  const mobileCategories = [
    {
      name: "Video Games",
      link: "/shop?category=Game",
      image: GameImage,
    },
    {
      name: "Consoles and hardware",
      link: "/shop?category=Console",
      image: ConsoleImage,
    },
    {
      name: "Gaming Accessories",
      link: "/shop?category=Accessories",
      image: AccessoriesImage,
    },
    {
      name: "Clothing",
      link: "/shop?category=Clothes",
      image: ClothesImage,
    },
    // {
    //   name: "Deals",
    //   link: "/shop?category=Clothes",
    //   image: DealsImage,
    // },
  ];

  return (
    <MobileHeader
      isOpen={isMobileHeaderOpen}
      closeHandler={() => setIsMobileHeaderOpen(false)}
      title="Menu"
    >
      <div className="flex justify-between items-center border-b-2">
        <Link
          href="/"
          className="text-xl text-base font-medium w-full h-full cursor-pointer p-4"
          onClick={() => setIsMobileHeaderOpen(false)}
        >
          Home
        </Link>
      </div>
      <div className="border-b-2 select-none">
        <div
          className="flex justify-between items-center cursor-pointer p-4"
          onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
        >
          <p className="text-xl text-base font-medium">Categories</p>
          <BsChevronDown className="text-lg" />
        </div>
        {isMobileCategoriesOpen && (
          <div className="grid grid-cols-3 py-6 gap-6">
            {mobileCategories.map((category) => (
              <Link
                key={category.name}
                href={category.link}
                className="cursor-pointer text-sm font-medium flex flex-col items-center justify-start hover:text-Secondary"
              >
                <Image
                  src={category.image}
                  width={70}
                  height={70}
                  alt="category.name"
                  className="rounded-full h-16 w-16 object-cover"
                />
                <p className="text-center pt-2">{category.name}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-between items-center  border-b-2">
        <Link
          className="p-4 text-xl text-base font-medium cursor-pointer w-full h-full"
          href="/shop"
          onClick={() => setIsMobileHeaderOpen(false)}
        >
          Shop
        </Link>
      </div>
      <div className="flex justify-between items-center cursor-pointer border-b-2">
        <Link
          href="/wishList"
          className="p-4 flex items-center space-x-3 cursor-pointer text-xl text-base font-medium w-full h-full"
          onClick={() => setIsMobileHeaderOpen(false)}
        >
          <AiOutlineHeart />
          <p>WishList</p>
        </Link>
      </div>
      <div className="flex justify-between items-center cursor-pointer border-b-2">
        <Link
          href="/cart"
          className="p-4 flex items-center space-x-3 cursor-pointer text-xl text-base font-medium w-full h-full"
          onClick={() => setIsMobileHeaderOpen(false)}
        >
          <FiShoppingCart />
          <p>Cart</p>
        </Link>
      </div>
      <div className="flex justify-between items-center cursor-pointer border-b-2">
        <Link
          href="/orders"
          className="p-4 flex items-center space-x-3 cursor-pointer text-xl text-base font-medium w-full h-full"
          onClick={() => setIsMobileHeaderOpen(false)}
        >
          <BiPackage />
          <p>Orders</p>
        </Link>
      </div>
      <div className="flex justify-between items-center cursor-pointer border-b-2">
        <Link
          href="/account"
          className="p-4 flex items-center space-x-3 cursor-pointer text-xl text-base font-medium w-full h-full"
          onClick={() => setIsMobileHeaderOpen(false)}
        >
          <IoSettingsOutline />
          <p>Account</p>
        </Link>
      </div>
      <div className="flex justify-between items-center cursor-pointer border-b-2">
        <div
          className="p-4 flex items-center space-x-3 cursor-pointer text-xl text-base font-medium w-full h-full"
          onClick={() => {
            setIsMobileHeaderOpen(false);
            handleUserButton();
          }}
        >
          <BsPersonCircle className="" />
          <p>{user.email ? "Sign Out" : "Sign In"}</p>
        </div>
      </div>
    </MobileHeader>
  );
};

export default Mobile;
