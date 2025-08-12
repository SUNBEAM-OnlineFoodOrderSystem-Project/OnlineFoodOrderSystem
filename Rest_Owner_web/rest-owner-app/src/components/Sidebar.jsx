
import React from "react";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-5">
      <h2 className="text-xl font-bold mb-6">Restaurant Owner</h2>
      <ul>
        <li className="mb-4 hover:text-yellow-400 cursor-pointer">Dashboard</li>
        <li className="mb-4 hover:text-yellow-400 cursor-pointer">Orders</li>
        <li className="mb-4 hover:text-yellow-400 cursor-pointer">Menu</li>
        <li className="mb-4 hover:text-yellow-400 cursor-pointer">Profile</li>
      </ul>
    </div>
  );
}

