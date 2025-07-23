import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/bar-app-utn";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}; 