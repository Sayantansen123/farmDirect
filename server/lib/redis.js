import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

//connecting to the redis upstach client
export const redis = new Redis(process.env.UPSTASH_REDIS_URL, {
  tls: {}, // required for Upstash rediss://
});
