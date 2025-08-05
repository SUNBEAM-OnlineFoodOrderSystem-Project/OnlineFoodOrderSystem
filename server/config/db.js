// const mysql = require('mysql2');

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// db.connect((err) => {
//   if (err) {
//     console.error('❌ DB Connection Failed:', err);
//   } else {
//     console.log('✅ MySQL DB connected!');
//   }
// });

// module.exports = db;





const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'food_delivery_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 👇 Add this line to enable Promise support
module.exports = pool.promise();

