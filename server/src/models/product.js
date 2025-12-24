import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    tittle: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    offerPrice: {
      type: Number,
    },
    image: {
      type: Array,
    },
    category: {
      type: String,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);
export default productModel;
