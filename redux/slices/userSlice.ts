import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { dispatch }) => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/auth/logout",
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
  id: string;
  name: string;
  email: string;
  role: string;
};

const initialState: UserProps = {
  id: "",
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
      state.id = user.id;
      state.name = user.name;
      state.email = user.email;
      state.role = user.role;
    },
    clearUser: (state) => {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
