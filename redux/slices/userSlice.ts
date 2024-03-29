import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { dispatch }) => {
    const response = await axios.get(
      "https://ecommercebackend-production-40c6.up.railway.app/api/v1/auth/logout",
      { withCredentials: true }
    );

    // Check if the logout was successful
    if (response.status === 200 && response.data.status === "success") {
      dispatch(clearUser()); // logout was successful, clear the user
    } else {
      throw new Error("Logout failed"); // logout failed, throw an error
    }
  }
);

type UserProps = {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  address?: string;
  phoneNumber?: string;
};

const initialState: UserProps = {
  _id: "",
  name: "",
  email: "",
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;
      state._id = user._id;
      state.name = user.name;
      state.email = user.email;
      state.role = user.role;
      state.avatar = user.avatar;
      state.address = user.address;
      state.phoneNumber = user.phoneNumber;
    },
    clearUser: (state) => {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
