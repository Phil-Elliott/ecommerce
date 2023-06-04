import React, { useEffect, useState } from "react";
import Link from "next/link";

import { AiOutlineSearch, AiOutlineHeart, AiFillShop } from "react-icons/ai";
import { BiGame } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { logoutUser } from "redux/slices/userSlice";

type HeaderProps = {
  signInButton: VoidFunction;
};

const Header = ({ signInButton }: HeaderProps) => {
  const [query, setQuery] = useState("");
  const [hiddenHeader, setHiddenHeader] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  const dispatch: AppDispatch = useDispatch();

  const handleUserButton = () => {
    if (user.email) {
      dispatch(logoutUser());
    } else {
      signInButton();
    }
  };

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
      className={`fixed w-full bg-Tertiary text-Primary shadow z-50 transition duration-500 ease-in-out ${
        hiddenHeader ? "-translate-y-20 " : " translate-y-0"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center text-md font-medium select-none h-full">
        <div className="cursor-pointer flex space-x-6 py-3">
          <Link
            href="/"
            className="flex gap-2 items-center text-LightWhite hover:text-Primary h-full"
          >
            {/* <AiFillShop className="text-2xl" /> */}
            <BiGame className="text-2xl" />
            <h1 className="text-xl font-bold">Retro Games</h1>
          </Link>
          <p className="cursor-pointer sm:hidden block">
            <Link href="/shop">Shop</Link>
          </p>
          {/* <p className="cursor-pointer sm:hidden block">Categories</p> */}
        </div>
        <p className="py-3 cursor-pointer sm:block hidden text-LightWhite hover:text-Primary h-full">
          <Link href="/shop">Shop</Link>
        </p>
        <p className="cursor-pointer sm:block hidden">Categories</p>
        <div className="relative justify-center items-center lg:w-2/5 w-3/5 sm:flex hidden">
          <AiOutlineSearch className="absolute left-0 ml-3 text-gray-400 text-xl cursor-pointer" />
          <input
            className="bg-gray-100 py-1 px-3 pl-10 rounded text-sm focus:outline-none w-full font-normal text-gray-700"
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
          <div
            onClick={handleUserButton}
            className="flex items-center space-x-3 text-LightWhite hover:text-Primary"
          >
            <BsPersonCircle className="text-xl" />
            <p className="lg:block hidden">
              {user.email ? "Sign Out" : "Sign In"}
            </p>
          </div>

          <Link
            href="/wishList"
            className="flex items-center space-x-3 cursor-pointer text-LightWhite hover:text-Primary"
          >
            <AiOutlineHeart className="text-xl" />
            <p className="lg:block hidden">WishList</p>
          </Link>
          <Link
            href="/cart"
            className="flex items-center space-x-3 cursor-pointer text-LightWhite hover:text-Primary"
          >
            <FiShoppingCart className="text-xl" />
            {/* <p className="lg:block hidden">$0.00</p> */}
          </Link>
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

1) Go and make filter responsive menu into a component
       - check that you can make it smaller first and stick to the side
2) Completely redo the header (copy and past code when you can)
3) Plug in the filter responsive menu component you made
4) Also add a categories button
5) Change the onKeyPress buttons to something newer
6) Maybe you can add animations to the responsive header
7) Work on categories dropdown and make it functional


Have it change to responsive menu earlier
Need a hamburger menu - could do it really similar to the shop page
     Make it into a shared component

*/
