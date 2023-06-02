import { useDispatch, useSelector } from "react-redux";
import { GameProps } from "components/shared/Types/Types";
import { addToCart } from "../../redux/slices/cartSlice";
import { AppDispatch } from "redux/store";

export function useAddToCart() {
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: any) => state.user);

  return (product: GameProps) => {
    if (userData) {
      dispatch(addToCart(product));
    } else {
      if (typeof window !== "undefined") {
        const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
        const itemIndex = currentCart.findIndex(
          (item: GameProps) => item._id === product._id
        );

        if (itemIndex !== -1) {
          // If item already exists in the cart, increment the quantity
          currentCart[itemIndex].quantity += 1;
        } else {
          // If item doesn't exist in the cart, add it with quantity 1
          currentCart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(currentCart));
      }
    }
  };
}
