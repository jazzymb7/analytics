import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: "https://winning-mollusk-33919.upstash.io",
  token: process.env.REDIS_KEY,
});
