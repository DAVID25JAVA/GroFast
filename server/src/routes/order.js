import express from "express";
import {
  getAllOrder,
  getOrderByUserId,
  placeOrderCOD,
  placeOrderWithStripe,
} from "../controllers/order.js";
import authUser from "../middileware/authUser.js";

const orderRouter = express.Router();

orderRouter.post("/cod", authUser, placeOrderCOD);
orderRouter.get("/orderByUser", authUser, getOrderByUserId);
orderRouter.get("/allorders", authUser, getAllOrder);

// stripe payment API routes
orderRouter.post("/stripe", authUser, placeOrderWithStripe)


export default orderRouter;
