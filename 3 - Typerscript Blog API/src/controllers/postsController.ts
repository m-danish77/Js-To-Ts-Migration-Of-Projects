import { Request, Response } from "express";
import { Types } from "mongoose";
import Post from "../models/Post.js";

interface RequestWithUser extends Request {
  user?: {
    userId: string;
  };
}

const getAllPosts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const allPosts = await Post.find().populate("author", "username email");
    return res.status(200).json(allPosts);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Server Error", errors: (e as Error).message });
  }
};

const getMyPosts = async (
  req: RequestWithUser,
  res: Response,
): Promise<Response> => {
  try {
    // Below syntax is called optional chaining
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const myPosts = await Post.find({ author: userId }).populate(
      "author",
      "username email",
    );
    return res.status(200).json(myPosts);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Server Error", errors: (e as Error).message });
  }
};

const createPost = async (
  req: RequestWithUser,
  res: Response,
): Promise<Response> => {
  try {
    const { title, content } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // As IPost expects author field to be ObjectId so we have to make sure we are not sending normal string it is mainly for Typescript because mongoose can handle that
    const authorId = new Types.ObjectId(req.user.userId);
    const post = await Post.create({
      title,
      content,
      author: authorId,
    });

    return res.status(201).json({ message: "Post Created", post: post });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Server Error", errors: (e as Error).message });
  }
};

const updatePost = async (
  req: RequestWithUser,
  res: Response,
): Promise<Response> => {
  try {
    const postId = req.params.postId;
    const { title, content } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // I should use post.author.toString() because author is already and id
    if (req.user?.userId === (post.author as Types.ObjectId).toString()) {
      const postUpdated = await Post.findByIdAndUpdate(
        postId,
        { title, content },
        { returnDocument: "after" },
      );
      return res
        .status(200)
        .json({ message: "Post Updated.", postUpdated: postUpdated });
    } else {
      return res
        .status(403)
        .json({ message: "You are not the owner of the post" });
    }
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Server Error", errors: (e as Error).message });
  }
};

const deletePost = async (
  req: RequestWithUser,
  res: Response,
): Promise<Response> => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (req.user?.userId === (post.author as Types.ObjectId).toString()) {
      const postDeleted = await Post.findByIdAndDelete(postId);
      return res
        .status(200)
        .json({ message: "Post Deleted.", postDeleted: postDeleted });
    } else {
      return res
        .status(403)
        .json({ message: "You are not the owner of the post" });
    }
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Server Error", errors: (e as Error).message });
  }
};

export default {
  getAllPosts,
  getMyPosts,
  createPost,
  updatePost,
  deletePost,
};
