import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameProps } from "components/shared/Types/Types";

type WishItem = GameProps;

const initialState: WishItem[] = [];

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
    },
    removeFromList: (state, action: PayloadAction<number>) => {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        const item = state[index];
        state.splice(index, 1);
      }
    },
  },
});

export const { addToList, removeFromList } = wishListSlice.actions;

export default wishListSlice.reducer;
