import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { GameProps } from "components/shared/Types/Types";
import axios from "axios";

const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const { data } = await axios.get("http://localhost:3000/api/v1/cart", {
    withCredentials: true,
  });
  // console.log("fetched", data.data.cartItems[0].items);
  return data;
});

const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product: GameProps) => {
    const { data } = await axios.post(
      `http://localhost:3000/api/v1/cart/add`,
      { gameId: product._id },
      {
        withCredentials: true,
      }
    );
    return data;
  }
);

const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id: string) => {
    const { data } = await axios.delete(
      `http://localhost:3000/api/v1/cart/${id}`,
      {
        withCredentials: true,
      }
    );
    return data;
  }
);

type CartItem = GameProps & { quantity: number };

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartLocal: (state, action: PayloadAction<GameProps>) => {
      const item = state.find((item) => item._id === action.payload._id);
      if (item) {
        item.quantity += 1;
      } else if (action.payload.quantity) {
        state.push({ ...action.payload, quantity: action.payload.quantity });
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        // Transform each cart item to match the GameProps structure
        return action.payload.data.cartItems[0].items.map((item: any) => {
          return {
            ...item.game,
            quantity: item.quantity,
          };
        });
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        return action.payload.cart;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        return state.filter((item) => item._id !== action.payload._id);
      });
  },
});

export { addToCart, removeFromCart, fetchCart };
export const { addToCartLocal } = cartSlice.actions;
export default cartSlice.reducer;

/*

1) Retrive all cart items on login
2) Make sure item shows in cart when added to database
3) Work on other stuff


import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameProps } from "components/shared/Types/Types";

type CartItem = GameProps & { quantity: number };

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<GameProps>) => {
      const item = state.find((item) => item._id === action.payload._id);
      if (item) {
        item.quantity += 1;
      } else if (action.payload.quantity) {
        state.push({ ...action.payload, quantity: action.payload.quantity });
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((item) => item._id === action.payload);
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
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.find((item) => item._id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, changeQuantity } = cartSlice.actions;

export default cartSlice.reducer;

*/
