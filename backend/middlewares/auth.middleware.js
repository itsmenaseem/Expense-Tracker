import { CustomError } from "../utils/customError.js";
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import "dotenv/config"
import { User } from "../models/user.model.js";
function getToken(req){
    const authHeader = req.headers.authorization
    console.log(authHeader);
    
    if(authHeader && authHeader.startsWith("Bearer ")){
        return authHeader.split(" ")[1]
    }
    return null;
}

export const authMiddleware = async function(req,res,next){
   const token =  getToken(req) 
   if(!token)return next(new CustomError("access token not found",401))
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        if(!mongoose.Types.ObjectId.isValid(decode.id))return next(new CustomError("invalid userId",401))
        const user = await User.findById(decode.id)
        console.log(user);
        
        if(!user)return next(new CustomError("user not found",404))
        req.user = user
        next()
    } catch (error) {
        console.log(error.message);
        return next(new CustomError("invalid or expire token",401))
    }
}