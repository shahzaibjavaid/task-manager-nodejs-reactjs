const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');

const { getConnection } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { authenticateJWT } = require("./middlewares/authMiddleware");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", authenticateJWT, taskRoutes);

const startServer = async () => {
    try {
        await getConnection();
        console.log("Database connection established");
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();