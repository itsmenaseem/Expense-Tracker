import { User } from "../models/user.model.js";
import { AsyncHandler } from "../utils/asyncHandler.js";
import { CustomError } from "../utils/customError.js";


export  const signup = AsyncHandler(async(req,res,next)=>{
    const {email,password,name} = req.body
    if(!email || !password || !name)return next(new CustomError("All fields are required",400))
    const existingUser = await User.findOne({email})
    if(!existingUser)return next(new CustomError("email already in use",409))
    const user = await User.create({email,password,name})
    return res.status(201).json({
        success:true,
        message:"user created",
        user
    })
})