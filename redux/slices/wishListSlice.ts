import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameProps } from "components/shared/Types/Types";

type WishItem = GameProps;

const initialState: WishItem[] = [];

const isLoggedIn = () => {
  return localStorage.getItem("token") ? true : false;
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToList: (state, action: PayloadAction<GameProps>) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        return;
      } else {
        state.push({ ...action.payload });
      }
      if (!isLoggedIn()) {
        localStorage.setItem("wishlist", JSON.stringify(state));
      }
    },
    removeFromList: (state, action: PayloadAction<number>) => {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
      if (!isLoggedIn()) {
        localStorage.setItem("wishlist", JSON.stringify(state));
      }
    },
  },
});

export const { addToList, removeFromList } = wishListSlice.actions;

export default wishListSlice.reducer;
