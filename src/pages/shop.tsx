import React from "react";
import HeroImg from "/assets/hero.jpg";

import { FiChevronDown, FiChevronLeft } from "react-icons/fi";
import Image from "next/image";

type ProductsProps = {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
};

type ShopProps = {
  products: ProductsProps[];
};

const shop = ({ products }: ShopProps) => {
  return (
    <div className="container mx-auto py-28">
      <div className="flex justify-between items-center font-medium pb-10">
        <h1 className="text-3xl">Products</h1>
        <div className="flex space-x-6">
          <div className="flex items-center space-x-1">
            <p>Hide Filter</p>
            <FiChevronLeft />
          </div>
          <div className="flex items-center space-x-1">
            <p>Sort By</p>
            <FiChevronDown />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-1">
          <div className="bg-white rounded-lg p-5">
            <h1 className="text-xl font-semibold">Categories</h1>
            <div className="flex flex-col space-y-2 mt-5">
              <div className="flex items-center space-x-2">
                <input type="checkbox" />
                <p>Category 1</p>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" />
                <p>Category 2</p>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" />
                <p>Category 3</p>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" />
                <p>Category 4</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 grid grid-cols-3 gap-10">
          {products.map((product) => (
            <div className="bg-white rounded-lg shadow hover:shadow-lg w-64 inline-block cursor-pointer select-none">
              <Image
                src={HeroImg}
                alt={product.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-4 w-64 flex flex-col justify-between h-32">
                <h1 className="text-lg font-semibold whitespace-normal">
                  {product.name}
                </h1>
                <p className="text-gray-500">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default shop;
