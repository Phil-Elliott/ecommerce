import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { AiOutlineSearch, AiOutlineHeart, AiFillShop } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiGame } from "react-icons/bi";
import { BsChevronDown, BsPersonCircle } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { logoutUser } from "redux/slices/userSlice";
import { MobileHeader, Popup } from "components/shared";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Hero from "assets/hero.jpg" 
import AccessoriesImage from "assets/accessories.jpg";
import ConsoleImage from "assets/consoles.webp";
import GameImage from "assets/games.webp";
import ClothesImage from "assets/clothing.jpg";
import DealsImage from "assets/discount.jpg";

type HeaderProps = {
  signInButton: VoidFunction;
};

const Header = ({ signInButton }: HeaderProps) => {
  const [query, setQuery] = useState("");
  const [hiddenHeader, setHiddenHeader] = useState(false);
  const [isMobileHeaderOpen, setIsMobileHeaderOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);

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
    },{
      name: "Deals",
      link: "/shop?category=Clothes",
      image: DealsImage,
    },
  ];

  return (
    <>
      <div
        className={`fixed w-full bg-Tertiary text-Primary shadow z-50 transition duration-500 ease-in-out ${
          hiddenHeader ? "-translate-y-20 " : " translate-y-0"
        }`}
      >
        <div className="py-3 container mx-auto flex justify-between items-center text-md font-medium select-none h-full">
          <Link
            href="/"
            className="flex gap-2 items-center text-LightWhite hover:text-Primary h-full"
          >
            <BiGame className="text-2xl" />
            <h1 className="text-xl font-bold">RetroGames</h1>
          </Link>

          <p className="cursor-pointer lg:block hidden  h-full rounded hover:bg-gradient-bg py-1 px-3">
            <Link href="/shop">Shop</Link>
          </p>

          {/* categories */}
          <Popup
            header={
              <div className="cursor-pointer lg:flex items-center gap-2 hidden rounded hover:bg-gradient-bg py-1 px-3">
                <p>Categories</p>
                <BsChevronDown className="" />
              </div>
            }
          >
            <div className="flex flex-col h-full w-full mt-3 text-sm">
              <Link
                className="p-2 flex items-center justify-between hover:bg-gray-100 cursor-pointer"
                href={`/shop?category=${encodeURIComponent("Game")}`}
              >
                <p className="pr-10">Video Games</p>
                <ChevronRightIcon />
              </Link>
              <Link
                className="p-2 flex items-center justify-between hover:bg-gray-100 cursor-pointer"
                href={`/shop?category=${encodeURIComponent("Console")}`}
              >
                <p className="pr-10">Consoles and hardware</p>
                <ChevronRightIcon />
              </Link>
              <Link
                className="p-2 flex items-center justify-between hover:bg-gray-100 cursor-pointer"
                href={`/shop?category=${encodeURIComponent("Accessories")}`}
              >
                <p className="pr-10">Gamine Accessories</p>
                <ChevronRightIcon />
              </Link>
              <Link
                className="p-2 flex items-center justify-between hover:bg-gray-100 cursor-pointer"
                href={`/shop?category=${encodeURIComponent("Clothes")}`}
              >
                <p className="pr-10">Clothing</p>
                <ChevronRightIcon />
              </Link>
              <Link
                className="p-2 flex items-center justify-between hover:bg-gray-100 cursor-pointer"
                href={`/shop?category=${encodeURIComponent("Clothes")}`}
              >
                <p className="pr-10">Deals</p>
                <ChevronRightIcon />
              </Link>
            </div>
          </Popup>

          <div className="relative justify-center items-center lg:w-2/5 w-3/5 lg:flex hidden">
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

          <div
            onClick={handleUserButton}
            className="lg:flex hidden cursor-pointer items-center space-x-3 rounded hover:bg-gradient-bg py-1 px-3"
          >
            <BsPersonCircle className="text-xl" />
            <p className="lg:block hidden">
              {user.email ? "Sign Out" : "Sign In"}
            </p>
          </div>

          <Link
            href="/wishList"
            className="lg:flex hidden items-center space-x-3 cursor-pointer rounded hover:bg-gradient-bg py-1 px-3"
          >
            <AiOutlineHeart className="text-xl" />
            <p className="lg:block hidden">WishList</p>
          </Link>
          <Link
            href="/cart"
            className="lg:flex hidden  items-center space-x-3 cursor-pointer rounded hover:bg-gradient-bg py-1 px-3"
          >
            <FiShoppingCart className="text-xl" />
          </Link>
          <div
            className="lg:hidden block text-xl cursor-pointer"
            onClick={() => setIsMobileHeaderOpen(true)}
            role="button"
          >
            <GiHamburgerMenu />
          </div>
        </div>
      </div>
      <MobileHeader
        isOpen={isMobileHeaderOpen}
        closeHandler={() => setIsMobileHeaderOpen(false)}
        title="Menu"
      >
        <div className="p-4 border-b-2">
          <div className="flex justify-between items-center cursor-pointer ">
            <Link href="/" className="text-xl text-base font-medium">
              Home
            </Link>
          </div>
        </div>
        <div className="p-4 border-b-2 select-none">
          <div
            className="flex justify-between items-center cursor-pointer " onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}>
            <p className="text-xl text-base font-medium">Categories</p>
            <BsChevronDown className="text-lg" />
          </div>
          { isMobileCategoriesOpen &&
            <div className="grid grid-cols-3 pt-6 pb-2 gap-6">
            {mobileCategories.map((category) => (
              <Link
                key={category.name}
                href={category.link}
                className="cursor-pointer text-sm font-medium flex flex-col items-center justify-start hover:text-Secondary"
              >
                <Image src={category.image} width={70} height={70} alt="category.name" className="rounded-full h-16 w-16 object-cover"/>
                <p className="text-center pt-2">{category.name}</p>
              </Link>
            ))}
          </div>}
        </div>
        <div className="p-4 border-b-2">
          <div className="flex justify-between items-center cursor-pointer ">
            <Link className="text-xl text-base font-medium" href="/shop">
              Shop
            </Link>
          </div>
        </div>
        <div className="p-4 border-b-2">
          <div className="flex justify-between items-center cursor-pointer">
            <Link
              href="/wishList"
              className="flex items-center space-x-3 cursor-pointer text-xl text-base font-medium"
            >
              <AiOutlineHeart />
              <p>WishList</p>
            </Link>
          </div>
        </div>
        <div className="p-4 border-b-2">
          <div className="flex justify-between items-center cursor-pointer">
            <Link
              href="/cart"
              className="flex items-center space-x-3 cursor-pointer text-xl text-base font-medium"
            >
              <FiShoppingCart />
              <p>Cart</p>
            </Link>
          </div>
        </div>
        <div className="p-4 border-b-2">
          <div className="flex justify-between items-center cursor-pointer">
            <div
              onClick={handleUserButton}
              className="flex items-center space-x-3 cursor-pointer text-xl text-base font-medium"
            >
              <BsPersonCircle className="" />
              <p>{user.email ? "Sign Out" : "Sign In"}</p>
            </div>
          </div>
        </div>
      </MobileHeader>
    </>
  );
};

export default Header;

/*


1) Categories dropdown
2) Categories responsive
3) Search bar responsive


Have it change to responsive menu earlier
Need a hamburger menu - could do it really similar to the shop page
     Make it into a shared component

*/
