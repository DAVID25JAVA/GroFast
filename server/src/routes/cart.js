import express from 'express'
import { updateCart } from '../controllers/cart.js';
import authUser from '../middileware/authUser.js';

const cartRouter = express.Router();

cartRouter.post("/update", authUser, updateCart)

export default cartRouter;