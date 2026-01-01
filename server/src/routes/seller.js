import express from 'express'
import { sellerAuth } from '../middileware/authSeller.js';
import { isSellerAuth, sellerLogin, sellerLogout } from '../controllers/seller.js';

const sellerRouter = express.Router();

sellerRouter.post("/login", sellerLogin)
sellerRouter.get("/is-auth", sellerAuth, isSellerAuth)
sellerRouter.get("/logout", sellerLogout)

export default sellerRouter;