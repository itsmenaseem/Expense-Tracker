import { CustomError } from "./customError.js";

export const AsyncHandler =   function(fun){
    return  (async function(req,res,next){
        try {
            await fun(req,res,next);
        } catch (error) {
            console.log("error in controller",req.url,error.message);
            next(new CustomError(error.message,400))
        }
    })
}