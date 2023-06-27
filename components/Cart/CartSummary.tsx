import React from "react";
import { GameProps } from "components/shared/Types/Types";

type CartSummaryProps = {
  cart: GameProps[];
};

const CartSummary = ({ cart }: CartSummaryProps) => {
  return (
    <div className="bg-white w-full rounded mt-4 xl:mt-0">
      <h1 className="text-xl mb-0 border-b-2 border-gray-200 p-4">
        Order Summary
      </h1>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <p>Subtotal</p>
          <p>
            $
            {cart
              .reduce((acc, curr) => acc + curr.price * (curr.quantity ?? 0), 0)
              .toFixed(2)}
          </p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center pb-4 mb-4 border-b-2 border-gray-200">
          <p>Tax</p>
          <p>
            $
            {(cart.reduce((acc, curr) => acc + curr.price, 0) * 0.1).toFixed(2)}
          </p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <p>Total</p>
          <p>
            {" "}
            $
            {(
              cart.reduce(
                (acc, curr) => acc + curr.price * (curr.quantity ?? 0),
                0
              ) * 1.1
            ).toFixed(2)}
          </p>
        </div>
        <button className="w-full bg-black text-white py-2 rounded">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
