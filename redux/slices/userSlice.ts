import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
