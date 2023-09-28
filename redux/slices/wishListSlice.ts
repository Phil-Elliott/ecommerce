import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { GameProps } from "components/shared/Types/Types";
import axios from "axios";
import { toast } from "react-toastify";

const fetchWishList = createAsyncThunk("wishList/fetchWishList", async () => {
  const { data } = await axios.get("http://localhost:4242/api/v1/wishList", {
    withCredentials: true,
  });
  return data.data.wishListItems[0].items;
});

const addToList = createAsyncThunk(
  "wishList/addToList",
  async (product: GameProps, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:4242/api/v1/wishlist/add`,
        { gameId: product._id },
        {
          withCredentials: true,
        }
      );
      toast.success("Added to wishlist");
      return product;
    } catch (error: any) {
      toast.info("Item already in wishlist");
      return rejectWithValue(error.response.data);
    }
  }
);

const removeFromList = createAsyncThunk(
  "wishList/removeFromList",
  async (id: string) => {
    const { data } = await axios.delete(
      `http://localhost:4242/api/v1/wishlist/remove/${id}`,
      {
        withCredentials: true,
      }
    );
    return id;
  }
);

type WishItem = GameProps;

const initialState: WishItem[] = [];

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToListLocal: (state, action: PayloadAction<GameProps>) => {
      const itemIndex = state.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex === -1) {
        // item does not exist in wishlist, add it
        state.push(action.payload);
        toast.success("Added to wishlist");
      } else {
        toast.info("Item already in wishlist");
      }
    },
    removeFromListLocal: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((item) => item._id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    setWishListFromLocal: (state, action: PayloadAction<WishItem[]>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishList.fulfilled, (state, action) => {
        return action.payload.map((item: any) => item.game);
      })
      .addCase(addToList.fulfilled, (state, action) => {
        const itemIndex = state.findIndex(
          (item) => item._id === action.payload._id
        );

        if (itemIndex === -1) {
          // Item does not exist in wishlist, add it
          state.push(action.payload);
        }
      })
      .addCase(removeFromList.fulfilled, (state, action) => {
        const index = state.findIndex((item) => item._id === action.payload);
        if (index !== -1) {
          state.splice(index, 1);
        }
      });
  },
});

export { addToList, removeFromList, fetchWishList };
export const { addToListLocal, setWishListFromLocal, removeFromListLocal } =
  wishListSlice.actions;
export default wishListSlice.reducer;
