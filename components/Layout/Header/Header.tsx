import React from "react";
import { AiOutlineSearch, AiOutlineHeart, AiFillShop } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";

const Header = () => {
  return (
    <div className="fixed w-full bg-white shadow z-10">
      <div className="container mx-auto py-4 flex justify-between items-center text-md font-medium select-none">
        <div className="cursor-pointer flex space-x-6">
          <AiFillShop className="text-2xl" />
          <p className="cursor-pointer sm:hidden block">Categories</p>
          <p className="cursor-pointer sm:hidden block">Deals</p>
        </div>
        <p className="cursor-pointer sm:block hidden">Categories</p>
        <p className="cursor-pointer sm:block hidden">Deals</p>
        <div className="relative justify-center items-center lg:w-2/5 w-3/5 sm:flex hidden">
          <AiOutlineSearch className="absolute left-0 ml-3 text-gray-400 text-xl cursor-pointer" />
          <input
            className="bg-gray-100 py-2 px-3 pl-10 rounded text-base focus:outline-none w-full font-normal text-gray-700"
            type="text"
            placeholder="What can we help you find"
          />
        </div>
        <div className="flex items-center lg:space-x-12 space-x-6 cursor-pointer">
          <div className="flex items-center space-x-3">
            <BsPersonCircle className="text-xl" />
            <p className="lg:block hidden">Sign in</p>
          </div>
          <div className="flex items-center space-x-3 cursor-pointer">
            <AiOutlineHeart className="text-xl" />
            <p className="lg:block hidden">Wishlist</p>
          </div>
          <div className="flex items-center space-x-3 cursor-pointer">
            <FiShoppingCart className="text-xl" />
            <p className="lg:block hidden">$0.00</p>
          </div>
        </div>
      </div>
      <div className="relative justify-center items-center w-full px-4 pb-4 sm:hidden flex">
        <AiOutlineSearch className="absolute left-0 ml-6 text-gray-400 text-xl cursor-pointer" />
        <input
          className="bg-gray-100 py-2 px-3 pl-10 rounded text-base focus:outline-none w-full font-normal text-gray-700"
          type="text"
          placeholder="What can we help you find"
        />
      </div>
    </div>
  );
};

export default Header;
