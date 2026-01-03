import express from "express";
import "dotenv/config";
import connectDB from "./src/db/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/user.js";
import sellerRouter from "./src/routes/seller.js";
import { connectCloudinary } from "./src/config/cloudinary.js";
import productRouter from "./src/routes/product.js";
import cartRouter from "./src/routes/cart.js";
import addressRouter from "./src/routes/userAddress.js";
import orderRouter from "./src/routes/order.js";

const server = express();

await connectDB();
await connectCloudinary();

// Allow multiple origin
const allowOrigin = ["http://localhost:3000"];

// middilwares configration
server.use(express.json());
server.use(cookieParser());
server.use(cors({ origin: allowOrigin, credentials: true }));

// server.use((req, res) => {
//   res.send("API is working fine.........");
// });

// user API
server.use("/api/user", userRouter);
server.use("/api/seller", sellerRouter);
server.use("/api/product", productRouter);
server.use("/api/cart", cartRouter);
server.use("/api/user/address", addressRouter);
server.use("/api/order", orderRouter);

const PORT = process?.env?.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
