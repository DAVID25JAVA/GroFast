import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully");
    });
    const connect = await mongoose.connect(
      `${process?.env?.MONGODB_URI}/Grocery-store`
    );
    // console.log("connection--->", connect);
  } catch (error) {
    console.log("Database connection error :", error?.message);
    process.exit(1);
  }
};

export default connectDB;
