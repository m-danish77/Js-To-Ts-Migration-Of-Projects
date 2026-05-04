import express from "express";
const todoRouter = express.Router();
import todoController from "../controllers/todoController.js";

todoRouter.get("/api/todos", todoController.getTodos);
todoRouter.post("/api/todos", todoController.postTodos);
todoRouter.delete("/api/todos/clear", todoController.clearTodos);
todoRouter.delete("/api/todos/:id", todoController.deleteTodos);
todoRouter.put("/api/todos/:id", todoController.updateTodos);

export default todoRouter;
