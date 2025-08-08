import express from "express"
import { createProduct, deleteProduct, getAllProducts, getFeaturedProducts, getProductsByCategory, getRecommendedProducts, toggleFeaturedProduct } from "../controllers/product.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

//get the product
router.get("/", protectRoute, adminRoute, getAllProducts)

//get featured products
router.get("/featured", getFeaturedProducts)

//get recommendations
router.get("/recommendations", getRecommendedProducts)

//creating the product
router.post("/", protectRoute, adminRoute, createProduct)

//get the product by category
router.get("/category/:category", getProductsByCategory)

//toggle the is featured field
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct)

//delete the produuct
router.delete("/:id", protectRoute, adminRoute, deleteProduct)

export default router