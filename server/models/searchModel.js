const db = require('../config/db');

// Search for restaurants or menu items based on a keyword
exports.searchRestaurantsOrMenus = (query, callback) => {
  const sql = `
    SELECT 'restaurant' AS type, r.id, r.name, r.rating, r.address, r.locality
    FROM restaurants r
    WHERE r.status = 'active' AND r.is_accepting_orders = 1 AND r.name LIKE ?

    UNION

    SELECT 'menu' AS type, m.id, m.item_name AS name, m.rating, r.address, r.locality
    FROM menus m
    JOIN restaurants r ON m.restaurant_id = r.id
    WHERE m.status = 'active' AND m.item_name LIKE ?;
  `;

  const likeQuery = `%${query}%`;

  db.query(sql, [likeQuery, likeQuery], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};
