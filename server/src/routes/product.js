import express from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProductById,
  productByCategory,
  SearchProduct,
  updateStock,
} from "../controllers/product.js";
import { isSellerAuth } from "../controllers/seller.js";
import { upload } from "../config/multer.js";
import { sellerAuth } from "../middileware/authSeller.js";

const productRouter = express.Router();

productRouter.post("/add", upload.array("images", 4), addProduct);
productRouter.get("/get", getProduct);
productRouter.get("/delete", isSellerAuth, deleteProduct);
productRouter.get("/search", SearchProduct)
productRouter.get("/:id", getProductById);
productRouter.post("/update-stock", sellerAuth, updateStock);
productRouter.get("/category/:category", productByCategory)

export default productRouter;
