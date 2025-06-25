import {rateLimit} from "express-rate-limit"


export const mainRateLimiter = rateLimit({
    windowMs:15*60*1000,
    standardHeaders:true,
    limit:200,
    legacyHeaders:false
})

export const LoginSignupRateLimiter = rateLimit({
    windowMs:15*60*1000,
    standardHeaders:true,
    limit:10,
    legacyHeaders:false
})