import React, { useEffect } from "react";

import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";

import { BsTrash } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { useAddToCart } from "utils/useAddToCart/useAddToCart";
import { useRemoveFromWishList } from "utils/useRemoveFromWishList/useRemoveFromWishList";
import { CldImage } from "next-cloudinary";

const WishList = () => {
  const list = useSelector((state: RootState) => state.wishList);
  const dispatch = useDispatch();

  const addToCart = useAddToCart();
  const removeFromList = useRemoveFromWishList();

  return (
    <div className="container mx-auto flex flex-col items-center min-h-screen pb-10 pt-32 bg-gray-100">
      <h1 className="text-4xl mb-5">Wish List</h1>
      <div className="w-full flex flex-col items-center pt-10">
        {list.length > 0 ? (
          list.map((product) => (
            <div
              key={product?._id}
              className="flex justify-between items-center w-full mb-6 p-4 bg-white rounded shadow-lg"
            >
              {product.name}

              <CldImage
                src={product.image[0] || "2"}
                width="600"
                height="600"
                alt={product?.name || "Game picture"}
                className="w-16 h-16"
              />
              <div className="ml-4">
                <h2 className="text-lg font-bold">{product.name}</h2>
                <p className="text-sm text-gray-600">${product.price} each</p>
              </div>
              <div className="flex items-center">
                <BsTrash
                  className="text-xl cursor-pointer text-red-500"
                  onClick={() => removeFromList(product._id)}
                />
                <FiShoppingCart
                  className="ml-4 text-xl cursor-pointer text-green-500"
                  onClick={() => addToCart(product)}
                />
              </div>
            </div>
          ))
        ) : (
          <p>Your Wish List is empty</p>
        )}
      </div>
    </div>
  );
};

export default WishList;
