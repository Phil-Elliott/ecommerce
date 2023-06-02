import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { GameProps } from "components/shared/Types/Types";
import axios from "axios";

const fetchWishList = createAsyncThunk("wishList/fetchWishList", async () => {
  const { data } = await axios.get("http://localhost:3000/api/v1/wishList", {
    withCredentials: true,
  });
  return data.data.wishListItems[0].items;
});

const addToList = createAsyncThunk(
  "wishList/addToList",
  async (product: GameProps) => {
    const { data } = await axios.post(
      `http://localhost:3000/api/v1/wishlist/add`,
      { gameId: product._id },
      {
        withCredentials: true,
      }
    );
    return product;
  }
);

const removeFromList = createAsyncThunk(
  "wishList/removeFromList",
  async (id: string) => {
    const { data } = await axios.delete(
      `http://localhost:3000/api/v1/wishlist/remove/${id}`,
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
        console.log(action.payload);
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

// import { GameProps } from "components/shared/Types/Types";

// type WishItem = GameProps;

// const initialState: WishItem[] = [];

// const wishListSlice = createSlice({
//   name: "wishList",
//   initialState,
//   reducers: {
//     addToList: (state, action: PayloadAction<GameProps>) => {
//       const item = state.find((item) => item.id === action.payload.id);
//       if (item) {
//         return;
//       } else {
//         state.push({ ...action.payload });
//       }
//     },
//     removeFromList: (state, action: PayloadAction<number>) => {
//       const index = state.findIndex((item) => item.id === action.payload);
//       if (index !== -1) {
//         const item = state[index];
//         state.splice(index, 1);
//       }
//     },
//   },
// });

// export const { addToList, removeFromList } = wishListSlice.actions;

// export default wishListSlice.reducer;
