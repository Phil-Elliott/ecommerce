import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import wishListReducer from "./slices/wishListSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    wishList: wishListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
