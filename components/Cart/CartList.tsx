import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const CartList = () => {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <div>
      {cart.map((product) => (
        <div key={product._id}>
          <p>{product.name}</p>
          <p>{product.price}</p>
          <p>{product.quantity}</p>
        </div>
      ))}
    </div>
  );
};

export default CartList;