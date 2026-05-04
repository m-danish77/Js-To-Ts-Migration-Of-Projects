// External Modules
import express from "express";

// Local Modules
const connectDB = require("./utils/db");
const todoRouter = require("./routes/todoRoutes");
const errorController = require("./controllers/error");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(todoRouter);
app.use(errorController);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running at address http://localhost:${PORT}`);
  });
};

startServer();
