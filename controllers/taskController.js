const { getConnection } = require("../config/db");

exports.addTask = async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: "Title and description are required" });
    }

    try {
        const connection = await getConnection();
        await connection.execute(
            "INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)",
            [req.user.id, title, description]
        );
        res.status(201).json({ message: "Task added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const connection = await getConnection();
        const [results] = await connection.execute("SELECT * FROM tasks WHERE user_id = ?", [req.user.id]);

        if (results.length === 0) {
            return res.status(404).json({ error: "No tasks found for this user" });
        }
        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateTask = async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: "Title and description are required" });
    }

    try {
        const connection = await getConnection();
        const [results] = await connection.execute(
            "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
            [req.params.id, req.user.id]
        );

        if (results.length === 0) {
            return res.status(404).json({ error: "Task not found" });
        }

        await connection.execute(
            "UPDATE tasks SET title = ?, description = ? WHERE id = ? AND user_id = ?",
            [title, description, req.params.id, req.user.id]
        );

        res.status(200).json({ message: "Task updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const connection = await getConnection();
        const [results] = await connection.execute(
            "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
            [req.params.id, req.user.id]
        );

        if (results.length === 0) {
            return res.status(404).json({ error: "Task not found" });
        }

        await connection.execute("DELETE FROM tasks WHERE id = ? AND user_id = ?", [req.params.id, req.user.id]);

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};
