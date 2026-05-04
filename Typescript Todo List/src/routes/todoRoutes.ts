import express from "express";
const todoRouter = express.Router();
import todoController from "../controllers/todoController.js";

todoRouter.get("/api/todos", todoController.getTodos);
todoRouter.post("/api/todos", todoController.postTodos);
// below route should be above the "/api/todos/:id" because if it is below Express might think the word "clear" is actually an :id and try to find a Todo with the ID of "clear", which would cause a database error.
todoRouter.delete("/api/todos/clear", todoController.clearTodos);
todoRouter.delete("/api/todos/:id", todoController.deleteTodos);
todoRouter.put("/api/todos/:id", todoController.updateTodos);

export default todoRouter;
