
const db = require('../config/db');

exports.getMenuByRestaurantId = (restaurantId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        m.id, 
        m.item_name, 
        m.description, 
        mc.cat_name AS category, 
        m.price, 
        m.rating, 
        m.status
      FROM menus m
      JOIN menu_categories mc ON m.category_id = mc.id
      WHERE m.restaurant_id = ?
    `;
    db.query(query, [restaurantId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

