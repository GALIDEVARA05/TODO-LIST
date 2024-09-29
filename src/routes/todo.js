const express = require("express");
const { createTodo, getTodos, updateTodo, deleteTodo } = require("../controllers/todo");
const router = express.Router();
const authenticate = require("../middleware/auth");

router.post("/todos", authenticate, createTodo);
router.get("/todos", authenticate, getTodos);
router.put("/todos/:id", authenticate, updateTodo);
router.delete("/todos/:id", authenticate, deleteTodo);

module.exports = router;
