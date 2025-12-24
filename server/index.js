import express from "express";
import "dotenv/config";
import connectDB from "./src/db/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/user.js";
import sellerRouter from "./src/routes/seller.js";

await connectDB();
const server = express();

// Allow multiple origin
const allowOrigin = ["http://localhost:3000"];

// middilwares configration
server.use(express.json());
server.use(cookieParser());
server.use(cors({ origin: allowOrigin,  credentials: true }));

// server.use((req, res) => {
//   res.send("API is working fine.........");
// });

// user API
server.use("/api/user", userRouter)
server.use("/api/seller", sellerRouter)



const PORT = process?.env?.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
