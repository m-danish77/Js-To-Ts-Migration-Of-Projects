import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.ATLAS_URI;
    if (!uri) {
      throw new Error("ATLAS_URI is not defined in .env");
    }
    await mongoose.connect(uri);
    console.log("MongoDb Connected");
  } catch (err) {
    console.log((err as Error).message);
    process.exit(1);
  }
};

export default connectDB;
