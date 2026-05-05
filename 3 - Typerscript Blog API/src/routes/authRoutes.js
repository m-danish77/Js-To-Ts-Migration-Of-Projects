import express from "express";
import authController from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register", authController.registerFunction);
authRouter.post("/login", authController.loginFunction);

export default authRouter;
