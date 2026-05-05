import mongoose, { Document } from "mongoose";

export interface IExpense extends Document {
  title: string;
  amount: number;
  category: "Food" | "Rent" | "Transport" | "Entertainment" | "Misc";
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const expenseSchema = new mongoose.Schema<IExpense>(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
    category: {
      type: String,
      enum: {
        values: ["Food", "Rent", "Transport", "Entertainment", "Misc"],
        message: `Not a valid Category. Valid Categories are: ("Food", "Rent", "Transport", "Entertainment", "Misc")`,
      },
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const Expense =
  (mongoose.models.Expense as mongoose.Model<IExpense>) ||
  mongoose.model<IExpense>("Expense", expenseSchema);
export default Expense;
