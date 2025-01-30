const express = require("express");
const { addTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");
const router = express.Router();

// Add a new task
router.post("/", addTask);

// Get tasks for a user
router.get("/", getTasks);

// Update a task
router.put("/:id", updateTask);

// Delete a task
router.delete("/:id", deleteTask);

module.exports = router;
