import { useDispatch } from "react-redux";
import { GameProps } from "components/shared/Types/Types";
import { removeFromList } from "../../redux/slices/wishListSlice";

export function useRemoveFromWishList() {
  const dispatch = useDispatch();

  return (id: number) => {
    dispatch(removeFromList(id));

    if (typeof window !== "undefined") {
      let currentWishList = JSON.parse(
        localStorage.getItem("wishList") || "[]"
      );
      console.log("before", currentWishList);
      console.log(id);

      currentWishList = currentWishList.filter(
        (item: GameProps) => item.id !== id
      );
      console.log("after", currentWishList);

      localStorage.setItem("wishList", JSON.stringify(currentWishList));
    }
  };
}
