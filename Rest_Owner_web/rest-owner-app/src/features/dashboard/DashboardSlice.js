
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch dashboard stats from backend
export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchStats",
  async () => {
    const res = await fetch("http://localhost:8081/api/restaurant/dashboard");
    return res.json();
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    stats: {
   totalOrders: 0,
   totalRevenue: 0,
    pendingOrders: 0,
    
    },
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default dashboardSlice.reducer;
