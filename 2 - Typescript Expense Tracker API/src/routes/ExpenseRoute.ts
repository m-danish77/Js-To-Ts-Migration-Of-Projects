// External Modules
import express from "express";

// Local Modules
import expenseController from "../controllers/ExpenseController.js";

const expenseRouter = express.Router();

expenseRouter.post("/api/expenses", expenseController.createExpense);
expenseRouter.get("/api/expenses", expenseController.getAllExpense);
expenseRouter.get("/api/expenses/summary", expenseController.getExpenseSummary);
expenseRouter.get("/api/expenses/:id", expenseController.getSpecificExpense);
expenseRouter.put("/api/expenses/:id", expenseController.updateExpense);
expenseRouter.delete("/api/expenses/:id", expenseController.deleteExpense);

export default expenseRouter;
