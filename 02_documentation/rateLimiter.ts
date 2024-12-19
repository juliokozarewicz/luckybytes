import rateLimit from 'express-rate-limit';

// rate limiter
//------------------------------------------------------
export const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100, 
  message: {
    "status": "error",
    "code": 429,
    "message": 'Too many requests, please try again later',
  }
});
//------------------------------------------------------