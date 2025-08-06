const db = require('../config/db');

exports.addToCart = async ({ user_id, menu_id, quantity }) => {
  const result = await db.query(
    `INSERT INTO carts (user_id, menu_id, quantity) VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`,
    [user_id, menu_id, quantity]
  );
  return result.insertId;
};

exports.getCartByUser = async (user_id) => {
  const rows = await db.query(
    `SELECT c.id AS cart_id, c.quantity, m.item_name, m.price, (c.quantity * m.price) AS total_price
     FROM carts c
     JOIN menus m ON c.menu_id = m.id
     WHERE c.user_id = ?`,
    [user_id]
  );
  return rows;
};

exports.removeFromCart = async (cart_id) => {
  const result = await db.query(`DELETE FROM carts WHERE id = ?`, [cart_id]);
  return result.affectedRows;
};
