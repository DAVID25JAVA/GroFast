import productModel from "../models/product.js";
import { v2 as cloudinary } from "cloudinary";

// Add Product API--->"api/product/add"
export const addProduct = async (req, res) => {
  try {
    if (!req.body.productData) {
      console.log(" No productData in request");
      return res.status(400).json({
        success: false,
        message: "Product data is missing",
      });
    }

    if (!req.files || req.files.length === 0) {
      console.log(" No files in request");
      return res.status(400).json({
        success: false,
        message: "Images are missing",
      });
    }

    const productData = JSON.parse(req.body.productData);

    //   get image
    const image = req.files;
    console.log(image);

    //   upload image on cloudinary
    const imagesUrl = await Promise.all(
      image.map(async (item) => {
        let result = await cloudinary.uploader.upload(item?.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    await productModel.create({ ...productData, image: imagesUrl });
    return res.json({
      success: true,
      message: "Product added successfully",
      product: productData,
      image: imagesUrl,
    });
  } catch (error) {
    console.log("Add product error---->", error?.message);
    return res.json({ success: false, message: error.message });
  }
};

// Get Product API--->"/api/product/get"
export const getProduct = async (req, res) => {
  try {
    const product = await productModel.find({});
    if (!product)
      return res.json({ success: false, message: "Product Not Found!" });
    return res.json({ success: true, product });
  } catch (error) {
    console.log("Get product error---->", error?.message);
    return res.json({ success: false, message: error.message });
  }
};

// Get Product API--->"/api/product/:id"
export const getProductById = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await productModel.findById(id);
    return res.json({ success: true, data });
  } catch (error) {
    console.log("Get product by id error---->", error?.message);
    return res.json({ success: false, message: error.message });
  }
};

// Update stock Product API--->"/api/product/in-stock/:id"
export const updateStock = async (req, res) => {
  try {
    const { inStock, id } = req.body;
    await productModel.findByIdAndUpdate(id, {
      inStock,
    });
    return res.json({ success: true, message: "Stock updated successfully" });
  } catch (error) {
    console.log("Update Stock product error---->", error?.message);
    return res.json({ success: false, message: error.message });
  }
};

// Update Product API--->"/api/product/:id"
export const updateProduct = async (req, res) => {
  try {
  } catch (error) {
    console.log("Update product error---->", error?.message);
    return res.json({ success: false, message: error.message });
  }
};

// Update Product API--->"/api/product/:id"
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;
    await productModel.findByIdAndDelete(id);
    return res.json({
      success: true,
      message: "Product deleted successfully!",
    });
  } catch (error) {
    console.log("Delete product error---->", error?.message);
    return res.json({ success: false, message: error.message });
  }
};
