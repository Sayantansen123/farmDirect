import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

//protect route so the user acsess when only they are logged in
export const protectRoute = async (req, res, next) => {
	try {
		//requesting the acsess token
		const accessToken = req.cookies.accessToken;
        
		//if no accsess token user un authorized
		if (!accessToken) {
			return res.status(401).json({ message: "Unauthorized - No access token provided" });
		}
		try {
			//decoding the user data and getting the userid
			const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
			//selecting user field but not the password
			const user = await User.findById(decoded.userId).select("-password");
            
			if (!user) {
				return res.status(401).json({ message: "User not found" });
			}
            //storing it in req.user field so we can use it further in different handlers
			req.user = user;
			//going to the next handler function
			next();
		} catch (error) {
			if (error.name === "TokenExpiredError") {
				return res.status(401).json({ message: "Unauthorized - Access token expired" });
			}
			throw error;
		}
	} catch (error) {
		console.log("Error in protectRoute middleware", error.message);
		return res.status(401).json({ message: "Unauthorized - Invalid access token" });
	}
};

export const adminRoute = (req, res, next) => {
	//after the protected route if the user.role is admin it will go to admin login
	if (req.user && req.user.role === "admin") {
		next();
	} else {
		return res.status(403).json({ message: "Access denied - Admin only" });
	}
};