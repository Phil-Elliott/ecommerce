import { useDispatch } from "react-redux";
import { GameProps } from "components/shared/Types/Types";
import { removeFromList } from "redux/slices/wishListSlice";

export function useRemoveFromWishList() {
  const dispatch = useDispatch();

  return (product: GameProps) => {
    dispatch(removeFromList(product.id));

    if (typeof window !== "undefined") {
      let currentWishList = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );
      currentWishList = currentWishList.filter(
        (item: GameProps) => item.id !== product.id
      );
      localStorage.setItem("wishlist", JSON.stringify(currentWishList));
    }
  };
}
