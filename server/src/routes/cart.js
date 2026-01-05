import express from 'express'
import { getCartProduct, updateCart } from '../controllers/cart.js';
import authUser from '../middileware/authUser.js';

const cartRouter = express.Router();

cartRouter.post("/update", authUser, updateCart)
cartRouter.get("/product", authUser, getCartProduct)

export default cartRouter;