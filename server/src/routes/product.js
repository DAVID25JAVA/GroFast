import express from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProductById,
  updateStock,
} from "../controllers/product.js";
import { isSellerAuth } from "../controllers/seller.js";
import { upload } from "../config/multer.js";

const productRouter = express.Router();

productRouter.post("/add", upload.array("images", 4), addProduct);
productRouter.get("/get", getProduct);
productRouter.get("/delete", isSellerAuth, deleteProduct);
productRouter.get("/:id", getProductById);
productRouter.get("/update-stock", isSellerAuth, updateStock);

export default productRouter;
