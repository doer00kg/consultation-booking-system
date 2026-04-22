const mysql = require('mysql2/promise');

async function connectDB() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'consultation_db'
    });

    console.log("MySQL connected");
    return connection;

  } catch (error) {
    console.error("Connection error:", error);
  }
}

module.exports = connectDB;