
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStats } from "../features/dashboard/DashboardSlice";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { stats, status } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6 grid grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-gray-500">Total Orders</h2>
            <p className="text-2xl font-bold">
              {status === "loading" ? "..." : stats.totalOrders || 0}
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-gray-500">Revenue</h2>
            <p className="text-2xl font-bold">
              ₹{status === "loading" ? "..." : stats.revenue || 0}
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-gray-500">Pending Orders</h2>
            <p className="text-2xl font-bold">
              {status === "loading" ? "..." : stats.pendingOrders || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
