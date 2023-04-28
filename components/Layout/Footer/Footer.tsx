import React from "react";

import { AiOutlineTwitter, AiOutlineInstagram } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="container mx-auto flex justify-between items-center py-5 border-grey border-t-2 text-gray-500 text-sm flex-col md:flex-row">
      <div className="flex space-x-6 text-sm items-center">
        <div className="bg-black text-white p-1 rounded-full">
          <AiOutlineTwitter />
        </div>
        <div className="bg-black text-white p-1 rounded-full">
          <AiOutlineInstagram />
        </div>
        <div className="bg-black text-white p-1 rounded-full">
          <FaFacebookF />
        </div>
      </div>
      <div className="flex flex-wrap gap-3 pt-6 md:pt-0">
        <p>Terms</p>
        <p>Privacy</p>
        <p>Security</p>
        <p>Help</p>
        <p>@2023 StoreName</p>
      </div>
    </div>
  );
};

export default Footer;
