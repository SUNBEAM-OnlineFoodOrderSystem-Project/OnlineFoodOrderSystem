// redux/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8081/api/orders";

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, status }) => {
    const res = await axios.put(`${API_URL}/${id}/status`, { status });
    return res.data;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.items.findIndex((o) => o.id === updated.id);
        if (index !== -1) state.items[index] = updated;
      });
  },
});

export default orderSlice.reducer;
