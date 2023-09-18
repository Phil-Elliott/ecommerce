import React from "react";

import { AiOutlineTwitter, AiOutlineInstagram } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="border-grey border-t-2 text-gray-500">
      <div className="container mx-auto flex justify-between items-center py-5 text-sm flex-col md:flex-row">
        <div className="flex space-x-6 text-sm items-center">
          <div className="bg-black text-white p-1 rounded-full cursor-pointer">
            <AiOutlineTwitter />
          </div>
          <div className="bg-black text-white p-1 rounded-full cursor-pointer">
            <AiOutlineInstagram />
          </div>
          <div className="bg-black text-white p-1 rounded-full cursor-pointer">
            <FaFacebookF />
          </div>
        </div>
        <div className="flex flex-wrap gap-3 pt-6 md:pt-0">
          <p className="cursor-pointer">Terms</p>
          <p className="cursor-pointer">Privacy</p>
          <p className="cursor-pointer">Security</p>
          <p className="cursor-pointer">Help</p>
          <p className="cursor-pointer">@2023 RetroGames</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
