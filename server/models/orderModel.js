const db = require('../config/db');

// Get all orders with items for a specific user
exports.getOrdersByUserId = async (userId) => {
  const orders = await db.query(
    `SELECT o.id AS order_id, o.restaurant_id, r.name AS restaurant_name, o.total_amount, o.created_at
     FROM orders o
     JOIN restaurants r ON o.restaurant_id = r.id
     WHERE o.user_id = ?
     ORDER BY o.created_at DESC`,
    [userId]
  );

  // For each order, fetch order items
  for (const order of orders) {
    const items = await db.query(
      `SELECT menu_id, product_name, price, quantity, total_amount
       FROM order_items WHERE order_id = ?`,
      [order.order_id]
    );
    order.items = items;
  }

  return orders;
};



// Check if the order exists and belongs to the user
exports.getOrderByIdAndUser = async (orderId, userId) => {
  const [order] = await db.query(
    `SELECT * FROM orders WHERE id = ? AND user_id = ?`,
    [orderId, userId]
  );
  return order;
};

// Cancel an order
exports.cancelOrder = async (orderId) => {
  await db.query(
    `UPDATE orders SET status = 'cancelled' WHERE id = ?`,
    [orderId]
  );
};

