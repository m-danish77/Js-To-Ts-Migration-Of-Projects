const express = require("express");
const todoRouter = express.Router();
const todoController = require("../controllers/todoController");

todoRouter.get("/api/todos", todoController.getTodos);
todoRouter.post("/api/todos", todoController.postTodos);
todoRouter.delete("/api/todos/clear", todoController.clearTodos);
todoRouter.delete("/api/todos/:id", todoController.deleteTodos);
todoRouter.put("/api/todos/:id", todoController.updateTodos);

module.exports = todoRouter;
