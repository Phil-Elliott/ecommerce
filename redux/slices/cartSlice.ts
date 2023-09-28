import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { GameProps } from "components/shared/Types/Types";
import axios from "axios";
import { toast } from "react-toastify";

const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const { data } = await axios.get("http://localhost:4242/api/v1/cart", {
    withCredentials: true,
  });
  return data;
});

const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product: GameProps) => {
    const { data } = await axios.post(
      `http://localhost:4242/api/v1/cart/add`,
      { gameId: product._id },
      {
        withCredentials: true,
      }
    );
    toast.success("Added to cart");
    return product;
  }
);

const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id: string) => {
    const { data } = await axios.delete(
      `http://localhost:4242/api/v1/cart/remove/${id}`,
      {
        withCredentials: true,
      }
    );
    return id;
  }
);

const changeQuantity = createAsyncThunk(
  "cart/changeQuantity",
  async ({ id, quantity }: { id: string; quantity: number }) => {
    const { data } = await axios.patch(
      `http://localhost:4242/api/v1/cart`,
      {
        gameId: id,
        quantity,
      },
      {
        withCredentials: true,
      }
    );
    return { id, quantity };
  }
);

type CartItem = GameProps & { quantity: number };

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartLocal: (state, action: PayloadAction<GameProps>) => {
      const itemIndex = state.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex !== -1) {
        // item exists in cart already, increase quantity
        state[itemIndex].quantity += 1;
      } else {
        // item does not exist in cart, add it
        state.push({ ...action.payload, quantity: 1 });
      }
      toast.success("Added to cart");
    },
    removeFromCartLocal: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((item) => item._id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    setCartFromLocal: (state, action: PayloadAction<CartItem[]>) => {
      return action.payload;
    },
    changeQuantityLocal: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.find((item) => item._id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
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
        const itemIndex = state.findIndex(
          (item) => item._id === action.payload._id
        );

        if (itemIndex !== -1) {
          // Item exists in cart already, increase quantity
          state[itemIndex].quantity += 1;
        } else {
          // Item does not exist in cart, add it
          state.push({ ...action.payload, quantity: 1 });
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const index = state.findIndex((item) => item._id === action.payload);
        if (index !== -1) {
          state.splice(index, 1);
        }
      })
      .addCase(changeQuantity.fulfilled, (state, action) => {
        const item = state.find((item) => item._id === action.payload.id);
        if (item) {
          item.quantity = action.payload.quantity;
        }
      });
  },
});

export { addToCart, removeFromCart, fetchCart, changeQuantity };
export const {
  addToCartLocal,
  setCartFromLocal,
  removeFromCartLocal,
  changeQuantityLocal,
} = cartSlice.actions;
export default cartSlice.reducer;
