import mongoose from "mongoose"
import validator from "validator"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import "dotenv/config"
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"email is required"],
        trim:true,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:"Please provide a valid email"
        }
    },
    password:{
        type:String,
        required:[true,"please provide a password"],
        validate:{
            validator:validator.isStrongPassword,
            message:"password should be atleast 8 characters long having atleast 1 uppercase, 1 lowercase ,1 number and 1 symbol ",
        }
    },
    name:{
        type:String,
        required:[true,"please provide a name"],
        minlength:[2,"name must have atleast 2 characters"],
        maxlength:[100,"name must have at most 100 characters"]
    }
},{timestamps:true})



//pre hook for hashing password
userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next()
        try {
             const hashPassword = await bcryptjs.hash(this.password,10)
             this.password = hashPassword
             return next()
        } catch (error) {
            next(error)
        }
})
//methods for generating accessToken
userSchema.methods.generateAccessToken = function(){
    const payload = {
        email:this.email,
        id:this._id.toString()
    }
    const accessToken = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:"15m"
    })
    return accessToken;
}
//methods for generating refreshToken
userSchema.methods.generateRefreshToken = function(){
    const payload = {
        email:this.email,
        id:this._id.toString()
    }
    const refreshToken = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:"21d"
    })
    return refreshToken;
}

//method for comparing password
userSchema.methods.comparePassword = async function(password){
    return await bcryptjs.compare(password,this.password)
}

export const User = mongoose.model("user",userSchema)