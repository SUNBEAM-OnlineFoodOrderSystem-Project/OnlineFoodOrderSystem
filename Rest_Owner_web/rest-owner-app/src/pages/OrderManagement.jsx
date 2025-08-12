import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";



import {
  fetchAvailability,
  toggleAvailability,
} from "../features/redux/restaurantSlice";
import { fetchOrders, updateOrderStatus } from "../features/redux/orderSlice";

const STATUS_TABS = [
  { label: "Incoming", value: "placed" },
  { label: "Preparing", value: "preparing" },
  { label: "Prepared", value: "prepared" },
];

export default function OrderManagement() {
  const dispatch = useDispatch();
  const { items: orders, loading, error } = useSelector(
    (state) => state.orders
  );
  const { isOpen, loading: availabilityLoading } = useSelector(
    (state) => state.restaurantAvailability
  );

  const [selectedStatus, setSelectedStatus] = useState("placed");

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchAvailability());
  }, [dispatch]);

  const filteredOrders = orders.filter(
    (order) => order.status === selectedStatus
  );

  const handleAcceptReject = (orderId, accept) => {
    // accept: true to accept, false to reject
    const newStatus = accept ? "accepted" : "rejected";
    dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
  };

  const handleToggleAvailability = () => {
    dispatch(toggleAvailability(!isOpen));
  };

  return (
    <div className="order-management-container">
      <header className="header">
        <h2>Order Management</h2>
        <div className="availability">
          <span>
            Restaurant is currently:{" "}
            <strong className={isOpen ? "open" : "closed"}>
              {isOpen ? "Open" : "Closed"}
            </strong>
          </span>
          <button
            className="btn-toggle"
            onClick={handleToggleAvailability}
            disabled={availabilityLoading}
          >
            {isOpen ? "Close Restaurant" : "Open Restaurant"}
          </button>
        </div>
      </header>

      <nav className="status-tabs">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            className={`tab-button ${
              selectedStatus === tab.value ? "active" : ""
            }`}
            onClick={() => setSelectedStatus(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <section className="orders-table-section">
        {loading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p className="error">Error: {error}</p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Total Amount</th>
                <th>Discount</th>
                <th>Delivery Charges</th>
                <th>Tax</th>
                <th>Net Amount</th>
                <th>Payment Mode</th>
                <th>Payment Status</th>
                <th>Order Status</th>
                <th>Accepted / Rejected</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="12" style={{ textAlign: "center" }}>
                    No orders with status "{selectedStatus}"
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.user_id}</td>
                    <td>{order.total_amount}</td>
                    <td>{order.discount_amount || 0}</td>
                    <td>{order.delivery_charges}</td>
                    <td>{order.tax_amount}</td>
                    <td>{order.net_amount}</td>
                    <td>{order.payment_mode}</td>
                    <td>{order.payment_status}</td>
                    <td>{order.status}</td>
                    <td>
                      {order.accepted === true
                        ? "Accepted"
                        : order.accepted === false
                        ? "Rejected"
                        : "Pending"}
                    </td>
                    <td>
                      <button
                        className="btn-accept"
                        disabled={order.accepted === true}
                        onClick={() => handleAcceptReject(order.id, true)}
                      >
                        Accept
                      </button>
                      <button
                        className="btn-reject"
                        disabled={order.accepted === false}
                        onClick={() => handleAcceptReject(order.id, false)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </section>

      <style>{`
        .order-management-container {
          max-width: 1000px;
          margin: auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        .header {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          align-items: center;
          margin-bottom: 20px;
        }
        .availability {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .availability strong.open {
          color: green;
        }
        .availability strong.closed {
          color: red;
        }
        .btn-toggle {
          padding: 8px 12px;
          border: none;
          background-color: #007bff;
          color: white;
          cursor: pointer;
          border-radius: 4px;
          transition: background-color 0.3s ease;
        }
        .btn-toggle:disabled {
          background-color: #999;
          cursor: not-allowed;
        }
        .btn-toggle:hover:not(:disabled) {
          background-color: #0056b3;
        }
        .status-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .tab-button {
          padding: 10px 16px;
          border: none;
          background-color: #eee;
          cursor: pointer;
          border-radius: 4px;
          transition: background-color 0.3s ease;
        }
        .tab-button.active {
          background-color: #007bff;
          color: white;
        }
        .tab-button:hover:not(.active) {
          background-color: #ccc;
        }
        .orders-table-section {
          overflow-x: auto;
        }
        .orders-table {
          width: 100%;
          border-collapse: collapse;
        }
        .orders-table th,
        .orders-table td {
          padding: 8px 12px;
          border: 1px solid #ddd;
          text-align: center;
        }
        .btn-accept {
          background-color: #28a745;
          border: none;
          color: white;
          padding: 6px 10px;
          margin-right: 5px;
          border-radius: 4px;
          cursor: pointer;
        }
        .btn-accept:disabled {
          background-color: #94d3a2;
          cursor: not-allowed;
        }
        .btn-reject {
          background-color: #dc3545;
          border: none;
          color: white;
          padding: 6px 10px;
          border-radius: 4px;
          cursor: pointer;
        }
        .btn-reject:disabled {
          background-color: #e6a1a8;
          cursor: not-allowed;
        }
        .error {
          color: red;
          font-weight: bold;
          text-align: center;
        }
        @media (max-width: 700px) {
          .header {
            flex-direction: column;
            gap: 10px;
          }
          .orders-table th,
          .orders-table td {
            font-size: 12px;
            padding: 6px 8px;
          }
          .btn-accept,
          .btn-reject,
          .btn-toggle {
            padding: 5px 8px;
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}
