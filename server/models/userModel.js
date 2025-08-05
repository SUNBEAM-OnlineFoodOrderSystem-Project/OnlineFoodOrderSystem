const db = require('../config/db');

exports.getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

exports.createUser = (userData) => {
  const { full_name, email, phone_number, password, role_id } = userData;
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users (full_name, email, phone_number, password, role_id) VALUES (?, ?, ?, ?, ?)",
      [full_name, email, phone_number, password, role_id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId);
      }
    );
  });
};
