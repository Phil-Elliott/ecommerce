import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserProps = {
  id: string;
  name: string;
  email: string;
};

const initialState: UserProps = {
  id: "",
  name: "",
  email: "",
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
    },
    clearUser: (state) => {
      return initialState;
    },
  },
});
