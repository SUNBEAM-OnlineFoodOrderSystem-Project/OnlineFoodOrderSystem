const db = require('../../config/db');

exports.getUserByEmail = async (email) => {
  const rows = await db.query(`SELECT * FROM users WHERE email = ? AND role_id = 3`, [email]);
  return rows[0];
};

exports.registerUser = async ({ full_name, email, phone_number, password }) => {
  const result = await db.query(
    `INSERT INTO users (full_name, email, phone_number, password, role_id) VALUES (?, ?, ?, ?, 3)`,
    [full_name, email, phone_number, password]
  );
  return result.insertId;
};
