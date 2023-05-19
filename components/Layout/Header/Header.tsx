import React, { useEffect, useState } from "react";
import Link from "next/link";

import { AiOutlineSearch, AiOutlineHeart, AiFillShop } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import router from "next/router";

type HeaderProps = {
  signInButton: VoidFunction;
};

const Header = ({ signInButton }: HeaderProps) => {
  const [query, setQuery] = useState("");
  const [hiddenHeader, setHiddenHeader] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setHiddenHeader(true);
      } else {
        setHiddenHeader(false);
      }
      lastScrollY = currentScrollY;
    });
  });

  return (
    <div
      className={`fixed w-full bg-white shadow z-50 transition duration-500 ease-in-out ${
        hiddenHeader ? "-translate-y-20 " : " translate-y-0"
      }`}
    >
      <div className="container mx-auto py-4 flex justify-between items-center text-md font-medium select-none">
        <div className="cursor-pointer flex space-x-6">
          <Link href="/">
            <AiFillShop className="text-2xl" />
          </Link>
          <p className="cursor-pointer sm:hidden block">
            <Link href="/shop">Shop</Link>
          </p>
          {/* <p className="cursor-pointer sm:hidden block">Categories</p> */}
        </div>
        <p className="cursor-pointer sm:block hidden">
          <Link href="/shop">Shop</Link>
        </p>
        {/* <p className="cursor-pointer sm:block hidden">Categories</p> */}
        <div className="relative justify-center items-center lg:w-2/5 w-3/5 sm:flex hidden">
          <AiOutlineSearch className="absolute left-0 ml-3 text-gray-400 text-xl cursor-pointer" />
          <input
            className="bg-gray-100 py-2 px-3 pl-10 rounded text-base focus:outline-none w-full font-normal text-gray-700"
            type="text"
            placeholder="What can we help you find"
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" &&
              router.push(`/shop?search=${encodeURIComponent(query.trim())}`)
            }
          />
        </div>
        <div className="flex items-center lg:space-x-12 space-x-6 cursor-pointer">
          <div onClick={signInButton} className="flex items-center space-x-3">
            <BsPersonCircle className="text-xl" />
            <p className="lg:block hidden">Sign in</p>
          </div>
          <div className="flex items-center space-x-3 cursor-pointer">
            <AiOutlineHeart className="text-xl" />
            <p className="lg:block hidden">Wishlist</p>
          </div>
          <div className="flex items-center space-x-3 cursor-pointer">
            <FiShoppingCart className="text-xl" />
            {/* <p className="lg:block hidden">$0.00</p> */}
          </div>
        </div>
      </div>
      <div className="relative justify-center items-center w-full px-4 pb-4 sm:hidden flex">
        <AiOutlineSearch className="absolute left-0 ml-6 text-gray-400 text-xl cursor-pointer" />
        <input
          className="bg-gray-100 py-2 px-3 pl-10 rounded text-base focus:outline-none w-full font-normal text-gray-700"
          type="text"
          placeholder="What can we help you find"
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) =>
            e.key === "Enter" &&
            router.push(`/shop?search=${encodeURIComponent(query)}`)
          }
        />
      </div>
    </div>
  );
};

export default Header;

/*

need to change to shop page when the user presses enter
need to also pass the search query to the shop page

*/
