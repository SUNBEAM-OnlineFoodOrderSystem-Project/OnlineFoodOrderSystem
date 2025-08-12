
// src/redux/menuSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const API_URL = "http://localhost:8081/api/restaurant/menu";

// Fetch all menus
export const fetchMenus = createAsyncThunk("menus/fetchMenus", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

// Add menu
export const addMenu = createAsyncThunk("menus/addMenu", async (menuData) => {
  const res = await axios.post(API_URL, menuData);
  return res.data;
});

// Delete menu
export const deleteMenu = createAsyncThunk("menus/deleteMenu", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const menuSlice = createSlice({
  name: "menus",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMenus.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addMenu.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteMenu.fulfilled, (state, action) => {
        state.items = state.items.filter((menu) => menu.id !== action.payload);
      });
  },
});

export default menuSlice.reducer;

