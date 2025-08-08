import express from "express"
import { getProfile, login, logout, refreshToken, signup } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

//iniatilizing auth router
const router = express.Router()

//user sign up route and handler function
router.post("/signup",signup) 

//user login route and handler function
router.post("/login",login) 

//user logout route and handler function
router.post("/logout",logout) 

//user refresh-token generate route and handler function
router.post("/refresh-token", refreshToken); 

//user get profile route and handler function
router.get("/profile", protectRoute, getProfile);


export default router