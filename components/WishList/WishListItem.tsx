import React, { useState } from "react";
import { CldImage } from "next-cloudinary";
import { Ratings } from "components/shared";
import { BsTrash } from "react-icons/bs";
import { GameProps } from "components/shared/Types/Types";
import { FiShoppingCart } from "react-icons/fi";
import { useAddToCart } from "utils/useAddToCart/useAddToCart";
import { useRemoveFromWishList } from "utils/useRemoveFromWishList/useRemoveFromWishList";

type WishListItemProps = {
  product: GameProps;
};

const WishListItem = ({ product }: WishListItemProps) => {
  const addToCart = useAddToCart();
  const removeFromList = useRemoveFromWishList();

  return (
    <div
      key={product._id}
      className="grid grid-cols-6 gap-4  w-full py-4 px-6 bg-white rounded border-b-2 border-gray-200"
    >
      <div className="col-span-2 space-y-5">
        <div className="flex space-x-10 ">
          <CldImage
            src={product.image[0] || "2"}
            width="100"
            height="100"
            alt={product?.name || "Game picture"}
            className="w-16 h-16"
          />
          <div className="text-sm flex flex-col justify-between">
            <h2 className="font-medium text-base">{product.name}</h2>
            <div className="flex space-x-2 items-center text-sm">
              <Ratings rating={product.rating} />
              <p>{product.rating}</p>
              <p className="text-gray-500">(12)</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div
            className="flex items-center gap-1 cursor-pointer hover:text-red-500 transition duration-300"
            onClick={() => addToCart(product)}
          >
            <FiShoppingCart className="text-red-500" />
            <p>Add to cart</p>
          </div>
          <div
            className="flex items-center gap-1 cursor-pointer hover:text-red-500 transition duration-300"
            onClick={() => removeFromList(product._id)}
          >
            <BsTrash className="text-red-500" />
            <p>Remove</p>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600">{product.category[0]}</p>
      <p className="text-sm text-gray-600">{product.publisher}</p>
      <p className="text-sm text-gray-600">{product.platform}</p>
      <p className="text-sm text-gray-600">${product.price}</p>
    </div>
  );
};

export default WishListItem;
