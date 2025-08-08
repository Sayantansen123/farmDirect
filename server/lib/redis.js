import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

//connecting to the redis upstach client
export const redis = new Redis(process.env.UPSTACH_REDIS_URL);
