import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getCoupon, validateCoupon } from "../controllers/coupon.controller.js";



const router = express.Router();

//getting the coupon
router.get("/", protectRoute, getCoupon);

//validating the coupon
router.post("/validate", protectRoute, validateCoupon);

export default router;