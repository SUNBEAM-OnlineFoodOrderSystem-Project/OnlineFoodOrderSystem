
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import menuReducer from '../features/redux/menuSlice'
import categoryReducer from '../features/redux/categorySlice';
import restaurantReducer from '../features/redux/restaurantSlice';

import dashboardReducer from '../features/dashboard/DashboardSlice';
import orderReducer from '../features/redux/orderSlice';
import { fetchDashboardStats } from '../features/dashboard/DashboardSlice';

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    auth: authReducer,
    menus: menuReducer,
    categories: categoryReducer,
   orders: orderReducer,
    restaurantAvailability: restaurantReducer,

  },
});

export default store;
