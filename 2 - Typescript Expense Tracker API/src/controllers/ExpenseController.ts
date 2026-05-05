import Expense from "../models/Expense.js";
import { Request, Response } from "express";

interface ExpenseFilter {
  category?: string;
  date?: {
    $gte?: Date;
    $lte?: Date;
  };
}

const createExpense = async (req: Request, res: Response) => {
  try {
    const { title, amount, category, date } = req.body;
    const createdExpense = await Expense.create({
      title,
      amount,
      category,
      date,
    });
    res.status(201).json(createdExpense);
  } catch (e: any) {
    if (e.name === "ValidationError") {
      const messages = Object.values(e.errors).map((val: any) => val.message);
      return res.status(400).json(messages);
    }
    // when if condition don't match like the database connection issue then the below code will run
    res.status(500).json({ message: e.message });
  }
};

const getAllExpense = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limitValue = Number(req.query.limitValue) || 10;

    /**
     * If a user doesn't provide a startDate in Bruno, req.query.startDate is undefined.
     In JavaScript, new Date(undefined) doesn't return null, it returns an "Invalid Date" object.

     That's why don't convert the upcoming date string into the Actual formated date instantly convert it inside if statement after checking does it exists
     */
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;
    const category = req.query.category as string;

    const queryFilter: ExpenseFilter = {};

    if (category) {
      queryFilter["category"] = category;
    }

    if (startDate || endDate) {
      queryFilter.date = {};

      if (startDate) {
        queryFilter.date.$gte = new Date(startDate);
      }

      if (endDate) {
        /**
         * When you provide a date like 2026-04-28, JavaScript and MongoDB treat it as the very beginning of that day: 2026-04-28T00:00:00.000Z.

         Your Query: "Give me everything less than or equal to ($lte) April 28th at Midnight."

         The Reality: An expense created at 2:00 PM on April 28th is technically after April 28th at Midnight.

         The Result: MongoDB excludes it because 14:00 is "greater than" 00:00.

         When you change it to the 29th, the boundary moves to April 29th at Midnight, which finally "swallows" all the expenses from the 28th. So in order to prevent this we do below thing
         */
        queryFilter.date.$lte = new Date(`${endDate}T23:59:59.999Z`);
      }
    }

    const skipFormula = (page - 1) * limitValue;

    const allExpenses = await Expense.find(queryFilter as any)
      .skip(skipFormula)
      .limit(limitValue);
    res.status(200).json(allExpenses);
  } catch (e) {
    res.status(400).json({ message: (e as Error).message });
  }
};

const getExpenseSummary = async (req: Request, res: Response) => {
  try {
    const allExpenses = await Expense.find();
    const amountArray = allExpenses.map((expense) => expense.amount);
    const totalExpensesAmount = amountArray.reduce((acc, cur) => {
      return acc + cur;
    }, 0);
    const numberOfExpenses = amountArray.length;
    res.status(200).json({
      totalExpensesAmount: totalExpensesAmount,
      numberOfExpenses: numberOfExpenses,
    });
  } catch (e) {
    res.status(400).json({ message: "Could not get Expense Summary" });
  }
};

const getSpecificExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const specificExpense = await Expense.findById(id);
    res.status(200).json(specificExpense);
  } catch (e) {
    res.status(404).json({ message: "Requested expense don't exist." });
  }
};

const updateExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, amount, category, date } = req.body;
    const updateExpense = await Expense.findByIdAndUpdate(
      id,
      {
        title,
        amount,
        category,
        date,
      },
      { returnDocument: "after", runValidators: true },
    );
    res.status(200).json(updateExpense);
  } catch (e) {
    res.status(404).json({ message: "Requested expense don't exist." });
  }
};

const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    res.status(200).json({ message: "Requested Expense Deleted" });
  } catch (e) {
    res.status(204).json({ message: "Could not delete requested expense." });
  }
};

export default {
  createExpense,
  getAllExpense,
  getExpenseSummary,
  getSpecificExpense,
  updateExpense,
  deleteExpense,
};
