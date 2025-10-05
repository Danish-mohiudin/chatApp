import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const MONGO_URI = process.env.MONGODB_URL;

    if (!MONGO_URI) {
      throw new Error("❌ MONGO_URI is not defined in environment variables.");
    }

    const instance = await mongoose.connect(MONGO_URI, {
      dbName: "chatApp",
    });

    console.log(`✅ MongoDB Connected: ${instance.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};
