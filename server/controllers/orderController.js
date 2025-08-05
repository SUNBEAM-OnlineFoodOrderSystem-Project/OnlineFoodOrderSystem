const db = require('../config/db');

exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { restaurant_id, items, total_amount } = req.body;

    if (!restaurant_id || !items || !total_amount || !Array.isArray(items)) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    // 1. Insert into orders
    const orderResult = await db.query(
      `INSERT INTO orders (user_id, restaurant_id, total_amount) VALUES (?, ?, ?)`,
      [userId, restaurant_id, total_amount]
    );
    const orderId = orderResult.insertId;

    // 2. Insert each item into order_items
    for (const item of items) {
      const { menu_id, quantity } = item;

      // Get item price and name from menus table
      const menuData = await db.query(`SELECT price, item_name FROM menus WHERE id = ?`, [menu_id]);
      if (menuData.length === 0) {
        return res.status(400).json({ message: `Menu item with ID ${menu_id} not found` });
      }

      const price = menuData[0].price;
      const product_name = menuData[0].item_name;
      const total = price * quantity;

      await db.query(
        `INSERT INTO order_items (order_id, menu_id, price, quantity, total_amount, product_name)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [orderId, menu_id, price, quantity, total, product_name]
      );
    }

    res.status(201).json({
      message: 'Order placed successfully',
      order_id: orderId,
    });

  } catch (error) {
    console.error('Place Order Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
