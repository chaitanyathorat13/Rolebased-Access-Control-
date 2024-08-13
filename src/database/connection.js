import mongoose from "mongoose";
import config from "../config/config.js";

async function connectToMongoDb() {
  try {
    await mongoose.connect(config.MONGODB_URL);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw error;
  }
}

export default connectToMongoDb;
