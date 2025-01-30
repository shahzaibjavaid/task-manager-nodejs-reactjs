const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const createConnection = async () => {
    try {
        const pool = await mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DATABASE_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });

        // Create tables if they do not exist
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            )
        `);

        await pool.execute(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        return pool;
    } catch (err) {
        console.error("Database connection failed:", err.message);
        process.exit(1);
    }
};

// Export an async function that returns the connection pool
const connectionPromise = createConnection();

module.exports = {
    getConnection: async () => await connectionPromise,
};
