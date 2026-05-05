import express from "express";
import postsController from "../controllers/postsController.js";
import protect from "../middlewares/authMiddleware.js";

const postsRouter = express.Router();

postsRouter.get("/", postsController.getAllPosts);
postsRouter.get("/mine", protect, postsController.getMyPosts);
postsRouter.post("/", protect, postsController.createPost);
postsRouter.put("/:postId", protect, postsController.updatePost);
postsRouter.delete("/:postId", protect, postsController.deletePost);

export default postsRouter;
