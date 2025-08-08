import { redis } from "../lib/redis.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken"


//generating access and refresh token 
const generateTokens=(userId)=>{
  //access token generating by user id that expires in 15m
  const accessToken = jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:"15m"
  })

  //refresh token generating by user id that expires in 15m
  const refreshToken = jwt.sign({userId},process.env.REFRESH_TOKEN_SECRET,{
    expiresIn:"7d"
  })

  return {accessToken,refreshToken}
}

//storing the refresh token in redis with the user id with expirey 7days
const storeRefreshToken = async(userId,refreshToken)=>{
    await redis.set(`refresh_token:${userId}`,refreshToken,"EX",7*24*60*60);//7days
}

//setting the cookies as accestoken and refreshtoken
const setCookies = (res,accessToken,refreshToken) =>{
    res.cookie("accessToken", accessToken, {
		httpOnly: true, 
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", 
		maxAge: 15 * 60 * 1000, // 15 minutes
	});
	res.cookie("refreshToken", refreshToken, {
		httpOnly: true, // prevent XSS attacks, cross site scripting attack
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	});
    console.log(res.cookie)
}


//sign up route
export const signup = async (req, res) => {
    //getting the email,password,name from the reqeust body
    const { email, password, name } = req.body;
    try {
		//finding user exist or not
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json("User already exists");
        }
		//if dont exist create one
        const user = await User.create({ name, email, password })

        //generating acsess and refresh token
        const {accessToken ,refreshToken} = generateTokens(user._id);

		//storing the refresh token in redis with user id
        await storeRefreshToken(user._id,refreshToken);

        //setting the response , accsess and refresh token in cookies
        setCookies(res,accessToken,refreshToken);
        
		//response message
        res.status(201).json({ user:{
            _id : user._id,
            name : user.name,
            email: user.email,
            role: user.role,
        }, "message": "user created sucessfull" })

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: error.message });  
    }

}


//login handler
export const login = async (req, res) => {
    try {
        
		//getting the email and password from the request body
		const { email, password } = req.body;
		//finding the email
		const user = await User.findOne({ email });
		//if the user exist and password is correct then log in and store in the cookies,redis
		if (user && (await user.comparePassword(password))) {
			const { accessToken, refreshToken } = generateTokens(user._id);
			await storeRefreshToken(user._id, refreshToken); 
			setCookies(res, accessToken, refreshToken);
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			});
		} else {
			res.status(400).json({ message: "Invalid email or password" });
		}
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ message: error.message });
	}
}

//logout handler
export const logout = async (req, res) => {
    try {
		//getting the refreshtoken
		const refreshToken = req.cookies.refreshToken;
		if (refreshToken) {
			//verifiying the refresh token and clearing from redis
			const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
			await redis.del(`refresh_token:${decoded.userId}`);
		}
        
		//clearing from the cookie
		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");
		res.json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
}

// this will refresh the access token
export const refreshToken = async (req, res) => {
	try {
		//gettign the refresh token
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			return res.status(401).json({ message: "No refresh token provided" });
		}
        //decoding the user data from this 
		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		
		const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

		if (storedToken !== refreshToken) {
			return res.status(401).json({ message: "Invalid refresh token" });
		}

		const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
		
		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 15 * 60 * 1000,
		});
		
		res.json({ message: "Token refreshed successfully" });
	} catch (error) {
		console.log("Error in refreshToken controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getProfile = async (req, res) => {
	try {
		res.json(req.user);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};