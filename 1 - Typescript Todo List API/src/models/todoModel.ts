import mongoose, { Document } from "mongoose";

// extends Document tells that This isn't just any object, it's a Mongoose database document, so it also has things like _id and .save()."
export interface ITodo extends Document {
  task: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema = new mongoose.Schema<ITodo>(
  {
    task: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Todo = mongoose.model<ITodo>("Todo", todoSchema);
export default Todo;
