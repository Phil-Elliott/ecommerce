import { useDispatch, useSelector } from "react-redux";
import { GameProps } from "components/shared/Types/Types";
import {
  removeFromCart,
  removeFromCartLocal,
} from "../../redux/slices/cartSlice";
import { AppDispatch } from "redux/store";

export function useRemoveFromCart() {
  const userData = useSelector((state: any) => state.user);

  const dispatch: AppDispatch = useDispatch();

  return (id: string) => {
    if (userData.email) {
      dispatch(removeFromCart(id));
    } else {
      if (typeof window !== "undefined") {
        dispatch(removeFromCartLocal(id));
        let currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
        currentCart = currentCart.filter((item: GameProps) => item._id !== id);
        localStorage.setItem("cart", JSON.stringify(currentCart));
      }
    }
  };
}
