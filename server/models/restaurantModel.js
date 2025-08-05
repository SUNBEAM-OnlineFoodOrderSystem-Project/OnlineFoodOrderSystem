const db = require('../config/db');

exports.getAllRestaurants = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT id, name, address, locality, rating FROM restaurants", (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};










// Get nearby restaurants based on latitude, longitude, and radius
// This function retrieves restaurants within a specified radius from the given coordinates

exports.getNearbyRestaurants = (latitude, longitude, radius = 5, callback) => {
  console.log('Fetching restaurants with lat/lng:', latitude, longitude);
  const sql = `
    SELECT r.*
    FROM restaurants r
    WHERE r.status = 'active'
      AND r.is_accepting_orders = 1
      AND ST_Distance_Sphere(
            point(r.longitude, r.latitude),
            point(?, ?)
          ) <= ? * 1000
  `;

  db.query(sql, [longitude, latitude, radius], (err, results) => {
    if (err) {
      console.error('❌ SQL Error:', err);
      return callback(err);
    }

    // console.log('Query results:', results);
    callback(null, results);
  });
};