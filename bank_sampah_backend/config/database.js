const mysql = require('mysql2');
require('dotenv').config();

// Membuat pool koneksi untuk performa yang lebih baik
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: process.env.DB_CONNECTION_LIMIT, // Jumlah koneksi maksimum
    queueLimit: 0
});

// Mengkonversi pool.promise() agar kita bisa menggunakan async/await
const promisePool = pool.promise();

// Coba koneksi untuk memastikan database terhubung
promisePool.getConnection()
    .then(connection => {
        console.log('✅ Successfully connected with MySQL');
        connection.release(); // Lepaskan koneksi setelah cek
    })
    .catch(err => {
        console.error('❌ Failed connect to Database:', err.message);
    });

module.exports = promisePool;