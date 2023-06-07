import React, { useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { Ratings } from "components/shared/Ratings/Ratings";
import { CldImage } from "next-cloudinary";
import { useRemoveFromCart } from "utils/useRemoveFromCart/useRemoveFromCart";
import { useAddToWishList } from "utils/useAddToWishList/useAddToWishList";

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const removeFromCart = useRemoveFromCart();
  const addToList = useAddToWishList();

  return (
    <div className="container mx-auto grid grid-cols-3 gap-5 items-start min-h-screen pb-10 pt-28 bg-gray-100">
      <div className="bg-white w-full col-span-2 rounded">
        <h1 className="text-3xl mb-0 p-4">Your Shopping Cart</h1>
        <div className="grid grid-cols-5 gap-4 items-center w-full p-4 border-b-2 border-gray-200">
          <p className="col-span-2">Item</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
        </div>
        <div>
          {cart.length > 0 ? (
            cart.map((product) => (
              <div
                key={product._id}
                className="grid grid-cols-5 gap-4  w-full p-4 bg-white rounded border-b-2 border-gray-200"
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
                      <div className="flex space-x-2 items-center text-sm">
                        <Ratings rating={product.rating} />
                        <p>{product.rating}</p>
                        <p className="text-gray-500">(12)</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-red-500 transition duration-300">
                      <AiOutlineHeart
                        className="text-red-500"
                        onClick={() => addToList(product)}
                      />
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
                <p className="text-sm text-gray-600">${product.price}</p>
                <div className="flex items-start">
                  <input
                    type="number"
                    min="1"
                    className="border rounded w-20 text-center mr-2"
                    value={product.quantity}
                    onChange={(e) => console.log("changed")}
                  />
                </div>
                <div className="flex ">
                  <p>{(product.price * product.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="p-20 text-center">Your cart is empty</p>
          )}
        </div>
      </div>
      <div className="bg-white w-full rounded">
        <h1 className="text-xl mb-0 border-b-2 border-gray-200 p-4">
          Order Summary
        </h1>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <p>Subtotal</p>
            <p>${cart.reduce((acc, curr) => acc + curr.price, 0)}</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p>Shipping</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between items-center pb-4 mb-4 border-b-2 border-gray-200">
            <p>Tax</p>
            <p>${cart.reduce((acc, curr) => acc + curr.price, 0) * 0.1}</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p>Total</p>
            <p> ${cart.reduce((acc, curr) => acc + curr.price, 0) * 1.1}</p>
          </div>
          <button className="w-full bg-black text-white py-2 rounded">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

/*

<h1 className="text-4xl mb-5">Shopping Cart</h1>
      <div className="w-full flex flex-col items-center pt-10">
        {cart.length > 0 ? (
          cart.map((product) => (
            <div
              key={product._id}
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
                <input
                  type="number"
                  min="1"
                  className="border rounded w-20 text-center mr-2"
                  value={product.quantity}
                  onChange={(e) => console.log("changed")}
                />
                <BsTrash
                  className="text-xl cursor-pointer text-red-500"
                  onClick={() => removeFromCart(product._id)}
                />
              </div>
              <div className="flex items-center">
                <p>Total: ${(product.price * product.quantity).toFixed(2)}</p>
                <AiOutlineHeart
                  className="ml-4 text-xl cursor-pointer text-red-500"
                  onClick={() => addToList(product)}
                />
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>

cart not updating when adding items to server (server working tho)

Product List: This is a list or grid display of all the products in the cart. Each item in the list might display the product name, image, price, and quantity.

Quantity Selector: For each item in the cart, you should allow the user to adjust the quantity. This can be a simple input field or a pair of buttons to increase or decrease the quantity.

Remove from Cart Button: You can include a button to remove an item from the cart.

Total Price Calculation: Display the total price of all the items in the cart. Remember to update this whenever an item is added, removed, or when the quantity is changed.

Proceed to Checkout Button: This is a button that allows the user to proceed to the checkout process. This button can be disabled if the cart is empty.

Continue Shopping Button: A button to navigate the user back to the shopping page.


*/
