import ratelimit from "../config/upstash.js";

const rateLimiterMiddleware = async (req, res, next) => {
  try {
    // here we put simple id
    const { success } = await ratelimit.limit("my-rate-limit");

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later.",
      });
    }

    next();
  } catch (error) {
    console.error("Rate limiter middleware error:", error);
    next(error);
  }
};

export default rateLimiterMiddleware;
