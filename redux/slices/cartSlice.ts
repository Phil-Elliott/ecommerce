import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameProps } from "components/shared/Types/Types";

type CartItem = GameProps & { quantity: number };

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<GameProps>) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else if (action.payload.quantity) {
        state.push({ ...action.payload, quantity: action.payload.quantity });
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        // const item = state[index];
        // item.quantity -= 1;
        // if (item.quantity <= 0) {
        state.splice(index, 1);
        // }
      }
    },
    changeQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, changeQuantity } = cartSlice.actions;

export default cartSlice.reducer;
