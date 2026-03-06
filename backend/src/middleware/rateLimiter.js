const ratelimit = require("../config/upstash");

const rateLimiter = async (req, res, next) => {
  // Skip rate limiting if Upstash is not configured
  if (!ratelimit) return next();

  try {
    const { success, remaining } = await ratelimit.limit("my-limit-key");

    console.log(`Rate limit => success=${success}, remaining=${remaining}`);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later",
      });
    }
    next();
  } catch (error) {
    console.log("Rate limit error : ", error.message);
    // If rate limiting fails, still allow the request
    next();
  }
};

module.exports = rateLimiter;
