const Todo = require("../models/todoModel");

const getTodos = async (req, res, next) => {
  const todos = await Todo.find();
  res.json(todos);
};

const postTodos = async (req, res, next) => {
  const { task, date, completed } = req.body;
  const todo = new Todo({ task, date, completed });
  await todo.save();
  res.json(todo);
};

const deleteTodos = async (req, res, next) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.json({ message: "Todo deleted" });
};

const updateTodos = async (req, res, next) => {
  const { id } = req.params;
  const { task, date, completed } = req.body;
  const todo = await Todo.findByIdAndUpdate(
    id,
    { task, date, completed },
    { returnDocument: "after" },
  );
  res.json(todo);
};

const clearTodos = async (req, res, next) => {
  await Todo.deleteMany({ completed: true });
  res.json({ message: "All completed todos cleared" });
};

module.exports = {
  getTodos,
  postTodos,
  deleteTodos,
  updateTodos,
  clearTodos,
};
