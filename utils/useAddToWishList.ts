import { useDispatch } from "react-redux";
import { GameProps } from "components/shared/Types/Types";
import { addToList } from "redux/slices/wishListSlice";

export function useAddToWishList() {
  const dispatch = useDispatch();

  return (product: GameProps) => {
    dispatch(addToList(product));

    if (typeof window !== "undefined") {
      const currentWishList = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );
      currentWishList.push(product);
      localStorage.setItem("wishlist", JSON.stringify(currentWishList));
    }
  };
}