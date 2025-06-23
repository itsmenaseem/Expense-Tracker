import { User } from "../models/user.model.js";
import { AsyncHandler } from "../utils/asyncHandler.js";
import { CustomError } from "../utils/customError.js";


export  const signup = AsyncHandler(async(req,res,next)=>{
    const {email,password,name} = req.body
    if(!email || !password || !name)return next(new CustomError("All fields are required",400))
    const existingUser = await User.findOne({email})
    if(existingUser)return next(new CustomError("email already in use",409))
    const user = await User.create({email,password,name})
    const userObj = user.toObject()
    userObj.password = undefined
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
    res.cookie("refresh-token",refreshToken,{
        maxAge:30*24*60*60*1000,
        sameSite:"strict",
        httpOnly:true
    })
    return res.status(201).json({
        success:true,
        message:"user created",
        accessToken,
        userObj
    })
})
export const login = AsyncHandler(async(req,res,next)=>{
    const {email,password} = req.body
    if(!email || !password)return next(new CustomError("All fields are required",400))
    const user = await User.findOne({email})
    if(!user)return next(new CustomError("invalid credential",400))
    const isPasswordMatched = await user.comparePassword(password)
    if(!isPasswordMatched)return next(new CustomError("invalid credential",400))
     const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
    const userObj = user.toObject()
    userObj.password = undefined
    res.cookie("refresh-token",refreshToken,{
        maxAge:30*24*60*60*1000,
        sameSite:"strict",
        httpOnly:true
    })
    return res.status(200).json({
        success:true,
        message:"logged in successfully",
        accessToken,
        userObj
    })
})