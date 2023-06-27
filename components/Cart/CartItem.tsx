import React, { useState } from "react";
import { CldImage } from "next-cloudinary";
import { Ratings } from "components/shared";
import { AiOutlineHeart } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { GameProps } from "components/shared/Types/Types";
import { useRemoveFromCart } from "utils/useRemoveFromCart/useRemoveFromCart";
import { useAddToWishList } from "utils/useAddToWishList/useAddToWishList";
import { useChangeCartQuantity } from "utils/useeChangeCartQuantity/useeChangeCartQuantity";

type CartItemProps = {
  product: GameProps;
};

const CartItem = ({ product }: CartItemProps) => {
  const [cartQuantity, setCartQuantity] = useState<number>(
    product.quantity || 1
  );

  const removeFromCart = useRemoveFromCart();
  const addToList = useAddToWishList();
  const changeQuantity = useChangeCartQuantity();

  function handleChange(e: any) {
    setCartQuantity(e.target.value);

    changeQuantity({
      id: product._id,
      quantity: Number(e.target.value),
    });
  }

  return (
    <div
      key={product._id}
      className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4  w-full p-4 bg-white rounded border-b-2 border-gray-200"
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
          <div className="text-sm space-y-2">
            <h2 className="font-medium text-base">{product.name}</h2>
            <p>{product.platform}</p>
            <p className="text-sm text-gray-600 block lg:hidden">
              ${product.price}
            </p>

            <div className="flex items-start space-x-2 block sm:hidden">
              <p>Quantity:</p>
              <input
                type="number"
                min="1"
                className="border rounded w-20 text-center mr-2"
                value={cartQuantity}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex block sm:hidden">
              <p>Total: ${(product.price * cartQuantity).toFixed(2)}</p>
            </div>
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
            onClick={() => addToList(product)}
          >
            <AiOutlineHeart className="text-red-500" />
            <p>Save</p>
          </div>
          <div
            className="flex items-center gap-1 cursor-pointer hover:text-red-500 transition duration-300"
            onClick={() => removeFromCart(product._id)}
          >
            <BsTrash className="text-red-500" />
            <p>Remove</p>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600 hidden lg:block">${product.price}</p>
      <div className="flex items-start hidden sm:block">
        <input
          type="number"
          min="1"
          className="border rounded w-20 text-center mr-2"
          value={cartQuantity}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="flex hidden sm:block">
        <p>{(product.price * cartQuantity).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItem;
