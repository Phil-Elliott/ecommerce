import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameProps } from "components/shared/Types/Types";

type CartItem = GameProps & { quantity: number };

const initialState: CartItem[] = JSON.parse(
  localStorage.getItem("cart") || "[]"
);

const isLoggedIn = () => {
  return localStorage.getItem("token") ? true : false;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<GameProps>) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      if (!isLoggedIn()) {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        const item = state[index];
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.splice(index, 1);
        }
      }
      if (!isLoggedIn()) {
        localStorage.setItem("cart", JSON.stringify(state));
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
      if (!isLoggedIn()) {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
  },
});

export const { addToCart, removeFromCart, changeQuantity } = cartSlice.actions;

export default cartSlice.reducer;
