import mongoose from "mongoose";

// exporting interface IUser, not the User model
import { IUser } from "./User.js";

export interface IPost extends Document {
  title: string;
  content: string;
  author: mongoose.Schema.Types.ObjectId | IUser;
}

const postSchema = new mongoose.Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const Post =
  (mongoose.models.Post as mongoose.Model<IPost>) ||
  mongoose.model<IPost>("Post", postSchema);

export default Post;
