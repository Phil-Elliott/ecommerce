import { useDispatch, useSelector } from "react-redux";
import { GameProps } from "components/shared/Types/Types";
import {
  removeFromList,
  removeFromListLocal,
} from "../../redux/slices/wishListSlice";
import { AppDispatch } from "redux/store";

export function useRemoveFromWishList() {
  const userData = useSelector((state: any) => state.user);

  const dispatch: AppDispatch = useDispatch();

  return (id: string) => {
    if (userData.email) {
      dispatch(removeFromList(id));
    } else {
      if (typeof window !== "undefined") {
        dispatch(removeFromListLocal(id));

        let currentWishList = JSON.parse(
          localStorage.getItem("wishList") || "[]"
        );
        currentWishList = currentWishList.filter(
          (item: GameProps) => item._id !== id
        );
        localStorage.setItem("wishList", JSON.stringify(currentWishList));
      }
    }
  };
}

// import { useDispatch } from "react-redux";
// import { GameProps } from "components/shared/Types/Types";
// import { removeFromList } from "../../redux/slices/wishListSlice";

// export function useRemoveFromWishList() {
//   const dispatch = useDispatch();

//   return (id: number) => {
//     dispatch(removeFromList(id));

//     if (typeof window !== "undefined") {
//       let currentWishList = JSON.parse(
//         localStorage.getItem("wishList") || "[]"
//       );
//       console.log("before", currentWishList);
//       console.log(id);

//       currentWishList = currentWishList.filter(
//         (item: GameProps) => item.id !== id
//       );
//       console.log("after", currentWishList);

//       localStorage.setItem("wishList", JSON.stringify(currentWishList));
//     }
//   };
// }
