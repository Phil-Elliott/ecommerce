import { useDispatch, useSelector } from "react-redux";
import { GameProps } from "components/shared/Types/Types";
import {
  changeQuantity,
  changeQuantityLocal,
} from "../../redux/slices/cartSlice";
import { AppDispatch } from "redux/store";

export function useChangeCartQuantity() {
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: any) => state.user);

  return ({ id, quantity }: { id: string; quantity: number }) => {
    if (userData.email) {
      dispatch(changeQuantity({ id, quantity }));
    } else {
      if (typeof window !== "undefined") {
        dispatch(changeQuantityLocal({ id, quantity }));

        const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
        const itemIndex = currentCart.findIndex(
          (item: GameProps) => item._id === id
        );

        if (itemIndex !== -1) {
          // If item already exists in the cart, increment the quantity
          currentCart[itemIndex].quantity = quantity;
        } else {
          // If item doesn't exist in the cart, add it with quantity 1
          console.log("what what");
          currentCart.push({ _id: id, quantity });
        }

        localStorage.setItem("cart", JSON.stringify(currentCart));
      }
    }
  };
}
