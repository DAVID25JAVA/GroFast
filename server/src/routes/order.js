import express from "express";
import { isAuth } from "../controllers/user.js";
import { placeOrderCOD } from "../controllers/order.js";

const orderRouter = express.Router();

orderRouter.get("/get", isAuth, placeOrderCOD);

export default orderRouter;
