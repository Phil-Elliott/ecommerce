import { useDispatch, useSelector } from "react-redux";
import { GameProps } from "components/shared/Types/Types";
import {
  addToList,
  addToListLocal,
  removeFromList,
} from "../../redux/slices/wishListSlice";
import { AppDispatch } from "redux/store";

type AddToWishListHandler = (product: GameProps) => void;

export function useAddToWishList(): AddToWishListHandler {
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: any) => state.user);

  return (product: GameProps) => {
    if (userData.email) {
      dispatch(addToList(product));
    } else {
      if (typeof window !== "undefined") {
        dispatch(addToListLocal(product));
        const currentWishList = JSON.parse(
          localStorage.getItem("wishList") || "[]"
        );
        const itemIndex = currentWishList.findIndex(
          (item: GameProps) => item._id === product._id
        );

        if (itemIndex === -1) {
          // If item doesn't exist in the wishlist, add it
          currentWishList.push(product);
        }

        localStorage.setItem("wishList", JSON.stringify(currentWishList));
      }
    }
  };
}

// import { useDispatch } from "react-redux";
// import { GameProps } from "components/shared/Types/Types";
// import { addToList } from "../../redux/slices/wishListSlice";

// export function useAddToWishList() {
//   const dispatch = useDispatch();

//   return (product: GameProps) => {
//     dispatch(addToList(product));

//     if (typeof window !== "undefined") {
//       const currentWishList = JSON.parse(
//         localStorage.getItem("wishList") || "[]"
//       );
//       currentWishList.push(product);
//       localStorage.setItem("wishList", JSON.stringify(currentWishList));
//     }
//   };
// }
