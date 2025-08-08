import express from "express"
import { addToCart, getCartProducts, removeAllFromCart, updateQuantity } from "../controllers/cart.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

//get cart items
router.get("/",protectRoute,getCartProducts)

//add cart items
router.post("/",protectRoute,addToCart)

//remove cart items
router.delete("/",protectRoute,removeAllFromCart)

//update items
router.put("/:id",protectRoute,updateQuantity)


export default router