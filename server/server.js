import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import analyticsRoutes from "./routes/analytics.routes.js";

//enviorment variable setup
dotenv.config();
//creating express app
const app = express();


//cors error fix
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//intializing the port
const PORT = process.env.PORT || 5000;

//middlewares 
app.use(express.json({limit:"10mb"}));
app.use(cookieParser());

//routes setup
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/analytics", analyticsRoutes);


//server starting on port
app.listen(PORT, () => {
  console.log("server is running on port http://localhost:" + PORT);
  connectDB();
});
