import { useDispatch } from "react-redux";
import { GameProps } from "components/shared/Types/Types";
import { removeFromCart } from "redux/slices/cartSlice";

export function useRemoveFromCart() {
  const dispatch = useDispatch();

  return (product: GameProps) => {
    dispatch(removeFromCart(product.id));

    if (typeof window !== "undefined") {
      let currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
      currentCart = currentCart.filter(
        (item: GameProps) => item.id !== product.id
      );
      localStorage.setItem("cart", JSON.stringify(currentCart));
    }
  };
}
