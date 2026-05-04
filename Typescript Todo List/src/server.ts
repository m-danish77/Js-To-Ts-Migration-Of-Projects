// External Modules
import express from "express";

// Local Modules
import connectDB from "./configs/mongoose.js";
import todoRouter from "./routes/todoRoutes.js";
import errorController from "./controllers/error.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(todoRouter);
app.use(errorController);

const startServer = async (): Promise<void> => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running at address http://localhost:${PORT}`);
  });
};

startServer();
