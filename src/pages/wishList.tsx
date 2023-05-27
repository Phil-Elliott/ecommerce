import React from "react";

import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { BsTrash } from "react-icons/bs";

const WishList = () => {
  const list = useSelector((state: RootState) => state.wishList);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto flex flex-col items-center min-h-screen pb-10 pt-32 bg-gray-100">
      <h1 className="text-4xl mb-5">Wish List</h1>
      <div className="w-full flex flex-col items-center pt-10">
        {list.length > 0 ? (
          list.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center w-full mb-6 p-4 bg-white rounded shadow-lg"
            >
              <img
                className="w-16 h-16"
                src={`/images/${product.image}`}
                alt={product.name}
              />
              <div className="ml-4">
                <h2 className="text-lg font-bold">{product.name}</h2>
                <p className="text-sm text-gray-600">${product.price} each</p>
              </div>
              <div className="flex items-center">
                <BsTrash
                  className="text-xl cursor-pointer text-red-500"
                  // onClick={() => dispatch(removeFromCart(product.id))}
                />
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default WishList;
