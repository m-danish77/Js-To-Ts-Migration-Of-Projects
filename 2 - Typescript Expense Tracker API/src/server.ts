// External Modules
import express from "express";

// Local Modules
import connectDB from "./configs/mongoose.js";
import expenseRouter from "./routes/ExpenseRoute.js";
import errorController from "./controllers/errors.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expenseRouter);
app.use(errorController);

const PORT = process.env.PORT || 3000;
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running at address of http://localhost:${PORT}`);
  });
};
startServer();
