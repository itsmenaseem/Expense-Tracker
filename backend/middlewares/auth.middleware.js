import { CustomError } from "../utils/customError.js";
import jwt from "jsonwebtoken"
import "dotenv/config"
function getToken(req){
    const authHeader = req.headers.authorization
    if(authHeader && authHeader.startsWith("Bearer ")){
        return authHeader.split(" ")[1]
    }
    return null;
}

export const authMiddleware = function(req,res,next){
   const token =  getToken(req)
   if(!token)return next(new CustomError("access token not found",401))
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch (error) {
        return next(new CustomError(error.message,error.statusCode))
    }
}