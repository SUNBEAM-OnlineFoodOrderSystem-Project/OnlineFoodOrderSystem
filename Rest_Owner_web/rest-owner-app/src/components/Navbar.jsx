import React from "react";

export default function Navbar() {
  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Dashboard</h1>
      <button className="bg-yellow-400 px-4 py-2 rounded">Logout</button>
    </div>
  );
}
