import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const gameModes = ["Single Player", "Multiplayer"];
const prices = [
  "$0 - $50",
  "$50 - $100",
  "$100 - $150",
  "$150 - $200",
  "Over $200",
];

export const fetchFilterOptionsData = createAsyncThunk(
  "filterOptions/fetchData",
  async (_, { dispatch }) => {
    dispatch(fetchDataStart());
    try {
      const response = await axios.get(
        `http://localhost:4242/api/v1/games/filterOptions`
      );
      const data = await response.data.data;

      dispatch(
        fetchDataSuccess([
          { name: "Category", options: data.categories || [], show: true },
          { name: "Publisher", options: data.publishers || [], show: true },
          { name: "Game Modes", options: gameModes, show: true },
          { name: "Platform", options: data.platforms || [], show: true },
          { name: "Prices", options: prices, show: true },
        ])
      );
    } catch (error: any) {
      dispatch(fetchDataFailure(error.toString()));
    }
  }
);

const initialState = {
  data: [
    { name: "Category", options: [], show: true },
    { name: "Publisher", options: [], show: true },
    { name: "Game Modes", options: gameModes, show: true },
    { name: "Platform", options: [], show: true },
    { name: "Prices", options: prices, show: true },
  ],
  loading: false,
  error: null,
};

const filterOptionsSlice = createSlice({
  name: "filterOptions",
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
  filterOptionsSlice.actions;

export default filterOptionsSlice.reducer;
