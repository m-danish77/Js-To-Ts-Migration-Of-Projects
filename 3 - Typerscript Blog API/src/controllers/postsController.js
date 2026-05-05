import User from "../models/User.js";
import Post from "../models/Post.js";

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find().populate("author", "username email");
    res.status(200).json(allPosts);
  } catch (e) {
    res.status(500).json({ message: "Server Error", errors: e.message });
  }
};

const getMyPosts = async (req, res) => {
  try {
    const myPosts = await Post.find({ author: req.user.userId }).populate(
      "author",
      "username email",
    );
    res.status(200).json(myPosts);
  } catch (e) {
    res.status(500).json({ message: "Server Error", errors: e.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = req.user.userId;

    const post = await Post.create({
      title,
      content,
      author,
    });

    res.status(201).json({ message: "Post Created", post: post });
  } catch (e) {
    res.status(500).json({ message: "Server Error", errors: e.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { title, content } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // I should use post.author.toString() because author is already and id
    if (req.user.userId === post.author._id.toString()) {
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
    res.status(500).json({ message: "Server Error", errors: e.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (req.user.userId === post.author._id.toString()) {
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
    res.status(500).json({ message: "Server Error", errors: e.message });
  }
};

export default {
  getAllPosts,
  getMyPosts,
  createPost,
  updatePost,
  deletePost,
};
