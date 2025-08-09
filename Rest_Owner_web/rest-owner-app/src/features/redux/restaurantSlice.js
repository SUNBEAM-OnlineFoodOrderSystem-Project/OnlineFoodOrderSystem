// redux/restaurantSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8081/api/restaurant/availability";

export const fetchAvailability = createAsyncThunk(
  "restaurant/fetchAvailability",
  async () => {
    const res = await axios.get(API_URL);
    return res.data; // { isOpen: true/false }
  }
);

export const toggleAvailability = createAsyncThunk(
  "restaurant/toggleAvailability",
  async (newStatus) => {
    const res = await axios.put(API_URL, { isOpen: newStatus });
    return res.data; // updated { isOpen: true/false }
  }
);

const restaurantSlice = createSlice({
  name: "restaurantAvailability",
  initialState: { isOpen: false, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.isOpen = action.payload.isOpen;
      })
      .addCase(fetchAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(toggleAvailability.fulfilled, (state, action) => {
        state.isOpen = action.payload.isOpen;
      });
  },
});

export default restaurantSlice.reducer;
