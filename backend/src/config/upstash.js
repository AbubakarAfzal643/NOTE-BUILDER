const { Ratelimit } = require("@upstash/ratelimit");
const { Redis } = require("@upstash/redis");
const dotenv = require("dotenv").config();

let ratelimit = null;

try {
  // Only create rate limiter if Upstash credentials are available
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(100, "60 s"),
    });
  } else {
    console.log("Upstash credentials not found, rate limiting disabled");
  }
} catch (error) {
  console.log("Failed to initialize rate limiter:", error.message);
}

module.exports = ratelimit;
