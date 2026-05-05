import { Request, Response } from "express";
import Todo from "../models/todoModel.js";

const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (e) {
    res.status(500).json({ message: "Error fetching todos" });
  }
};

const postTodos = async (req: Request, res: Response) => {
  try {
    const { task, completed } = req.body;
    const todo = new Todo({ task, completed });
    await todo.save();
    // 201 status code use for the when something "Created"
    res.status(201).json(todo);
  } catch (e) {
    res.status(400).json({ message: "Error saving todo" });
  }
};

const deleteTodos = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Todo.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted" });
  } catch (e) {
    res.status(400).json({ message: "Invalid ID format" });
  }
};

const updateTodos = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { task, completed } = req.body;

    // { new: true } is the common way to get the updated doc back
    const todo = await Todo.findByIdAndUpdate(
      id,
      { task, completed },
      { new: true, runValidators: true },
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
  } catch (e) {
    res.status(400).json({ message: "Update failed" });
  }
};

const clearTodos = async (req: Request, res: Response) => {
  try {
    await Todo.deleteMany({ completed: true });
    res.json({ message: "All completed todos cleared" });
  } catch (e) {
    res.status(500).json({ message: "Error clearing todos" });
  }
};

export default {
  getTodos,
  postTodos,
  deleteTodos,
  updateTodos,
  clearTodos,
};
