const Todo = require('../models/Todo');

const createTodo = async (req, res) => {
    const { content } = req.body;
    const userId = req.user.id;

    try {
        const newTodo = new Todo({
            content,
            user: userId
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getTodos = async (req, res) => {
    const userId = req.user.id;

    try {
        const todos = await Todo.find({ user: userId });
        res.json(todos);
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    try {
        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: id, user: userId },
            { content },
            { new: true }
        );
        if (!updatedTodo) return res.status(404).json({ message: "Todo not found" });
        res.json(updatedTodo);
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteTodo = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: userId });
        if (!deletedTodo) return res.status(404).json({ message: "Todo not found" });
        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
};
