import express from "express"
import { LoginSignupRateLimiter } from "../middlewares/rateLimit.middleware.js";
import { login, signup } from "../controllers/auth.controller.js";

const router = express.Router()

router.route("/signup").post(LoginSignupRateLimiter,signup)
router.route("/login").post(LoginSignupRateLimiter,login)
export default router;