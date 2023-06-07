import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const CartSummary = () => {
  const cart = useSelector((state: RootState) => state.cart);

  const subtotal = cart.reduce((acc, curr) => acc + curr.price, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div>
      <p>Subtotal: ${subtotal}</p>
      <p>Tax: ${tax}</p>
      <p>Total: ${total}</p>
    </div>
  );
};

export default CartSummary;
