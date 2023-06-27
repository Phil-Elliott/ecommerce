import React from "react";

import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

import WishListItem from "components/WishList/WishListItem";

const WishList = () => {
  const list = useSelector((state: RootState) => state.wishList);

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto min-h-screen pb-10 pt-28 ">
        <div className="bg-white w-full rounded">
          <h1 className="text-3xl mb-0 py-4 px-6">Your Wishlist</h1>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 items-center w-full py-4 px-6 border-b-2 border-gray-200">
            <p className="col-span-2">Item</p>
            <p className="hidden sm:block">Category</p>
            <p className="hidden md:block">Publisher</p>
            <p className="hidden lg:block">Platform</p>
            <p className="hidden sm:block">Price</p>
          </div>
          <div>
            {list.length > 0 ? (
              list.map((product) => (
                <WishListItem key={product._id} product={product} />
              ))
            ) : (
              <p className="p-20 text-center">Your wish list is empty</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishList;
