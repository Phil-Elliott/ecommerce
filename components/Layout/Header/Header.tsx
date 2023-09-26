import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineSearch, AiOutlineHeart, AiFillShop } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiGame } from "react-icons/bi";
import { BsChevronDown, BsPersonCircle } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { logoutUser } from "redux/slices/userSlice";
import { Popup } from "components/shared";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Mobile from "./Mobile";

type HeaderProps = {
  signInButton: VoidFunction;
};

const Header = ({ signInButton }: HeaderProps) => {
  const [query, setQuery] = useState("");
  const [hiddenHeader, setHiddenHeader] = useState(false);
  const [isMobileHeaderOpen, setIsMobileHeaderOpen] = useState(false);

  const user = useSelector((state: RootState) => state.user);
  const cartQuantity = useSelector((state: RootState) => state.cart.length);
  const wishListQuantity = useSelector(
    (state: RootState) => state.wishList.length
  );

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

          <Link
            href="/shop"
            className="cursor-pointer lg:block hidden  h-full rounded hover:bg-gradient-bg py-1 px-3"
          >
            <p>Shop</p>
          </Link>

          {/* categories */}
          <Popup
            header={
              <div className="cursor-pointer lg:flex items-center gap-2 hidden rounded hover:bg-gradient-bg py-1 px-3">
                <p>Categories</p>
                <BsChevronDown className="" />
              </div>
            }
          >
            {/* categories */}
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
              {/* <Link
                className="p-2 flex items-center justify-between hover:bg-gray-100 cursor-pointer"
                href={`/shop?category=${encodeURIComponent("Clothes")}`}
              >
                <p className="pr-10">Deals</p>
                <ChevronRightIcon />
              </Link> */}
            </div>
          </Popup>
          {/* Search bar */}
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
          {/* users account */}
          {user.email ? (
            <Popup
              header={
                <div className="cursor-pointer lg:flex items-center gap-3 hidden rounded hover:bg-gradient-bg py-1 px-3">
                  <BsPersonCircle className="text-xl" />
                  <p>Account</p>
                  <BsChevronDown className="" />
                </div>
              }
            >
              {/* categories */}
              <div className="flex flex-col h-full w-full mt-3 text-sm">
                <Link
                  className="p-2 flex items-center justify-between hover:bg-gray-100 cursor-pointer"
                  href={`/account`}
                >
                  <p className="pr-10">Account</p>
                  <ChevronRightIcon />
                </Link>
                <Link
                  className="p-2 flex items-center justify-between hover:bg-gray-100 cursor-pointer"
                  href={`/orders`}
                >
                  <p className="pr-10">Orders</p>
                  <ChevronRightIcon />
                </Link>
                {/* <Link
                className="p-2 flex items-center justify-between hover:bg-gray-100 cursor-pointer"
                href={`/shop?category=${encodeURIComponent("Clothes")}`}
              >
                <p className="pr-10">Reviews</p>
                <ChevronRightIcon />
              </Link> */}
                <div
                  onClick={handleUserButton}
                  className="p-2 flex items-center justify-between hover:bg-gray-100 cursor-pointer"
                >
                  <p className="lg:block hidden">
                    {user.email ? "Sign Out" : "Sign In"}
                  </p>
                  <ChevronRightIcon />
                </div>
              </div>
            </Popup>
          ) : (
            <div
              onClick={handleUserButton}
              className="lg:flex hidden cursor-pointer items-center space-x-3 rounded hover:bg-gradient-bg py-1 px-3"
            >
              <BsPersonCircle className="text-xl" />
              <p className="lg:block hidden">
                {user.email ? "Sign Out" : "Sign In"}
              </p>
            </div>
          )}
          <Link
            href="/wishList"
            className="lg:flex hidden items-center space-x-3 cursor-pointer rounded hover:bg-gradient-bg py-1 px-3"
          >
            <div className="relative">
              <AiOutlineHeart className="text-xl" />
              {wishListQuantity > 0 && (
                <div className="absolute bottom-3 left-3 bg-white rounded-full p-0 px-1 text-xs">
                  <p className="text-Secondary font-black">
                    {wishListQuantity}
                  </p>
                </div>
              )}
            </div>
            <p className="xl:block hidden">WishList</p>
          </Link>
          <Link
            href="/cart"
            className="lg:flex hidden  items-center space-x-3 cursor-pointer rounded hover:bg-gradient-bg py-1 px-3"
          >
            <div className="relative">
              <FiShoppingCart className="text-xl" />
              {cartQuantity > 0 && (
                <div className="absolute bottom-3 left-3 bg-white rounded-full p-0 px-1 text-xs">
                  <p className="text-Secondary font-black">{cartQuantity}</p>
                </div>
              )}
            </div>
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
      <Mobile
        isMobileHeaderOpen={isMobileHeaderOpen}
        setIsMobileHeaderOpen={setIsMobileHeaderOpen}
        handleUserButton={handleUserButton}
        user={user}
      />
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
